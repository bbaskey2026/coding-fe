import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, X, Info, CheckCircle, AlertTriangle, Play } from "lucide-react";
import { useApp } from "../../context/AppContext";

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
        return <CheckCircle size={16} className="text-success" />;
      case "warning":
        return <AlertTriangle size={16} className="text-warning" />;
      case "achievement":
        return <Trophy size={16} className="text-amber-500 animate-bounce" />;
      default:
        return <Info size={16} className="text-primary" />;
    }
  };

  return (
    <>
      {/* Toast Overlays Container */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
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
              className="glass p-4 rounded-xl border border-border/80 flex gap-3 shadow-xl pointer-events-auto w-full text-left"
            >
              <div className="mt-0.5">{getIcon(toast.type)}</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-text-primary">{toast.title}</div>
                <div className="text-[11px] text-text-secondary mt-0.5 leading-relaxed font-light">
                  {toast.message}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-text-secondary hover:text-text-primary p-0.5 rounded cursor-pointer self-start"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Level Up Fullscreen Popup */}
      <AnimatePresence>
        {showLevelUp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLevelUp(null)}
              className="absolute inset-0 bg-bg/90 backdrop-blur-md cursor-pointer"
            />

            {/* Level up Announcement card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 18, stiffness: 200 }}
              className="relative z-10 w-full max-w-sm glass-card border border-primary/30 p-8 rounded-2xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(99,102,241,0.25)]"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg mb-6">
                <Trophy size={40} className="text-text-primary animate-pulse" />
              </div>

              <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Milestone Reached</span>
              <h2 className="text-2xl font-bold text-text-primary mt-2">Coding Level Up!</h2>
              
              <div className="flex items-center gap-3 mt-4 mb-2">
                <span className="text-text-secondary text-sm">Previous level</span>
                <span className="text-xs text-text-secondary line-through">Lvl {showLevelUp.level - 1}</span>
                <span className="text-text-primary font-extrabold text-2xl">Lvl {showLevelUp.level}</span>
              </div>

              <p className="text-xs text-text-secondary font-light max-w-xs mt-2 leading-relaxed">
                You have advanced in the rankings! Keep coding to unlock more rewards, study badges, and premium roadmap paths.
              </p>

              <button
                onClick={() => {
                  triggerConfettiEffect();
                  setShowLevelUp(null);
                }}
                className="mt-6 w-full py-2.5 bg-primary text-text-primary hover:bg-primary-dark font-semibold rounded-lg text-xs transition-colors cursor-pointer shadow-lg"
              >
                Claim Rewards
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default NotificationCenter;
