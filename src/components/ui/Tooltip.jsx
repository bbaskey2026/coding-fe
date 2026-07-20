import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Tooltip = ({
  children,
  content,
  position = "top", // top | bottom | left | right
  className = "",
  ...props
}) => {
  const [active, setActive] = useState(false);

  const posClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...props}
    >
      {children}
      <AnimatePresence>
        {active && content && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`absolute z-50 whitespace-nowrap bg-zinc-900 border border-border/80 text-text-primary px-2.5 py-1 text-[11px] rounded-lg shadow-xl font-medium pointer-events-none ${posClasses[position]}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Tooltip;
