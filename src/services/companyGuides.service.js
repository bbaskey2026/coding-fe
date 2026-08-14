/**
 * companyGuides.service.js — Company Preparation Guides API service
 */

import { apiClient } from "./apiClient";

export const companyGuidesService = {
  /**
   * GET /company-guides — fetch all guides
   */
  getAll() {
    return apiClient.get("/company-guides");
  },

  /**
   * GET /company-guides/:id — fetch a single guide by ID
   * @param {string|number} id
   */
  getById(id) {
    return apiClient.get(`/company-guides/${id}`);
  },
};
