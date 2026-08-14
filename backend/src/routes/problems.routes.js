import { Router } from 'express';

/**
 * Factory to create problems catalog router
 * @param {object} problemsController - Instance of ProblemsController
 * @param {import('express').RequestHandler} authMiddleware - Authentication protection middleware
 */
export const createProblemsRouter = (problemsController, authMiddleware) => {
  const router = Router();

  // Guard all catalog and submission operations
  router.use(authMiddleware);

  // Fetch catalog problems list
  router.get('/', problemsController.getAll);

  // Fetch details of a single problem
  router.get('/:id', problemsController.getById);

  // Mock code runner compilation
  router.post('/:id/run', problemsController.run);

  // Mock solution verification submission
  router.post('/:id/submit', problemsController.submit);

  return router;
};
export default createProblemsRouter;
