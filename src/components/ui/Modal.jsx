import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md", // sm | md | lg | xl
  drawer = false, // If true, behaves like a slide-out drawer from the right
  className = "",
  ...props
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl"
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Center modal motion
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } }
  };

  // Right drawer motion
  const drawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
    exit: { x: "100%", transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={drawer ? drawerVariants : modalVariants}
            className={`relative z-10 w-full bg-surface border border-border rounded-xl shadow-2xl flex flex-col focus:outline-none ${
              drawer
                ? "fixed right-0 top-0 bottom-0 h-full max-w-lg rounded-l-xl rounded-r-none border-y-0 border-r-0"
                : `${sizes[size]}`
            } ${className}`}
            {...props}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              {title && <h3 className="text-base font-bold text-text-primary">{title}</h3>}
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-card transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 text-sm text-text-secondary leading-relaxed">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
