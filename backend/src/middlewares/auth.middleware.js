/**
 * Factory to create auth middleware with injected services
 * @param {object} tokenService - Instance of TokenService
 * @param {object} userRepository - Instance of UserRepository
 */
export const createAuthMiddleware = (tokenService, userRepository) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const err = new Error('No authorization token provided');
        err.statusCode = 401;
        return next(err);
      }

      const token = authHeader.split(' ')[1];
      
      // Decodes token & verifies signature/expiration
      const payload = tokenService.verifyAccessToken(token);
      
      const user = await userRepository.findById(payload.sub);
      if (!user) {
        const err = new Error('The user belonging to this token no longer exists');
        err.statusCode = 401;
        return next(err);
      }

      // Block unverified users from accessing protected resources
      if (!user.isVerified) {
        const err = new Error('Please verify your email address to access this resource');
        err.statusCode = 403;
        return next(err);
      }

      // Attach user object to request
      req.user = user;
      return next();
    } catch (err) {
      // Re-map JWT verification errors to 401 Unauthorized
      err.statusCode = 401;
      return next(err);
    }
  };
};
