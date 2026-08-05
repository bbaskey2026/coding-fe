import logger from '../utils/logger.js';
import { ResponseUtil } from '../utils/response.js';

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log the error
  logger.error(`${req.method} ${req.path} - Error: ${message}`, err);

  // If Zod validation error, structure it nicely
  if (err.name === 'ZodError') {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message
    }));
    return ResponseUtil.error(res, 'Validation error', 400, formattedErrors);
  }

  // Handle Token verification errors
  if (err.name === 'JsonWebTokenError') {
    return ResponseUtil.error(res, 'Invalid token. Please authenticate.', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return ResponseUtil.error(res, 'Token has expired. Please authenticate again.', 401);
  }

  // Handle Multer upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return ResponseUtil.error(res, 'File size is too large. Max limit is 5MB.', 400);
  }

  // Operational error: send message to client
  if (err.isOperational || statusCode < 500) {
    return ResponseUtil.error(res, message, statusCode);
  }

  // Production error: don't leak details
  const prodMessage = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred on the server' 
    : message;

  return ResponseUtil.error(res, prodMessage, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};
