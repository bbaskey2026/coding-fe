/**
 * user.service.js — User profile API service
 */

import { apiClient } from "./apiClient";

export const userService = {
  /** GET /users/me — fetch the authenticated user's profile */
  getProfile() {
    return apiClient.get("/users/me");
  },

  /**
   * PATCH /users/me — update profile fields
   * @param {Partial<{ username: string, avatar: string, bio: string }>} fields
   */
  updateProfile(fields) {
    return apiClient.patch("/users/me", fields);
  },

  /**
   * GET /users/:id — fetch any user's public profile
   * @param {string} userId
   */
  getUserById(userId) {
    return apiClient.get(`/users/${userId}`);
  },
};
