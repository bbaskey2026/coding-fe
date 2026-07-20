import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const Dropdown = ({
  label,
  options = [], // [{ value, label, icon: Icon }]
  selected,
  onSelect,
  placeholder = "Select option",
  align = "left", // left | right
  className = "",
  triggerClassName = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <div ref={dropdownRef} className={`relative ${className}`} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-between gap-2 px-4 py-2 text-sm bg-surface border border-border rounded-lg text-text-primary hover:bg-card transition-colors cursor-pointer w-full focus:outline-none ${triggerClassName}`}
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon && <selectedOption.icon size={16} className="text-text-secondary" />}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} className={`text-text-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 mt-2 min-w-[200px] w-full bg-surface border border-border rounded-xl shadow-xl p-1.5 focus:outline-none ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            <div className="max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <div className="px-3 py-2 text-xs text-text-secondary text-center">No options available</div>
              ) : (
                options.map((opt) => {
                  const isSel = opt.value === selected;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onSelect(opt.value);
                        setIsOpen(false);
                      }}
                      className={`flex items-center gap-2.5 w-full text-left px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                        isSel
                          ? "bg-primary text-text-primary"
                          : "text-text-secondary hover:text-text-primary hover:bg-card"
                      }`}
                    >
                      {opt.icon && <opt.icon size={16} className={isSel ? "text-text-primary" : "text-text-secondary"} />}
                      <span className="flex-1">{opt.label}</span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
