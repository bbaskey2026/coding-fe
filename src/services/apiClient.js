/**
 * apiClient.js — Central HTTP client
 *
 * Wraps the native fetch API and provides typed methods for every HTTP verb.
 * Features:
 *  - Auto-attaches Authorization header from localStorage
 *  - On 401: silently refreshes the access token once, then retries
 *  - Throws ApiError (with .status + .message) on non-2xx responses
 *
 * Usage:
 *   import { apiClient } from "./apiClient";
 *   const data = await apiClient.get("/problems");
 *   const result = await apiClient.post("/auth/login", { email, password });
 *
 * Environment:
 *   Set VITE_API_URL in .env to point at your backend.
 *   Falls back to http://localhost:5000/api during development.
 */

import { getAccessToken, setAccessToken, getRefreshToken, clearTokens } from "../utils/token";

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Structured error ─────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(status, message, data = null) {
    super(message);
    this.name    = "ApiError";
    this.status  = status;
    this.data    = data;
  }
}

// ── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Build headers for a request.
 * @param {boolean} withAuth - whether to attach the Bearer token
 * @param {Record<string,string>} extra - any additional headers
 */
const buildHeaders = (withAuth = true, extra = {}) => {
  const headers = { "Content-Type": "application/json", ...extra };
  if (withAuth) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Parse a Response → JSON or text, then throw ApiError if not ok.
 */
const parseResponse = async (res) => {
  let body = null;
  const contentType = res.headers.get("Content-Type") || "";

  try {
    body = contentType.includes("application/json")
      ? await res.json()
      : await res.text();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const message =
      (body && (body.message || body.error || body.detail)) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message, body);
  }

  return body;
};

/**
 * Attempt to silently refresh the access token.
 * Returns true if successful, false otherwise.
 */
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new ApiError(401, "No refresh token available");

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ refreshToken }),
  });

  const data = await parseResponse(res);
  setAccessToken(data.accessToken);
  return data.accessToken;
};

// ── Core request function ────────────────────────────────────────────────────

/**
 * @param {string} method - HTTP verb
 * @param {string} endpoint - path relative to BASE_URL (e.g. "/auth/login")
 * @param {object} [body] - request body (will be JSON-stringified)
 * @param {object} [options]
 * @param {boolean} [options.withAuth=true] - attach Bearer token
 * @param {Record<string,string>} [options.headers] - extra headers
 * @param {boolean} [options._isRetry=false] - internal flag to prevent infinite loop
 */
const request = async (method, endpoint, body = undefined, options = {}) => {
  const { withAuth = true, headers: extraHeaders = {}, _isRetry = false } = options;
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const fetchOptions = {
    method,
    headers: buildHeaders(withAuth, extraHeaders),
    ...(body !== undefined && { body: JSON.stringify(body) }),
  };

  let res;
  try {
    res = await fetch(url, fetchOptions);
  } catch (err) {
    throw new ApiError(0, "Network error — unable to reach the server");
  }

  // ── Handle 401 + silent token refresh ──────────────────────────────────────
  if (res.status === 401 && withAuth && !_isRetry) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);
      } catch (refreshErr) {
        isRefreshing = false;
        refreshSubscribers = [];
        clearTokens();
        // Redirect to auth — works even outside React components
        window.location.href = "/auth";
        throw refreshErr;
      }
    }

    // If another request triggered the refresh, queue until it completes
    return new Promise((resolve, reject) => {
      refreshSubscribers.push(async (newToken) => {
        try {
          fetchOptions.headers["Authorization"] = `Bearer ${newToken}`;
          const retryRes = await fetch(url, fetchOptions);
          resolve(parseResponse(retryRes));
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  return parseResponse(res);
};

// ── Public API ───────────────────────────────────────────────────────────────

export const apiClient = {
  /** GET  /endpoint */
  get: (endpoint, options)          => request("GET",    endpoint, undefined, options),

  /** POST /endpoint  { ...body } */
  post: (endpoint, body, options)   => request("POST",   endpoint, body,      options),

  /** PUT  /endpoint  { ...body } */
  put: (endpoint, body, options)    => request("PUT",    endpoint, body,      options),

  /** PATCH /endpoint { ...body } */
  patch: (endpoint, body, options)  => request("PATCH",  endpoint, body,      options),

  /** DELETE /endpoint */
  delete: (endpoint, options)       => request("DELETE", endpoint, undefined, options),
};
