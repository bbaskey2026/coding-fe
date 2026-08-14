export class BlogRepository {
  /**
   * @param {object} blogPostModel - Mongoose BlogPost model
   * @param {object} commentModel - Mongoose Comment model
   */
  constructor(blogPostModel, commentModel) {
    this.BlogPost = blogPostModel;
    this.Comment = commentModel;
  }

  /**
   * Create a new blog post
   */
  async createPost(postData) {
    const post = new this.BlogPost(postData);
    return post.save();
  }

  /**
   * Find a blog post by ID
   */
  async findPostById(id) {
    return this.BlogPost.findById(id);
  }

  /**
   * Update a blog post
   */
  async updatePost(id, updates) {
    return this.BlogPost.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }

  /**
   * Delete a blog post
   */
  async deletePost(id) {
    return this.BlogPost.findByIdAndDelete(id);
  }

  /**
   * Find posts with optional filters, search query, sorting, and pagination
   */
  async findPosts({ tag, search, status, authorId } = {}) {
    const filter = {};

    if (tag && tag !== 'All') {
      filter.tags = tag;
    }

    if (status) {
      filter.status = status;
    }

    if (authorId) {
      filter.authorId = authorId;
    }

    if (search) {
      // Use Mongo text search
      filter.$text = { $search: search };
    }

    const sortOption = search 
      ? { score: { $meta: 'textScore' } } 
      : { createdAt: -1 };

    return this.BlogPost.find(filter, search ? { score: { $meta: 'textScore' } } : {})
      .sort(sortOption)
      .exec();
  }

  /**
   * Create a new comment
   */
  async createComment(commentData) {
    const comment = new this.Comment(commentData);
    return comment.save();
  }

  /**
   * Find comments by post ID
   */
  async findCommentsByPostId(postId) {
    return this.Comment.find({ postId }).sort({ createdAt: -1 }).exec();
  }

  /**
   * Find comment by ID
   */
  async findCommentById(commentId) {
    return this.Comment.findById(commentId);
  }

  /**
   * Delete a single comment
   */
  async deleteComment(commentId) {
    return this.Comment.findByIdAndDelete(commentId);
  }

  /**
   * Delete all comments of a post (useful when deleting the post)
   */
  async deleteCommentsByPostId(postId) {
    return this.Comment.deleteMany({ postId });
  }
}

export default BlogRepository;
