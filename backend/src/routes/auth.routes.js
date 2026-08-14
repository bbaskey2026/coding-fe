import { Router } from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema, 
  verifyOtpSchema 
} from '../validators/auth.schema.js';

/**
 * Factory to create auth router with injected controller and rate limiters
 * @param {object} authController - Instance of AuthController
 * @param {import('express').RequestHandler} authLimiter - Auth rate limiter middleware
 */
export const createAuthRouter = (authController, authLimiter) => {
  const router = Router();

  // Register a new user
  router.post(
    '/register', 
    authLimiter, 
    validateMiddleware(registerSchema), 
    authController.register
  );

  // Authenticate user and get tokens
  router.post(
    '/login', 
    authLimiter, 
    validateMiddleware(loginSchema), 
    authController.login
  );

  // Verify registration or reset OTP
  router.post(
    '/verify-otp', 
    authLimiter,
    validateMiddleware(verifyOtpSchema), 
    authController.verifyOtp
  );

  // Send request for resetting password OTP
  router.post(
    '/forgot-password', 
    authLimiter, 
    validateMiddleware(forgotPasswordSchema), 
    authController.forgotPassword
  );

  // Reset password using email, OTP, and newPassword
  router.post(
    '/reset-password', 
    authLimiter, 
    validateMiddleware(resetPasswordSchema), 
    authController.resetPassword
  );

  // Refresh auth tokens
  router.post(
    '/refresh', 
    authController.refreshTokens
  );

  // Log out user
  router.post(
    '/logout', 
    authController.logout
  );

  return router;
};
