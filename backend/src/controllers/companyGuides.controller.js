import { ResponseUtil } from '../utils/response.js';

export class CompanyGuidesController {
  /**
   * @param {object} companyGuidesService - Instance of CompanyGuidesService
   */
  constructor(companyGuidesService) {
    this.companyGuidesService = companyGuidesService;
  }

  /**
   * Fetch all company guides
   */
  getAll = async (req, res, next) => {
    try {
      const list = await this.companyGuidesService.getAllGuides();
      return ResponseUtil.success(res, list);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Fetch a single guide by ID
   */
  getById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        const err = new Error('Invalid guide ID format');
        err.statusCode = 400;
        return next(err);
      }
      const guide = await this.companyGuidesService.getGuideById(id);
      return ResponseUtil.success(res, guide);
    } catch (error) {
      return next(error);
    }
  };
}
