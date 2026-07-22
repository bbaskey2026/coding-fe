/**
 * AuthLayout — Bare shell, NO Navbar / Sidebar / Footer
 *
 * Used for authentication pages and error pages where the platform
 * chrome would distract from the focused task (login, register, 404).
 */
import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const AuthLayout = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "background.default",
      color: "text.primary",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Outlet />
  </Box>
);
