/**
 * AppLayout — Full shell: Sidebar + Navbar + Footer
 *
 * Used for all main platform pages (dashboard, problems, leaderboard, etc.)
 * The Sidebar is collapsible on desktop and a slide-in drawer on mobile.
 */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { CommandPalette } from "../features/CommandPalette";
import { NotificationCenter } from "../features/NotificationCenter";

export const AppLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);

  return (
    <>
      {/* ── Global overlays (rendered outside the flex flow so they sit on top) ── */}
      <CommandPalette />
      <NotificationCenter />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          color: "text.primary",
          display: "flex",
        }}
      >
        {/* ── Sidebar ───────────────────────────────────────────────────────────── */}
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          isCollapsed={desktopSidebarCollapsed}
          onToggleCollapse={() => setDesktopSidebarCollapsed((c) => !c)}
        />

        {/* ── Right pane (Navbar + page content + Footer) ───────────────────────── */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            transition: "all 0.3s ease",
            pl: {
              xs: 0,
              md: desktopSidebarCollapsed ? "72px" : "256px",
            },
          }}
        >
          {/* Header */}
          <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />

          {/* Page content — pt-20 (80px) clears the fixed Navbar */}
          <Box
            component="main"
            sx={{
              flex: 1,
              pt: 10,
              minHeight: "calc(100vh - 80px)",
            }}
          >
            <Outlet />
          </Box>

          {/* Footer */}
          <Footer />
        </Box>
      </Box>
    </>
  );
};
