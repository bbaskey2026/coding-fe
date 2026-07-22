/**
 * ContentLayout — Navbar + Footer, NO Sidebar
 *
 * Used for public-facing pages (Hero, Landing) where the sidebar
 * would be out of place but a top navigation bar and footer are still needed.
 */
import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CommandPalette } from "../features/CommandPalette";
import { NotificationCenter } from "../features/NotificationCenter";

export const ContentLayout = () => (
  <>
    {/* ── Global overlays ───────────────────────────────────────────────────── */}
    <CommandPalette />
    <NotificationCenter />

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Navbar onMenuClick={() => {}} />

      {/* Page content — pt-20 (80px) clears the fixed Navbar */}
      <Box component="main" sx={{ flex: 1, pt: 10 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  </>
);
