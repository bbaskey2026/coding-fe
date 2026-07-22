/**
 * problems.service.js — Problems API service
 */

import { apiClient } from "./apiClient";

export const problemsService = {
  /**
   * GET /problems — fetch paginated problem list
   * @param {{ page?: number, limit?: number, difficulty?: string, tag?: string }} params
   */
  getAll(params = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();
    return apiClient.get(`/problems${qs ? `?${qs}` : ""}`);
  },

  /**
   * GET /problems/:id — fetch a single problem by ID
   * @param {string|number} id
   */
  getById(id) {
    return apiClient.get(`/problems/${id}`);
  },

  /**
   * POST /problems/:id/submit — submit a solution
   * @param {string|number} id
   * @param {{ code: string, language: string }} payload
   */
  submit(id, { code, language }) {
    return apiClient.post(`/problems/${id}/submit`, { code, language });
  },

  /**
   * POST /problems/:id/run — run code without submitting
   * @param {string|number} id
   * @param {{ code: string, language: string, input?: string }} payload
   */
  run(id, { code, language, input = "" }) {
    return apiClient.post(`/problems/${id}/run`, { code, language, input });
  },
};
