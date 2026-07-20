import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, Award, BookOpen, HelpCircle, Navigation } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const CommandPalette = () => {
  const {
    problems,
    contests,
    commandPaletteOpen,
    setCommandPaletteOpen,
    solveProblem,
    addNotification
  } = useApp();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [commandPaletteOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setCommandPaletteOpen(false);
      }
    };
    if (commandPaletteOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  // Compile options based on search query
  const staticActions = [
    { title: "Go to Dashboard", subtitle: "Navigate to homepage feed", action: () => navigate("/"), icon: Navigation },
    { title: "Browse Problems", subtitle: "Open professional problem catalog table", action: () => navigate("/problems"), icon: BookOpen },
    { title: "Practice Mock Interview", subtitle: "Start audio-prompted mock simulations", action: () => navigate("/mock-interview"), icon: HelpCircle },
    { title: "Solve Daily Challenge", subtitle: "Instantly solve today's featured puzzle", action: () => { solveProblem(1); setCommandPaletteOpen(false); }, icon: Flame }
  ];

  const matchedProblems = search
    ? problems
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 4)
        .map((p) => ({
          title: `Problem: ${p.title}`,
          subtitle: `Difficulty: ${p.difficulty} | Acceptance: ${p.acceptance}`,
          action: () => navigate(`/problems/${p.id}`),
          icon: Award
        }))
    : [];

  const matchedContests = search
    ? contests
        .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 2)
        .map((c) => ({
          title: `Contest: ${c.title}`,
          subtitle: `Participants: ${c.participants} | Status: ${c.status}`,
          action: () => navigate("/contests"),
          icon: Award
        }))
    : [];

  const allItems = [...staticActions, ...matchedProblems, ...matchedContests];

  // Key navigation in palette list
  const handleListKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action();
        setCommandPaletteOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/85 backdrop-blur-md cursor-pointer"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.2 }}
            ref={containerRef}
            className="relative z-10 w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
              <Search size={18} className="text-text-secondary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search coding challenges or run quick actions..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleListKeyDown}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary/40 outline-none"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="text-[10px] text-text-secondary bg-card border border-border px-2 py-0.5 rounded hover:text-text-primary"
              >
                ESC
              </button>
            </div>

            {/* Actions List */}
            <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-0.5 text-left">
              {allItems.length === 0 ? (
                <div className="text-xs text-text-secondary text-center py-8">No results matching search filters</div>
              ) : (
                allItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setCommandPaletteOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-lg w-full text-left transition-colors cursor-pointer ${
                        isSelected ? "bg-primary text-text-primary" : "text-text-secondary hover:bg-card/40 hover:text-text-primary"
                      }`}
                    >
                      <div className={`p-1.5 rounded-md ${isSelected ? "bg-primary-dark/60 text-text-primary" : "bg-card border border-border text-text-secondary"}`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs font-semibold ${isSelected ? "text-text-primary" : "text-text-primary"}`}>{item.title}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? "text-text-primary/70" : "text-text-secondary"}`}>{item.subtitle}</div>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] bg-primary-dark/80 px-1.5 py-0.5 rounded text-text-primary font-bold animate-pulse">
                          ENTER
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Shortcut hints footer */}
            <div className="bg-card border-t border-border/40 px-4 py-2 flex items-center justify-between text-[10px] text-text-secondary">
              <div className="flex gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <div>Quick Search Palette</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CommandPalette;
