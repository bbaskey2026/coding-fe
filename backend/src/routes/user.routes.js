import { Router } from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { updateProfileSchema, changePasswordSchema } from '../validators/user.schema.js';

/**
 * Factory to create user router with injected controller and middlewares
 * @param {object} userController - Instance of UserController
 * @param {import('express').RequestHandler} authMiddleware - Authenticated route guard
 * @param {import('multer').Multer} uploadMiddleware - Multer middleware instance
 */
export const createUserRouter = (userController, authMiddleware, uploadMiddleware) => {
  const router = Router();

  // Guard all endpoints under user router
  router.use(authMiddleware);

  // Get current user profile
  router.get('/me', userController.getMe);

  // Update profile fields
  router.patch(
    '/me', 
    validateMiddleware(updateProfileSchema), 
    userController.updateMe
  );

  // Upload user profile avatar
  router.post(
    '/avatar', 
    uploadMiddleware.single('avatar'), 
    userController.uploadAvatar
  );

  // Change user password
  router.post(
    '/change-password', 
    validateMiddleware(changePasswordSchema), 
    userController.changePassword
  );

  return router;
};
export default createUserRouter;
