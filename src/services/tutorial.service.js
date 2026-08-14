import { apiClient } from './apiClient';

export const tutorialService = {
  /**
   * Fetch all tutorials with optional filters
   * @param {object} params - Query filters { search, language, category }
   */
  async getAllTutorials(params = {}) {
    const response = await apiClient.get('/tutorials', { params });
    return response.data.data.tutorials;
  },

  /**
   * Fetch a single tutorial by ID
   * @param {string} id - Tutorial ID
   */
  async getTutorialById(id) {
    const response = await apiClient.get(`/tutorials/${id}`);
    return response.data.data.tutorial;
  },

  /**
   * Create a new tutorial (Admin only)
   * @param {object} tutorialData
   */
  async createTutorial(tutorialData) {
    const response = await apiClient.post('/tutorials', tutorialData);
    return response.data.data.tutorial;
  },

  /**
   * Update an existing tutorial (Admin only)
   * @param {string} id
   * @param {object} tutorialData
   */
  async updateTutorial(id, tutorialData) {
    const response = await apiClient.put(`/tutorials/${id}`, tutorialData);
    return response.data.data.tutorial;
  },

  /**
   * Delete a tutorial (Admin only)
   * @param {string} id
   */
  async deleteTutorial(id) {
    await apiClient.delete(`/tutorials/${id}`);
  }
};

export default tutorialService;
