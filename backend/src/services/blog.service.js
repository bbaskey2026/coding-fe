export class BlogService {
  /**
   * @param {object} blogRepository - Instance of BlogRepository
   */
  constructor(blogRepository) {
    this.blogRepository = blogRepository;
  }

  /**
   * Create a new post
   */
  async createPost(postData, user) {
    const data = {
      ...postData,
      authorId: user.id,
      authorName: user.username,
      authorAvatar: user.avatar || '',
    };
    return this.blogRepository.createPost(data);
  }

  /**
   * Get post by ID
   */
  async getPostById(id) {
    const post = await this.blogRepository.findPostById(id);
    if (!post) {
      const err = new Error('Blog post not found');
      err.statusCode = 404;
      throw err;
    }
    return post;
  }

  /**
   * Get posts list with filters
   */
  async getAllPosts({ tag, search, status, authorId } = {}, currentUser) {
    // If querying draft posts, ensure the user has permission to see them
    let targetStatus = 'published';
    if (status) {
      if (status === 'draft') {
        if (!currentUser) {
          const err = new Error('Authentication required to view draft posts');
          err.statusCode = 401;
          throw err;
        }
        // Admin can view drafts, authors can view their own drafts
        if (currentUser.role !== 'admin' && currentUser.id !== Number(authorId)) {
          const err = new Error('Unauthorized to view draft posts');
          err.statusCode = 403;
          throw err;
        }
        targetStatus = 'draft';
      } else {
        targetStatus = 'published';
      }
    }

    return this.blogRepository.findPosts({
      tag,
      search,
      status: status ? targetStatus : undefined,
      authorId
    });
  }

  /**
   * Update a post
   */
  async updatePost(id, updates, userId, userRole) {
    const post = await this.getPostById(id);

    // Verify ownership
    if (post.authorId !== userId && userRole !== 'admin') {
      const err = new Error('Unauthorized to update this blog post');
      err.statusCode = 403;
      throw err;
    }

    return this.blogRepository.updatePost(id, updates);
  }

  /**
   * Delete a post
   */
  async deletePost(id, userId, userRole) {
    const post = await this.getPostById(id);

    // Verify ownership
    if (post.authorId !== userId && userRole !== 'admin') {
      const err = new Error('Unauthorized to delete this blog post');
      err.statusCode = 403;
      throw err;
    }

    await this.blogRepository.deleteCommentsByPostId(id);
    return this.blogRepository.deletePost(id);
  }

  /**
   * Clap a post (Toggle upvote)
   */
  async clapPost(id, userId) {
    const post = await this.getPostById(id);

    const numericUserId = Number(userId);
    const index = post.clappedBy.indexOf(numericUserId);

    if (index > -1) {
      // User has already clapped, remove their clap (Undo)
      post.clappedBy.splice(index, 1);
      post.claps = Math.max(0, post.claps - 1);
    } else {
      // Add clap
      post.clappedBy.push(numericUserId);
      post.claps += 1;
    }

    return post.save();
  }

  /**
   * Add a comment to a post
   */
  async addComment(postId, content, user) {
    // Verify the post exists
    await this.getPostById(postId);

    const commentData = {
      postId,
      authorId: user.id,
      authorName: user.username,
      authorAvatar: user.avatar || '',
      content,
    };

    return this.blogRepository.createComment(commentData);
  }

  /**
   * Get comments for a post
   */
  async getCommentsByPostId(postId) {
    // Verify post exists
    await this.getPostById(postId);
    return this.blogRepository.findCommentsByPostId(postId);
  }

  /**
   * Delete a comment
   */
  async deleteComment(commentId, userId, userRole) {
    const comment = await this.blogRepository.findCommentById(commentId);
    if (!comment) {
      const err = new Error('Comment not found');
      err.statusCode = 404;
      throw err;
    }

    // Verify ownership: either comment author, blog post author, or admin
    let canDelete = comment.authorId === userId || userRole === 'admin';

    if (!canDelete) {
      // Check if user is the author of the blog post
      const post = await this.blogRepository.findPostById(comment.postId);
      if (post && post.authorId === userId) {
        canDelete = true;
      }
    }

    if (!canDelete) {
      const err = new Error('Unauthorized to delete this comment');
      err.statusCode = 403;
      throw err;
    }

    return this.blogRepository.deleteComment(commentId);
  }
}

export default BlogService;
