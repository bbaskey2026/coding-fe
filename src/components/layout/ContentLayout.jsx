/**
 * ContentLayout — Navbar + Footer, NO Sidebar
 *
 * Used for public-facing pages (Hero, Landing) where the sidebar
 * would be out of place but a top navigation bar and footer are still needed.
 */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CommandPalette } from "../features/CommandPalette";
import { NotificationCenter } from "../features/NotificationCenter";

export const ContentLayout = () => {
  const location = useLocation();
  return (
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
        <Box component="main" sx={{ flex: 1, pt: 10, display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", flexGrow: 1, width: "100%" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};
