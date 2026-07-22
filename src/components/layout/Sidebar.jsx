import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  Map,
  Trophy,
  BarChart3,
  MessageSquare,
  Briefcase,
  UserCheck,
  FileText,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

// MUI Imports
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: LayoutDashboard },
    { name: "Dashboard", path: "/dashbaord", icon: LayoutDashboard },
    { name: "Problems", path: "/problems", icon: Code2 },
    { name: "Study Plans", path: "/study-plans", icon: Map },
    { name: "Contests", path: "/contests", icon: Trophy },
    { name: "Leaderboard", path: "/leaderboard", icon: BarChart3 },
    { name: "Forum", path: "/forum", icon: MessageSquare },
    { name: "Interview Exp", path: "/interviews", icon: Briefcase },
    { name: "Mock Interview", path: "/mock-interview", icon: UserCheck },
    { name: "Notes Workspace", path: "/notes", icon: FileText },
    { name: "Certificates", path: "/certificates", icon: FileCheck }
  ];

  const renderContent = () => (
    <Box
      className="pattern-dots"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        pt: 10, // matches Navbar height spacing
        px: 1.5,
        pb: 3,
        position: "relative",
        textAlign: "left",
      }}
    >
      {/* Collapse Toggle Button (Desktop Only) */}
      <IconButton
        onClick={onToggleCollapse}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          right: -12,
          top: 88,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          zIndex: 50,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          "&:hover": {
            color: "text.primary",
            backgroundColor: "background.card",
          },
        }}
      >
        {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </IconButton>

      {/* Menu List */}
      <Box component="nav" sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose} // Closes drawer on mobile when clicking links
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.75,
                  px: 1.75,
                  py: 1.25,
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  userSelect: "none",
                  transition: "all 0.2s",
                  backgroundColor: isActive ? "rgba(212, 175, 55, 0.1)" : "transparent",
                  border: "1px solid",
                  borderColor: isActive ? "rgba(212, 175, 55, 0.2)" : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  "&:hover": {
                    color: isActive ? "primary.main" : "text.primary",
                    backgroundColor: isActive ? "rgba(212, 175, 55, 0.1)" : "background.card",
                  },
                }}
              >
                <Icon size={16} style={{ color: isActive ? "#D4AF37" : "#CFCFCF" }} />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ flex: 1, whiteSpace: "nowrap" }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </Box>
            </NavLink>
          );
        })}
      </Box>

      {/* Footer Info */}
      {!isCollapsed && (
        <Box sx={{ pt: 2, borderTop: "1px solid rgba(44, 44, 44, 0.4)", pl: 1.5 }}>
          <Typography variant="caption" sx={{ fontSize: "10px", fontWeight: "light", color: "text.secondary" }}>
            © 2026 CodeX86 Inc.
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer (Visible on smaller screens) */}
      <Drawer
        open={isOpen}
        onClose={onClose}
        variant="temporary"
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: 1300,
          "& .MuiDrawer-paper": {
            width: 256,
            backgroundColor: "background.paper",
            border: "none",
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "text.secondary",
              "&:hover": { color: "text.primary", backgroundColor: "background.card" },
              zIndex: 1400,
            }}
          >
            <X size={16} />
          </IconButton>
          {renderContent()}
        </Box>
      </Drawer>

      {/* Desktop Sidebar (Permanent display on larger screens) */}
      <Box
        component="aside"
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          height: "100%",
          zIndex: 30,
          width: isCollapsed ? "72px" : "256px",
          transition: "width 0.3s ease",
        }}
      >
        {renderContent()}
      </Box>
    </>
  );
};
