export class CompanyGuidesService {
  /**
   * @param {object} companyGuidesRepository - Instance of CompanyGuidesRepository
   */
  constructor(companyGuidesRepository) {
    this.companyGuidesRepository = companyGuidesRepository;
  }

  /**
   * Fetch all preparation articles
   */
  async getAllGuides() {
    return this.companyGuidesRepository.findAll();
  }

  /**
   * Fetch a single preparation article by ID
   */
  async getGuideById(id) {
    const guide = await this.companyGuidesRepository.findById(id);
    if (!guide) {
      throw new Error('Company preparation guide not found');
    }
    return guide;
  }
}
