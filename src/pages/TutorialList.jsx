import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, GraduationCap, ArrowRight, RefreshCw } from "lucide-react";
import { tutorialService } from "../services/tutorial.service";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
};

export const TutorialList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);
        const data = await tutorialService.getAllTutorials();
        setTutorials(data || []);
      } catch (err) {
        console.error("Error fetching tutorials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, []);

  const resetFilters = () => {
    setSearch("");
    setSelectedLanguage("All");
    setSelectedDifficulty("All");
  };

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        t.summary.toLowerCase().includes(search.toLowerCase());
      
      const matchLanguage =
        selectedLanguage === "All" ||
        t.language.toLowerCase() === selectedLanguage.toLowerCase();
      
      const matchDifficulty =
        selectedDifficulty === "All" ||
        t.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchSearch && matchLanguage && matchDifficulty;
    });
  }, [tutorials, search, selectedLanguage, selectedDifficulty]);

  // Group tutorials by language
  const groupedTutorials = useMemo(() => {
    const groups = {};
    filteredTutorials.forEach((t) => {
      if (!groups[t.language]) {
        groups[t.language] = [];
      }
      groups[t.language].push(t);
    });
    return groups;
  }, [filteredTutorials]);

  const difficultyBorderColor = {
    easy: "rgba(255, 255, 255, 0.15)",
    medium: "rgba(255, 255, 255, 0.3)",
    hard: "rgba(255, 255, 255, 0.6)"
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ maxWidth: "100%", px: { xs: 2, md: 4 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 4, textAlign: "left" }}
    >
      <Box component={motion.div} variants={itemVariants}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Language Tutorials</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Gain hands-on knowledge on core language constructs, architecture, and syntax patterns.
        </Typography>
      </Box>

      {/* Filters Toolbar */}
      <Box component={motion.div} variants={itemVariants}>
        <Card style={{ padding: "24px", border: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#121214" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2.5, alignItems: "flex-end" }}>
            <Box sx={{ flex: 1, width: "100%" }}>
              <Input
                id="tutorial-search"
                placeholder="Search by title, concept, or category..."
                icon={Search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": {
                    height: 40,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px"
                  }
                }}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "auto" } }}>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                style={{
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  backgroundColor: "transparent",
                  color: "#A1A1AA"
                }}
              >
                <RefreshCw size={12} /> Clear
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 2.5, borderColor: "rgba(255, 255, 255, 0.08)" }} />

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", pr: 0.5, fontSize: "10.5px", letterSpacing: "0.05em" }}>Language</Typography>
              {["All", "JavaScript", "Python", "Go", "C++"].map((lang) => (
                <ButtonBase key={lang} onClick={() => setSelectedLanguage(lang)}
                  sx={{
                    px: 1.75, py: 0.6, fontSize: "11px", borderRadius: "50px", fontWeight: "bold", border: "1px solid",
                    borderColor: selectedLanguage.toLowerCase() === lang.toLowerCase() ? "text.primary" : "transparent",
                    color: selectedLanguage.toLowerCase() === lang.toLowerCase() ? "text.primary" : "text.secondary",
                    backgroundColor: selectedLanguage.toLowerCase() === lang.toLowerCase() ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                    transition: "all 0.15s",
                    "&:hover": { color: "text.primary" },
                  }}>
                  {lang}
                </ButtonBase>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", pr: 0.5, fontSize: "10.5px", letterSpacing: "0.05em" }}>Difficulty</Typography>
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
                <ButtonBase key={diff} onClick={() => setSelectedDifficulty(diff)}
                  sx={{
                    px: 1.75, py: 0.6, fontSize: "11px", borderRadius: "50px", fontWeight: "bold", border: "1px solid",
                    borderColor: selectedDifficulty.toLowerCase() === diff.toLowerCase() ? "text.primary" : "transparent",
                    color: selectedDifficulty.toLowerCase() === diff.toLowerCase() ? "text.primary" : "text.secondary",
                    backgroundColor: selectedDifficulty.toLowerCase() === diff.toLowerCase() ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                    transition: "all 0.15s",
                    "&:hover": { color: "text.primary" },
                  }}>
                  {diff}
                </ButtonBase>
              ))}
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Loading state */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : filteredTutorials.length === 0 ? (
        <Box sx={{ p: 6, border: "1px dashed rgba(255, 255, 255, 0.1)", borderRadius: "12px", textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            No programming tutorials found matching your filters.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {Object.keys(groupedTutorials).map((lang) => (
            <Box key={lang} component={motion.div} variants={itemVariants} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "monospace", fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.08)", pb: 1, color: "text.primary" }}>
                {lang} Guides
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2.5 }}>
                {groupedTutorials[lang].map((tutorial) => (
                  <Card 
                    key={tutorial._id}
                    style={{ 
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                      transition: "transform 0.25s, border-color 0.25s",
                      cursor: "pointer"
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                        <Box sx={{ px: 1, py: 0.25, borderRadius: "4px", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "text.secondary", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace", textTransform: "uppercase" }}>
                          {tutorial.category}
                        </Box>
                        <Box sx={{ px: 1, py: 0.25, borderRadius: "4px", border: "1px solid", borderColor: difficultyBorderColor[tutorial.difficulty.toLowerCase()] || "divider", color: "text.secondary", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}>
                          {tutorial.difficulty}
                        </Box>
                      </Box>

                      <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.primary", mb: 1, lineHeight: 1.4 }}>
                        {tutorial.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "13px", mb: 2, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {tutorial.summary}
                      </Typography>
                    </Box>

                    <Button
                      component={Link}
                      to={`/tutorials/${tutorial._id}`}
                      variant="outline"
                      size="sm"
                      style={{ width: "100%", height: 36, display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", borderColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      Start Learning <ArrowRight size={13} />
                    </Button>
                  </Card>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TutorialList;
