import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Flame, Award, BookOpen, HelpCircle, Navigation } from "lucide-react";
import { useApp } from "../../context/AppContext";

// MUI Imports
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CommandPalette = () => {
  const {
    problems,
    contests,
    commandPaletteOpen,
    setCommandPaletteOpen,
    solveProblem,
  } = useApp();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
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
    <Dialog
      open={commandPaletteOpen}
      onClose={() => setCommandPaletteOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        },
      }}
    >
      {/* Search Input Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Search size={18} style={{ color: "#CFCFCF" }} />
        <InputBase
          inputRef={inputRef}
          placeholder="Search coding challenges or run quick actions..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleListKeyDown}
          sx={{
            flex: 1,
            fontSize: "14px",
            color: "text.primary",
          }}
        />
        <Button
          onClick={() => setCommandPaletteOpen(false)}
          sx={{
            fontSize: "10px",
            color: "text.secondary",
            backgroundColor: "background.card",
            border: "1px solid",
            borderColor: "divider",
            minWidth: 0,
            px: 1.5,
            py: 0.25,
            textTransform: "none",
            "&:hover": {
              color: "text.primary",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          ESC
        </Button>
      </Box>

      {/* Actions List */}
      <Box
        sx={{
          maxHeight: 320,
          overflowY: "auto",
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {allItems.length === 0 ? (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              py: 4,
              color: "text.secondary",
            }}
          >
            No results matching search filters
          </Typography>
        ) : (
          allItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = index === selectedIndex;
            return (
              <Button
                key={index}
                onClick={() => {
                  item.action();
                  setCommandPaletteOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 1.75,
                  px: 2,
                  py: 1.25,
                  borderRadius: "8px",
                  width: "100%",
                  textAlign: "left",
                  textTransform: "none",
                  backgroundColor: isSelected ? "primary.main" : "transparent",
                  color: isSelected ? "background.default" : "text.secondary",
                  "&:hover": {
                    backgroundColor: isSelected ? "primary.main" : "rgba(255, 255, 255, 0.05)",
                    color: isSelected ? "background.default" : "text.primary",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 0.75,
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: isSelected ? "primary.dark" : "background.card",
                    border: isSelected ? "none" : "1px solid",
                    borderColor: "divider",
                    color: isSelected ? "text.primary" : "text.secondary",
                  }}
                >
                  <Icon size={14} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "semibold",
                      color: isSelected ? "background.default" : "text.primary",
                      fontSize: "12px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.25,
                      color: isSelected ? "rgba(0, 0, 0, 0.7)" : "text.secondary",
                      fontSize: "10px",
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>
                {isSelected && (
                  <Box
                    sx={{
                      fontSize: "10px",
                      backgroundColor: "primary.dark",
                      px: 1,
                      py: 0.25,
                      borderRadius: "4px",
                      color: "text.primary",
                      fontWeight: "bold",
                    }}
                  >
                    ENTER
                  </Box>
                )}
              </Button>
            );
          })
        )}
      </Box>

      {/* Shortcut hints footer */}
      <Box
        sx={{
          backgroundColor: "background.card",
          borderTop: "1px solid",
          borderColor: "divider",
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "10px",
          color: "text.secondary",
        }}
      >
        <Box sx={{ display: "flex", gap: 2.5 }}>
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
        </Box>
        <div>Quick Search Palette</div>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
