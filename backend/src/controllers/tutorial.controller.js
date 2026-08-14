export class TutorialController {
  constructor(tutorialService) {
    this.tutorialService = tutorialService;
  }

  getAllTutorials = async (req, res, next) => {
    try {
      const { search, language, category } = req.query;
      const tutorials = await this.tutorialService.getAllTutorials({ search, language, category });
      
      res.status(200).json({
        status: 'success',
        results: tutorials.length,
        data: { tutorials }
      });
    } catch (err) {
      next(err);
    }
  };

  getTutorialById = async (req, res, next) => {
    try {
      const tutorial = await this.tutorialService.getTutorialById(req.params.id);
      
      res.status(200).json({
        status: 'success',
        data: { tutorial }
      });
    } catch (err) {
      next(err);
    }
  };

  createTutorial = async (req, res, next) => {
    try {
      const tutorial = await this.tutorialService.createTutorial(req.body);
      
      res.status(201).json({
        status: 'success',
        data: { tutorial }
      });
    } catch (err) {
      next(err);
    }
  };

  updateTutorial = async (req, res, next) => {
    try {
      const tutorial = await this.tutorialService.updateTutorial(req.params.id, req.body);
      
      res.status(200).json({
        status: 'success',
        data: { tutorial }
      });
    } catch (err) {
      next(err);
    }
  };

  deleteTutorial = async (req, res, next) => {
    try {
      await this.tutorialService.deleteTutorial(req.params.id);
      
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  };
}
export default TutorialController;
