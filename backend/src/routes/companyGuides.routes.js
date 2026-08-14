import { Router } from 'express';

/**
 * Factory to create company guides catalog router
 * @param {object} companyGuidesController - Instance of CompanyGuidesController
 * @param {import('express').RequestHandler} authMiddleware - Authentication protection middleware
 */
export const createCompanyGuidesRouter = (companyGuidesController, authMiddleware) => {
  const router = Router();

  // Guard all guides operations
  router.use(authMiddleware);

  // Fetch all guides
  router.get('/', companyGuidesController.getAll);

  // Fetch details of a single guide
  router.get('/:id', companyGuidesController.getById);

  return router;
};
export default createCompanyGuidesRouter;
