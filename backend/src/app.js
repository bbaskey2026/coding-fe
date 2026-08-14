import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';

/**
 * Express Application assembly factory
 * @param {object} routes - Injected express routes
 * @param {import('express').Router} routes.authRouter
 * @param {import('express').Router} routes.userRouter
 * @param {import('express').Router} routes.problemsRouter
 * @param {import('express').Router} routes.companyGuidesRouter
 */
export const createApp = ({ authRouter, userRouter, problemsRouter, companyGuidesRouter, blogRouter, tutorialRouter }) => {
  const app = express();

  // Mount basic security headers with Referrer-Policy configured
  app.use(helmet({
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }));

  // Setup CORS with credentials support (for HTTP-Only cookies)
  app.use(cors({
    origin: true, // In production, replace with specific domain config
    credentials: true
  }));

  // Parse incoming JSON and URL-encoded requests with size limits
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // Parse request cookies (needed for refreshTokens)
  app.use(cookieParser());

  // Static directory to serve profile picture uploads
  const uploadPath = process.env.UPLOAD_PATH || 'uploads/';
  app.use('/uploads', express.static(path.resolve(uploadPath)));

  // Mount general rate limiter to API routes
  const prefix = process.env.API_PREFIX || '/api';
  app.use(prefix, apiLimiter);

  // Mount routers
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/users`, userRouter);
  app.use(`${prefix}/problems`, problemsRouter);
  app.use(`${prefix}/company-guides`, companyGuidesRouter);
  app.use(`${prefix}/blogs`, blogRouter);
  app.use(`${prefix}/tutorials`, tutorialRouter);

  // Catch-all 404 Route
  app.use((req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.statusCode = 404;
    err.isOperational = true;
    next(err);
  });

  // Global Express Error Middleware
  app.use(errorMiddleware);

  return app;
};
export default createApp;
