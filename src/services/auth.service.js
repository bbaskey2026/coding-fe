/**
 * auth.service.js — Authentication API service
 *
 * All auth-related HTTP calls go through here.
 * Tokens are stored/cleared via the token utility helpers.
 *
 * When VITE_API_URL is not set or the backend is unavailable, the service
 * falls back to a local mock so the UI works without a running server.
 * Remove the mock block and set VITE_API_URL in .env for production.
 */

import { apiClient, ApiError } from "./apiClient";
import {
  setAccessToken,
  setRefreshToken,
  setStoredUser,
  clearTokens,
} from "../utils/token";

// ── Mock helpers (remove when real backend is ready) ────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const MOCK_USERS_KEY = "cf_mock_users";

const getMockUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveMockUsers = (users) =>
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

const makeMockToken = (payload) =>
  btoa(JSON.stringify({ ...payload, exp: Date.now() + 3600_000 }));

// Flag: set VITE_API_URL in .env to switch off mock mode
const USE_MOCK = !import.meta.env.VITE_API_URL;

// ── Auth service ─────────────────────────────────────────────────────────────

export const authService = {
  /**
   * Login with email + password.
   * Stores tokens and the user object in localStorage on success.
   * @returns {{ user, accessToken, refreshToken }}
   */
  async login({ email, password }) {
    if (USE_MOCK) {
      await delay(600);
      const users = getMockUsers();
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) throw new ApiError(401, "Invalid email or password");

      const user = { id: found.id, username: found.username, email: found.email, role: found.role };
      const accessToken  = makeMockToken({ sub: user.id, type: "access" });
      const refreshToken = makeMockToken({ sub: user.id, type: "refresh" });

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setStoredUser(user);
      return { user, accessToken, refreshToken };
    }

    const data = await apiClient.post("/auth/login", { email, password }, { withAuth: false });
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setStoredUser(data.user);
    return data;
  },

  /**
   * Register a new account.
   * Does NOT log the user in — they must verify OTP first.
   * @returns {{ message: string }}
   */
  async register({ username, email, password }) {
    if (USE_MOCK) {
      await delay(700);
      const users = getMockUsers();
      if (users.find((u) => u.email === email))
        throw new ApiError(409, "An account with this email already exists");

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // ⚠ mock only — never store plaintext in production
        role: "user",
        verified: false,
        otp: "1234", // fixed OTP for mock testing
      };
      saveMockUsers([...users, newUser]);
      return { message: "OTP sent to " + email };
    }

    return apiClient.post("/auth/register", { username, email, password }, { withAuth: false });
  },

  /**
   * Verify OTP code (registration or forgot-password flow).
   * @returns {{ message: string }}
   */
  async verifyOtp({ email, otp, flow = "register" }) {
    if (USE_MOCK) {
      await delay(500);
      const users = getMockUsers();
      const idx = users.findIndex((u) => u.email === email);
      if (idx === -1) throw new ApiError(404, "Account not found");
      if (users[idx].otp !== otp) throw new ApiError(400, "Invalid OTP code");

      if (flow === "register") {
        users[idx].verified = true;
        saveMockUsers(users);
      }
      return { message: "OTP verified" };
    }

    return apiClient.post("/auth/verify-otp", { email, otp, flow }, { withAuth: false });
  },

  /**
   * Request a password-reset OTP to be emailed.
   * @returns {{ message: string }}
   */
  async forgotPassword({ email }) {
    if (USE_MOCK) {
      await delay(600);
      const users = getMockUsers();
      const user = users.find((u) => u.email === email);
      if (!user) throw new ApiError(404, "No account found with this email");
      return { message: "Reset OTP dispatched to " + email };
    }

    return apiClient.post("/auth/forgot-password", { email }, { withAuth: false });
  },

  /**
   * Reset password after OTP verification.
   * @returns {{ message: string }}
   */
  async resetPassword({ email, otp, newPassword }) {
    if (USE_MOCK) {
      await delay(600);
      const users = getMockUsers();
      const idx = users.findIndex((u) => u.email === email);
      if (idx === -1) throw new ApiError(404, "Account not found");
      if (users[idx].otp !== otp) throw new ApiError(400, "Invalid OTP");

      users[idx].password = newPassword;
      saveMockUsers(users);
      return { message: "Password reset successful" };
    }

    return apiClient.post("/auth/reset-password", { email, otp, newPassword }, { withAuth: false });
  },

  /**
   * Log out — clears all tokens from localStorage.
   * Optionally notifies the backend to invalidate the refresh token.
   */
  async logout() {
    if (!USE_MOCK) {
      try {
        await apiClient.post("/auth/logout", {});
      } catch {
        // ignore — clear local tokens regardless
      }
    }
    clearTokens();
  },

  /**
   * Refresh the access token (called automatically by apiClient on 401).
   * @returns {{ accessToken: string }}
   */
  async refreshToken(refreshToken) {
    if (USE_MOCK) {
      await delay(200);
      const newToken = makeMockToken({ type: "access", refreshed: true });
      setAccessToken(newToken);
      return { accessToken: newToken };
    }

    return apiClient.post("/auth/refresh", { refreshToken }, { withAuth: false });
  },
};
