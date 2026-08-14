import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Flame, Search, User, LogOut, Settings as SettingsIcon, Shield, Menu, X, Award, Sun, Moon } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import MenuMui from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export const Navbar = ({ onMenuClick }) => {
  const { userProfile, notifications, markAllNotificationsRead, setCommandPaletteOpen, themeMode, toggleTheme } = useApp();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // MUI Dropdown states
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    setProfileAnchorEl(null);
    await logout();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.default",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
        zIndex: 1201, // clear sidebar drawer
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Left Section: Logo & Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { md: "none" },
              color: "text.secondary",
              borderRadius: "8px",
              p: 1,
              "&:hover": {
                color: "text.primary",
                backgroundColor: "background.card",
              },
            }}
          >
            <Menu size={18} />
          </IconButton>

          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "background.card",
                border: "1px solid",
                borderColor: "divider",
                cursor: "pointer",
              }}
            >
              <img
                src={logo}
                alt="CodeX86 Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }}
              />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                display: { xs: "none", sm: "inline-block" },
                transition: "color 0.2s",
                "&:hover": { color: "primary.main" },
              }}
            >
              CodeX86
            </Typography>
          </Link>
        </Box>

        {/* Center: Search Box */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            width: 320,
            height: 40,
            backgroundColor: "background.card",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            px: 1.5,
          }}
        >
          <Search size={18} style={{ color: "#CFCFCF" }} />
          <InputBase
            placeholder="Search..."
            sx={{
              ml: 1.5,
              flex: 1,
              fontSize: "14px",
              color: "text.primary",
              "& .MuiInputBase-input": {
                p: 0,
              },
            }}
          />
        </Box>

        {/* Right Section: Streak, Rating, Notifications, Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Mobile search trigger */}
          <IconButton
            onClick={() => setCommandPaletteOpen(true)}
            sx={{
              display: { md: "none" },
              color: "text.secondary",
              borderRadius: "8px",
              p: 1,
              "&:hover": {
                color: "text.primary",
                backgroundColor: "background.card",
              },
            }}
          >
            <Search size={16} />
          </IconButton>

          {/* Theme Switcher */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: "text.secondary",
              borderRadius: "8px",
              p: 1,
              "&:hover": {
                color: "text.primary",
                backgroundColor: "background.card",
              },
            }}
          >
            {themeMode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          {isAuthenticated ? (
            <>
              {/* Streak Indicator */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#F59E0B",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Flame size={14} style={{ fill: "#F59E0B" }} />
                </motion.div>
                <span>{userProfile.streak}d</span>
              </Box>

              {/* Contest Rating */}
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 0.75,
                  backgroundColor: "primary.main",
                  color: "background.default",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                <Award size={14} />
                <span>{userProfile.rating} Pt</span>
              </Box>

              {/* Notifications Trigger */}
              <Box>
                <IconButton
                  onClick={(e) => setNotifAnchorEl(e.currentTarget)}
                  sx={{
                    color: "text.secondary",
                    borderRadius: "8px",
                    p: 1,
                    "&:hover": {
                      color: "text.primary",
                      backgroundColor: "background.card",
                    },
                  }}
                >
                  <Badge
                    badgeContent={unreadCount}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "9px",
                        height: 16,
                        minWidth: 16,
                        p: 0,
                      },
                    }}
                  >
                    <Bell size={18} />
                  </Badge>
                </IconButton>

                {/* Notifications Dropdown Menu */}
                <MenuMui
                  anchorEl={notifAnchorEl}
                  open={Boolean(notifAnchorEl)}
                  onClose={() => setNotifAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      width: 320,
                      maxHeight: 400,
                      backgroundColor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
                      p: 1.5,
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, mb: 1, borderBottom: "1px solid rgba(44, 44, 44, 0.4)" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary" }}>Notifications</Typography>
                    <Button
                      onClick={() => {
                        markAllNotificationsRead();
                        setNotifAnchorEl(null);
                      }}
                      sx={{
                        p: 0,
                        minWidth: 0,
                        fontSize: "10px",
                        color: "primary.main",
                        textTransform: "none",
                        "&:hover": { textDecoration: "underline", backgroundColor: "transparent" },
                      }}
                    >
                      Mark all as read
                    </Button>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", maxHeight: 280 }}>
                    {notifications.length === 0 ? (
                      <Typography variant="caption" sx={{ display: "block", textAlign: "center", py: 3, color: "text.secondary" }}>
                        No new notifications
                      </Typography>
                    ) : (
                      notifications.map((n) => (
                        <Box
                          key={n.id}
                          sx={{
                            p: 1,
                            borderRadius: "8px",
                            backgroundColor: n.read ? "rgba(26, 26, 26, 0.3)" : "background.card",
                            borderLeft: n.read ? "none" : "2px solid",
                            borderLeftColor: "primary.main",
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="caption" sx={{ fontWeight: "semibold", color: "text.primary" }}>{n.title}</Typography>
                            <Typography variant="caption" sx={{ fontSize: "9px", color: "text.secondary" }}>{n.date}</Typography>
                          </Box>
                          <Typography variant="caption" sx={{ display: "block", color: "text.secondary", fontWeight: "light", mt: 0.5 }}>
                            {n.message}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Box>
                </MenuMui>
              </Box>

              {/* Profile Avatar trigger */}
              <Box>
                <IconButton
                  component={motion.button}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => setProfileAnchorEl(e.currentTarget)}
                  sx={{ p: 0.5, borderRadius: "50%" }}
                >
                  <Avatar
                    src={userProfile.avatar}
                    alt={userProfile.username}
                    sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }}
                  />
                </IconButton>

                {/* Profile dropdown */}
                <MenuMui
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={() => setProfileAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      width: 220,
                      backgroundColor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
                      p: 1,
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Box sx={{ px: 1.5, py: 1, borderBottom: "1px solid rgba(44, 44, 44, 0.4)", mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "semibold", color: "text.primary" }}>{userProfile.username}</Typography>
                    <Typography variant="caption" sx={{ fontSize: "10px", color: "text.secondary", mt: 0.5, display: "block" }}>
                      {userProfile.role.toUpperCase()}
                    </Typography>
                  </Box>

                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={() => setProfileAnchorEl(null)}
                    sx={{
                      fontSize: "12px",
                      borderRadius: "8px",
                      gap: 1.5,
                      color: "text.secondary",
                      "&:hover": { color: "text.primary", backgroundColor: "background.card" },
                    }}
                  >
                    <User size={14} />
                    <span>My Profile</span>
                  </MenuItem>

                  <MenuItem
                    component={Link}
                    to="/settings"
                    onClick={() => setProfileAnchorEl(null)}
                    sx={{
                      fontSize: "12px",
                      borderRadius: "8px",
                      gap: 1.5,
                      color: "text.secondary",
                      "&:hover": { color: "text.primary", backgroundColor: "background.card" },
                    }}
                  >
                    <SettingsIcon size={14} />
                    <span>Settings</span>
                  </MenuItem>

                  {userProfile.role === "admin" && (
                    <MenuItem
                      component={Link}
                      to="/admin"
                      onClick={() => setProfileAnchorEl(null)}
                      sx={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        gap: 1.5,
                        color: "text.secondary",
                        "&:hover": { color: "text.primary", backgroundColor: "background.card" },
                      }}
                    >
                      <Shield size={14} style={{ color: "currentColor" }} />
                      <span>Admin Console</span>
                    </MenuItem>
                  )}

                  <Divider sx={{ my: 1, borderColor: "rgba(44, 44, 44, 0.4)" }} />

                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      fontSize: "12px",
                      borderRadius: "8px",
                      gap: 1.5,
                      color: themeMode === "dark" ? "#F4F4F5" : "text.primary",
                      "&:hover": { 
                        backgroundColor: "rgba(239, 68, 68, 0.1)", 
                        color: "#EF4444" 
                      },
                    }}
                  >
                    <LogOut size={14} />
                    <span>Log Out</span>
                  </MenuItem>
                </MenuMui>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", itemsCenter: "center", gap: 1.5 }}>
              <Button
                component={Link}
                to="/auth?mode=login"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "text.secondary",
                  borderRadius: "8px",
                  px: 2,
                  py: 0.75,
                  "&:hover": {
                    color: "text.primary",
                    backgroundColor: "background.card",
                  },
                }}
              >
                Log In
              </Button>
              <Button
                component={Link}
                to="/auth?mode=register"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "text.primary",
                  backgroundColor: "rgba(212, 175, 55, 0.2)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "8px",
                  px: 2,
                  py: 0.75,
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.3)",
                    borderColor: "primary.main",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
