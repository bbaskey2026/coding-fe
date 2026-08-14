import { Router } from 'express';

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    const err = new Error('Access denied. Admin role required.');
    err.statusCode = 403;
    return next(err);
  }
  next();
};

/**
 * Factory to create tutorials router
 * @param {object} tutorialController - Instance of TutorialController
 * @param {import('express').RequestHandler} authMiddleware - Authentication protection middleware
 */
export const createTutorialRouter = (tutorialController, authMiddleware) => {
  const router = Router();

  // Public routes
  router.get('/', tutorialController.getAllTutorials);
  router.get('/:id', tutorialController.getTutorialById);

  // Admin protected routes
  router.post('/', authMiddleware, adminMiddleware, tutorialController.createTutorial);
  router.put('/:id', authMiddleware, adminMiddleware, tutorialController.updateTutorial);
  router.delete('/:id', authMiddleware, adminMiddleware, tutorialController.deleteTutorial);

  return router;
};

export default createTutorialRouter;
