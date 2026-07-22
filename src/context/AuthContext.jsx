/**
 * AuthContext.jsx — Authentication state & actions
 *
 * Provides via useAuth():
 *   { user, isAuthenticated, isLoading, login, register, logout }
 *
 * On mount it restores session from localStorage so the user stays
 * logged in across page refreshes.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/auth.service";
import { getStoredUser, getAccessToken, clearTokens } from "../utils/token";

// ── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }) => {
  const [user,      setUser]      = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true while restoring session

  // Restore session on first mount
  useEffect(() => {
    const storedUser  = getStoredUser();
    const accessToken = getAccessToken();

    if (storedUser && accessToken) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  // ── login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    const data = await authService.login({ email, password });
    setUser(data.user);
    return data;
  }, []);

  // ── register ───────────────────────────────────────────────────────────────
  const register = useCallback(async ({ username, email, password }) => {
    return authService.register({ username, email, password });
  }, []);

  // ── verifyOtp ──────────────────────────────────────────────────────────────
  const verifyOtp = useCallback(async ({ email, otp, flow }) => {
    return authService.verifyOtp({ email, otp, flow });
  }, []);

  // ── forgotPassword ─────────────────────────────────────────────────────────
  const forgotPassword = useCallback(async ({ email }) => {
    return authService.forgotPassword({ email });
  }, []);

  // ── resetPassword ──────────────────────────────────────────────────────────
  const resetPassword = useCallback(async (payload) => {
    return authService.resetPassword(payload);
  }, []);

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    clearTokens();
  }, []);

  // ── Derived state ──────────────────────────────────────────────────────────
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        verifyOtp,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
