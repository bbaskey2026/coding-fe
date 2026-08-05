import { ResponseUtil } from '../utils/response.js';

export class ProblemsController {
  /**
   * @param {object} problemsService - Instance of ProblemsService
   */
  constructor(problemsService) {
    this.problemsService = problemsService;
  }

  /**
   * Fetch all problems with query filters
   */
  getAll = async (req, res, next) => {
    try {
      const { difficulty, tag } = req.query;
      const list = await this.problemsService.getAllProblems({ difficulty, tag });
      return ResponseUtil.success(res, list);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Fetch a single problem by numeric ID
   */
  getById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        const err = new Error('Invalid problem ID format');
        err.statusCode = 400;
        return next(err);
      }
      const problem = await this.problemsService.getProblemById(id);
      return ResponseUtil.success(res, problem);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Compile and run code assertions
   */
  run = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { code, language, input } = req.body;
      
      if (isNaN(id)) {
        const err = new Error('Invalid problem ID format');
        err.statusCode = 400;
        return next(err);
      }

      if (!code || !language) {
        const err = new Error('Code script and programming language are required');
        err.statusCode = 400;
        return next(err);
      }

      const result = await this.problemsService.runCode(id, { code, language, input });
      return ResponseUtil.success(res, result);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Submit solution and verify assertions
   */
  submit = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { code, language } = req.body;

      if (isNaN(id)) {
        const err = new Error('Invalid problem ID format');
        err.statusCode = 400;
        return next(err);
      }

      if (!code || !language) {
        const err = new Error('Code script and programming language are required');
        err.statusCode = 400;
        return next(err);
      }

      const result = await this.problemsService.submitCode(id, { code, language });
      return ResponseUtil.success(res, result);
    } catch (error) {
      return next(error);
    }
  };
}
