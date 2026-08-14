export class TutorialService {
  constructor(tutorialRepository) {
    this.tutorialRepository = tutorialRepository;
  }

  async getAllTutorials(filters = {}) {
    return this.tutorialRepository.findAll(filters);
  }

  async getTutorialById(id) {
    const tutorial = await this.tutorialRepository.findById(id);
    if (!tutorial) {
      const err = new Error('Tutorial not found');
      err.statusCode = 404;
      err.isOperational = true;
      throw err;
    }
    return tutorial;
  }

  async createTutorial(data) {
    return this.tutorialRepository.create(data);
  }

  async updateTutorial(id, data) {
    await this.getTutorialById(id); // Throws 404 if not found
    return this.tutorialRepository.update(id, data);
  }

  async deleteTutorial(id) {
    await this.getTutorialById(id); // Throws 404 if not found
    return this.tutorialRepository.delete(id);
  }
}
export default TutorialService;
