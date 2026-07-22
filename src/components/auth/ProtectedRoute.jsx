/**
 * ProtectedRoute.jsx — JWT-based route guard
 *
 * Usage in router:
 *   { element: <ProtectedRoute />, children: [ ...privateRoutes ] }
 *
 * Behaviour:
 *  - isLoading  → full-screen spinner (avoids flash-of-redirect on refresh)
 *  - !isAuthenticated → redirects to /auth, preserving the intended URL
 *  - isAuthenticated → renders <Outlet /> (the matched child route)
 */

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Spinning logo */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-white text-lg shadow-[0_0_24px_rgba(99,102,241,0.4)] animate-pulse">
            CF
          </div>
          <p className="text-xs text-text-secondary animate-pulse">Restoring session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the page the user tried to visit so we can redirect back after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
