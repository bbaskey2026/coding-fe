import { ResponseUtil } from '../utils/response.js';

export class BlogController {
  /**
   * @param {object} blogService - Instance of BlogService
   */
  constructor(blogService) {
    this.blogService = blogService;
  }

  /**
   * Create a new blog post
   */
  createPost = async (req, res, next) => {
    try {
      const post = await this.blogService.createPost(req.body, req.user);
      return ResponseUtil.success(res, post, 'Blog post created successfully', 201);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Get post by ID
   */
  getPostById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await this.blogService.getPostById(id);
      return ResponseUtil.success(res, post);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Get all blog posts with query filters
   */
  getAllPosts = async (req, res, next) => {
    try {
      const { tag, search, status, authorId } = req.query;
      const posts = await this.blogService.getAllPosts(
        { tag, search, status, authorId },
        req.user
      );
      return ResponseUtil.success(res, posts);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Update a blog post
   */
  updatePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await this.blogService.updatePost(
        id,
        req.body,
        req.user.id,
        req.user.role
      );
      return ResponseUtil.success(res, post, 'Blog post updated successfully');
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Delete a blog post
   */
  deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.blogService.deletePost(id, req.user.id, req.user.role);
      return ResponseUtil.success(res, null, 'Blog post deleted successfully');
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Clap a blog post (Toggle claps)
   */
  clapPost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await this.blogService.clapPost(id, req.user.id);
      return ResponseUtil.success(res, { claps: post.claps, clappedBy: post.clappedBy });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Add a comment to a blog post
   */
  addComment = async (req, res, next) => {
    try {
      const { id } = req.params; // post ID
      const comment = await this.blogService.addComment(id, req.body.content, req.user);
      return ResponseUtil.success(res, comment, 'Comment added successfully', 201);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Get comments for a blog post
   */
  getCommentsByPost = async (req, res, next) => {
    try {
      const { id } = req.params; // post ID
      const comments = await this.blogService.getCommentsByPostId(id);
      return ResponseUtil.success(res, comments);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Delete a comment
   */
  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      await this.blogService.deleteComment(commentId, req.user.id, req.user.role);
      return ResponseUtil.success(res, null, 'Comment deleted successfully');
    } catch (error) {
      return next(error);
    }
  };
}

export default BlogController;
