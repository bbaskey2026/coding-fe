import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { useApp } from "../../context/AppContext";

// MUI Imports
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const NotificationCenter = () => {
  const { notifications, showLevelUp, setShowLevelUp, triggerConfettiEffect } = useApp();
  const [activeToasts, setActiveToasts] = useState([]);

  // Sync with AppContext notifications to show new items as toasts
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[0];
      // Check if toast already exists to avoid duplication
      if (!activeToasts.some((t) => t.id === latest.id)) {
        setActiveToasts((prev) => [latest, ...prev.slice(0, 3)]); // Limit to max 4 concurrent toasts
      }
    }
  }, [notifications, activeToasts]);

  // Remove toast after delay
  const removeToast = (id) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} style={{ color: "#D4AF37" }} />;
      case "warning":
        return <AlertTriangle size={16} style={{ color: "#FFD700" }} />;
      case "achievement":
        return <Trophy size={16} className="animate-bounce" style={{ color: "#F59E0B" }} />;
      default:
        return <Info size={16} style={{ color: "#D4AF37" }} />;
    }
  };

  return (
    <>
      {/* Toast Overlays Container */}
      <Box
        sx={{
          position: "fixed",
          top: "80px",
          right: "24px",
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
          gap: 1.75,
          maxWidth: "320px",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {activeToasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onAnimationComplete={() => {
                // Auto dismiss toast after 4.5s
                setTimeout(() => removeToast(toast.id), 4500);
              }}
              style={{ width: "100%" }}
            >
              <Box
                className="glass"
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  gap: 1.5,
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
                  pointerEvents: "auto",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <Box sx={{ mt: 0.25 }}>{getIcon(toast.type)}</Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: "bold", color: "text.primary" }}>
                    {toast.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      fontSize: "11px",
                      color: "text.secondary",
                      mt: 0.5,
                      lineHeight: 1.4,
                      fontWeight: "light",
                    }}
                  >
                    {toast.message}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => removeToast(toast.id)}
                  size="small"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                    alignSelf: "flex-start",
                    p: 0.25,
                  }}
                >
                  <X size={12} />
                </IconButton>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* Level Up Fullscreen Popup */}
      <Dialog
        open={Boolean(showLevelUp)}
        onClose={() => setShowLevelUp(null)}
        PaperProps={{
          className: "glass-card",
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            p: 4,
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0 0 50px rgba(212, 175, 55, 0.25)",
            maxWidth: 360,
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(45deg, #D4AF37, #FFD700)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 3,
            mb: 3,
          }}
        >
          <Trophy size={40} className="animate-pulse" style={{ color: "#000000" }} />
        </Box>

        <Typography
          variant="caption"
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.1em",
            color: "primary.main",
            textTransform: "uppercase",
          }}
        >
          Milestone Reached
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary", mt: 1 }}>
          Coding Level Up!
        </Typography>

        {showLevelUp && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Previous level
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", textDecoration: "line-through" }}>
              Lvl {showLevelUp.level - 1}
            </Typography>
            <Typography variant="h6" sx={{ color: "text.primary", fontWeight: "extrabold" }}>
              Lvl {showLevelUp.level}
            </Typography>
          </Box>
        )}

        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", mt: 1, lineHeight: 1.5 }}>
          You have advanced in the rankings! Keep coding to unlock more rewards, study badges, and premium roadmap paths.
        </Typography>

        <Button
          onClick={() => {
            triggerConfettiEffect();
            setShowLevelUp(null);
          }}
          sx={{
            mt: 3,
            width: "100%",
            py: 1.25,
            backgroundColor: "primary.main",
            color: "background.default",
            fontWeight: "bold",
            borderRadius: "8px",
            fontSize: "12px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Claim Rewards
        </Button>
      </Dialog>
    </>
  );
};

export default NotificationCenter;
