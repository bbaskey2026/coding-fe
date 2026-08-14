import { Router } from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import {
  createPostSchema,
  updatePostSchema,
  createCommentSchema,
} from '../validators/blog.schema.js';

/**
 * Helper to check optional authorization on public routes (allows optional req.user identification)
 */
const createOptionalAuthMiddleware = (tokenService, userRepository) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const payload = tokenService.verifyAccessToken(token);
        const user = await userRepository.findById(payload.sub);
        if (user && user.isVerified) {
          req.user = user;
        }
      }
      return next();
    } catch (err) {
      // Continue without user object if token is invalid or expired
      return next();
    }
  };
};

/**
 * Factory to create blogs router
 * @param {object} blogController - Instance of BlogController
 * @param {import('express').RequestHandler} authMiddleware - Authentication protection middleware
 * @param {object} tokenService - Instance of TokenService
 * @param {object} userRepository - Instance of UserRepository
 */
export const createBlogRouter = (blogController, authMiddleware, tokenService, userRepository) => {
  const router = Router();
  const optionalAuth = createOptionalAuthMiddleware(tokenService, userRepository);

  // ── Post routes ──────────────────────────────────────────────────────────
  
  // Public catalog of posts (optionally authenticated to view drafts)
  router.get('/', optionalAuth, blogController.getAllPosts);
  
  // Public detailed view of a post
  router.get('/:id', blogController.getPostById);
  
  // Create post
  router.post('/', authMiddleware, validateMiddleware(createPostSchema), blogController.createPost);
  
  // Update post
  router.put('/:id', authMiddleware, validateMiddleware(updatePostSchema), blogController.updatePost);
  
  // Delete post
  router.delete('/:id', authMiddleware, blogController.deletePost);

  // Clap post (Toggle)
  router.post('/:id/clap', authMiddleware, blogController.clapPost);

  // ── Comment routes ────────────────────────────────────────────────────────

  // Get comments on a post (Public)
  router.get('/:id/comments', blogController.getCommentsByPost);

  // Add comment to a post
  router.post('/:id/comments', authMiddleware, validateMiddleware(createCommentSchema), blogController.addComment);

  // Delete a comment
  router.delete('/comments/:commentId', authMiddleware, blogController.deleteComment);

  return router;
};

export default createBlogRouter;
