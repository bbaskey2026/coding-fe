import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './utils/logger.js';
import pool, { checkConnection } from './config/db.js';
import mongoose from 'mongoose';
import { connectMongo } from './config/mongo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables relative to this script's directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 1. Core Utilities & Classes
import { HashUtil } from './utils/hash.js';
import { TokenUtil } from './utils/token.js';
import { JwtUtil } from './utils/jwt.js';

const jwtUtil = new JwtUtil(
  process.env.JWT_SECRET || 'fallback_secret_key',
  process.env.JWT_ACCESS_EXPIRATION || '15m',
  process.env.JWT_REFRESH_EXPIRATION || '7d'
);

// 2. Repositories
import { UserRepository } from './repositories/user.repository.js';
import { ProblemsRepository } from './repositories/problems.repository.js';
import { CompanyGuidesRepository } from './repositories/companyGuides.repository.js';
const userRepository = new UserRepository(pool);
const problemsRepository = new ProblemsRepository(pool);
const companyGuidesRepository = new CompanyGuidesRepository(pool);

// Blog Repository
import { BlogRepository } from './repositories/blog.repository.js';
import BlogPost from './models/BlogPost.js';
import Comment from './models/Comment.js';
const blogRepository = new BlogRepository(BlogPost, Comment);

// Tutorial Repository
import { TutorialRepository } from './repositories/tutorial.repository.js';
import Tutorial from './models/Tutorial.js';
const tutorialRepository = new TutorialRepository(Tutorial);

// 3. Services
import { TokenService } from './services/token.service.js';
import { EmailService } from './services/email.service.js';
import { UserService } from './services/user.service.js';
import { AuthService } from './services/auth.service.js';
import { ProblemsService } from './services/problems.service.js';
import { CompanyGuidesService } from './services/companyGuides.service.js';

const tokenService = new TokenService(jwtUtil, userRepository);

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.SMTP_FROM
};
const emailService = new EmailService(smtpConfig, logger);

const userService = new UserService(userRepository, HashUtil);
const authService = new AuthService(userRepository, tokenService, emailService, HashUtil, TokenUtil);
const problemsService = new ProblemsService(problemsRepository);
const companyGuidesService = new CompanyGuidesService(companyGuidesRepository);

// Blog Service
import { BlogService } from './services/blog.service.js';
const blogService = new BlogService(blogRepository);

// Tutorial Service
import { TutorialService } from './services/tutorial.service.js';
const tutorialService = new TutorialService(tutorialRepository);

// 4. Controllers
import { AuthController } from './controllers/auth.controller.js';
import { UserController } from './controllers/user.controller.js';
import { ProblemsController } from './controllers/problems.controller.js';
import { CompanyGuidesController } from './controllers/companyGuides.controller.js';

const authController = new AuthController(authService, tokenService);
const userController = new UserController(userService);
const problemsController = new ProblemsController(problemsService);
const companyGuidesController = new CompanyGuidesController(companyGuidesService);

// Blog Controller
import { BlogController } from './controllers/blog.controller.js';
const blogController = new BlogController(blogService);

// Tutorial Controller
import { TutorialController } from './controllers/tutorial.controller.js';
const tutorialController = new TutorialController(tutorialService);

// 5. Middlewares
import { createAuthMiddleware } from './middlewares/auth.middleware.js';
import { createUploadMiddleware } from './middlewares/upload.middleware.js';
import { authLimiter } from './middlewares/rateLimit.middleware.js';

const authMiddleware = createAuthMiddleware(tokenService, userRepository);
const uploadMiddleware = createUploadMiddleware();

// 6. Routers
import { createAuthRouter } from './routes/auth.routes.js';
import { createUserRouter } from './routes/user.routes.js';
import { createProblemsRouter } from './routes/problems.routes.js';
import { createCompanyGuidesRouter } from './routes/companyGuides.routes.js';

const authRouter = createAuthRouter(authController, authLimiter);
const userRouter = createUserRouter(userController, authMiddleware, uploadMiddleware);
const problemsRouter = createProblemsRouter(problemsController, authMiddleware);
const companyGuidesRouter = createCompanyGuidesRouter(companyGuidesController, authMiddleware);

// Blog Router
import { createBlogRouter } from './routes/blog.routes.js';
const blogRouter = createBlogRouter(blogController, authMiddleware, tokenService, userRepository);

// Tutorial Router
import { createTutorialRouter } from './routes/tutorial.routes.js';
const tutorialRouter = createTutorialRouter(tutorialController, authMiddleware);

// 7. Express App Assembly
import { createApp } from './app.js';
const app = createApp({ authRouter, userRouter, problemsRouter, companyGuidesRouter, blogRouter, tutorialRouter });

// 8. Server Startup Lifecycle
const port = parseInt(process.env.PORT || '5000', 10);
const server = http.createServer(app);

const startServer = async () => {
  logger.info('Initializing application server...');
  
  // Test connection to Postgres
  const dbConnected = await checkConnection();
  if (!dbConnected) {
    logger.error('CRITICAL: Server starting aborted due to database connection failure.');
    process.exit(1);
  }

  // Test connection to MongoDB
  const mongoConnected = await connectMongo();
  if (!mongoConnected) {
    logger.warn('WARNING: MongoDB connection failed. Blog services will be disabled, but server startup will proceed.');
  }

  server.listen(port, () => {
    logger.info(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
};

// Graceful Shutdown
const shutdown = (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  server.close(async () => {
    logger.info('HTTP server closed.');
    try {
      await pool.end();
      logger.info('PostgreSQL pool connection closed.');
      await mongoose.connection.close();
      logger.info('MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      logger.error('Error closing database pool connection', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();
