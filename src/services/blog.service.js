/**
 * blog.service.js — Blogs API service
 */

import { apiClient } from "./apiClient";

export const blogService = {
  /**
   * GET /blogs — fetch blog posts list with optional query parameters
   * @param {{ tag?: string, search?: string, status?: string, authorId?: number }} params
   */
  getAll(params = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    ).toString();
    return apiClient.get(`/blogs${qs ? `?${qs}` : ""}`);
  },

  /**
   * GET /blogs/:id — fetch a single blog post by ID
   * @param {string} id
   */
  getById(id) {
    return apiClient.get(`/blogs/${id}`);
  },

  /**
   * POST /blogs — create a new blog post
   * @param {{ title: string, summary: string, content: string, coverImage?: string, status?: string, tags?: string[] }} payload
   */
  create(payload) {
    return apiClient.post('/blogs', payload);
  },

  /**
   * PUT /blogs/:id — update an existing blog post
   * @param {string} id
   * @param {Partial<{ title: string, summary: string, content: string, coverImage?: string, status?: string, tags?: string[] }>} payload
   */
  update(id, payload) {
    return apiClient.put(`/blogs/${id}`, payload);
  },

  /**
   * DELETE /blogs/:id — delete a blog post
   * @param {string} id
   */
  delete(id) {
    return apiClient.delete(`/blogs/${id}`);
  },

  /**
   * POST /blogs/:id/clap — clap (like) a blog post (toggle)
   * @param {string} id
   */
  clap(id) {
    return apiClient.post(`/blogs/${id}/clap`, {});
  },

  /**
   * GET /blogs/:id/comments — fetch comments on a post
   * @param {string} id
   */
  getComments(id) {
    return apiClient.get(`/blogs/${id}/comments`);
  },

  /**
   * POST /blogs/:id/comments — add a comment
   * @param {string} id
   * @param {{ content: string }} payload
   */
  addComment(id, payload) {
    return apiClient.post(`/blogs/${id}/comments`, payload);
  },

  /**
   * DELETE /blogs/comments/:commentId — delete a comment
   * @param {string} commentId
   */
  deleteComment(commentId) {
    return apiClient.delete(`/blogs/comments/${commentId}`);
  },
};

export default blogService;
