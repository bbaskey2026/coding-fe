export class TutorialRepository {
  constructor(tutorialModel) {
    this.Tutorial = tutorialModel;
  }

  async findAll(filters = {}) {
    const { search, language, category } = filters;
    const query = {};
    
    if (language && language !== 'All') {
      query.language = new RegExp(`^${language}$`, 'i');
    }
    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    return this.Tutorial.find(query).sort({ createdAt: -1 });
  }

  async findById(id) {
    return this.Tutorial.findById(id);
  }

  async create(data) {
    return this.Tutorial.create(data);
  }

  async update(id, data) {
    return this.Tutorial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return this.Tutorial.findByIdAndDelete(id);
  }
}
export default TutorialRepository;
