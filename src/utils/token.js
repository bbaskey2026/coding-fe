/**
 * token.js — localStorage JWT token helpers
 *
 * All token read/write is centralised here so the rest of the app
 * never touches localStorage keys directly.
 */

const ACCESS_KEY  = "cf_access_token";
const REFRESH_KEY = "cf_refresh_token";
const USER_KEY    = "cf_user";

// ── Access Token ────────────────────────────────────────────────────────────
export const getAccessToken  = ()        => localStorage.getItem(ACCESS_KEY);
export const setAccessToken  = (token)   => localStorage.setItem(ACCESS_KEY, token);
export const removeAccessToken = ()      => localStorage.removeItem(ACCESS_KEY);

// ── Refresh Token ───────────────────────────────────────────────────────────
export const getRefreshToken   = ()      => localStorage.getItem(REFRESH_KEY);
export const setRefreshToken   = (token) => localStorage.setItem(REFRESH_KEY, token);
export const removeRefreshToken = ()     => localStorage.removeItem(REFRESH_KEY);

// ── Persisted User Object ───────────────────────────────────────────────────
export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
export const setStoredUser  = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const removeStoredUser = ()   => localStorage.removeItem(USER_KEY);

// ── Clear All ───────────────────────────────────────────────────────────────
export const clearTokens = () => {
  removeAccessToken();
  removeRefreshToken();
  removeStoredUser();
};
