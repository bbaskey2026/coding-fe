// src/api/endpoints.js
// Centralized API endpoint definitions and type helpers
// Base URL is read from VITE_API_URL environment variable (fallback to empty string for mock mode)

export const BASE_URL = import.meta.env.VITE_API_URL || "";

// Helper to prefix base URL
export const api = (path) => `${BASE_URL}${path}`;

// Auth endpoints
export const AuthEndpoints = {
  login: () => api("/auth/login"),
  register: () => api("/auth/register"),
  verifyOtp: () => api("/auth/verify-otp"),
  forgotPassword: () => api("/auth/forgot-password"),
  resetPassword: () => api("/auth/reset-password"),
  logout: () => api("/auth/logout"),
  refresh: () => api("/auth/refresh"),
};

// User endpoints
export const UserEndpoints = {
  profile: () => api("/users/me"),
  updateProfile: () => api("/users/me"),
  getById: (id) => api(`/users/${id}`),
};

// Problems endpoints
export const ProblemsEndpoints = {
  list: (query = "") => api(`/problems${query}`),
  getById: (id) => api(`/problems/${id}`),
  submit: (id) => api(`/problems/${id}/submit`),
  run: (id) => api(`/problems/${id}/run`),
};

// Company Guides endpoints
export const CompanyGuidesEndpoints = {
  list: () => api("/company-guides"),
  getById: (id) => api(`/company-guides/${id}`),
};

// Export a map for easy lookup if needed
export const EndpointsMap = {
  auth: AuthEndpoints,
  user: UserEndpoints,
  problems: ProblemsEndpoints,
  companyGuides: CompanyGuidesEndpoints,
};
