import React from "react";
import { motion } from "framer-motion";

export const ProgressBar = ({
  value = 0,
  max = 100,
  className = "",
  color = "primary", // primary | accent | success | danger | warning
  showLabel = false,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    primary: "bg-primary shadow-[0_0_10px_rgba(99,102,241,0.4)]",
    accent: "bg-accent shadow-[0_0_10px_rgba(139,92,246,0.4)]",
    success: "bg-success shadow-[0_0_10px_rgba(34,197,94,0.4)]",
    danger: "bg-danger shadow-[0_0_10px_rgba(239,68,68,0.4)]",
    warning: "bg-warning shadow-[0_0_10px_rgba(245,158,11,0.4)]"
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-text-secondary">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-card border border-border/40 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${colors[color]}`}
        />
      </div>
    </div>
  );
};

export const ProgressRing = ({
  value = 0,
  max = 100,
  size = 60,
  strokeWidth = 5,
  color = "#6366F1",
  label = "",
  className = ""
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#27272A"
          strokeWidth={strokeWidth}
        />
        {/* Fill circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-sm font-bold text-text-primary">{label || `${Math.round(percentage)}%`}</span>
      </div>
    </div>
  );
};
