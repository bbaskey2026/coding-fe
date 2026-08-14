/**
 * AuthLayout — Bare shell, NO Navbar / Sidebar / Footer
 *
 * Used for authentication pages and error pages where the platform
 * chrome would distract from the focused task (login, register, 404).
 */
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";

export const AuthLayout = () => {
  const location = useLocation();
  return (
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
  );
};
