import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, Award, Building, BookOpen, Ban } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";

// High-end CSS Gradient logo maps for companies
const LOGO_GRADIENTS = {
  "TCS (Tata Consultancy Services)": "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  "Infosys": "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
  "Wipro": "linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)",
  "Cognizant (CTS)": "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
  "Accenture": "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export const CompanyGuides = () => {
  const { companyGuides } = useApp();
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const filteredGuides = companyGuides.filter((guide) => {
    const matchesSearch = guide.companyName.toLowerCase().includes(search.toLowerCase()) || 
      guide.questionTypes.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === "All" || 
      guide.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase());

    return matchesSearch && matchesDifficulty;
  });

  const getInitials = (name) => {
    return name
      .replace(/\(.*?\)/g, "") // remove brackets e.g. (CTS)
      .trim()
      .split(" ")
      .map(w => w[0])
      .join("")
      .substring(0, 3)
      .toUpperCase();
  };

  const selectSx = {
    fontSize: "12px",
    color: "text.primary",
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiSelect-icon": { color: "text.secondary" },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        px: { xs: 2, md: 3 },
        pt: 12,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        textAlign: "left",
        position: "relative"
      }}
    >
      {/* Decorative background crosshatch */}
      <Box className="pattern-crosshatch" sx={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }} />

      <Box component={motion.div} variants={itemVariants} sx={{ zIndex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Company Guides</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Master recruitment exam patterns, test configurations, and interview DSA questions for major service-based companies.
        </Typography>
      </Box>

      {/* Filters Card */}
      <Box component={motion.div} variants={itemVariants} sx={{ zIndex: 1 }}>
        <Card style={{ padding: "20px", zIndex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1.75, alignItems: { md: "flex-end" } }}>
          {/* Search bar */}
          <Box sx={{ flex: 1 }}>
            <Input
              label="Search Company"
              id="search"
              placeholder="Search by company or tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={Search}
            />
          </Box>

          {/* Difficulty Filter */}
          <Box sx={{ minWidth: { xs: "100%", md: "180px" } }}>
            <Box component="label" sx={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "text.secondary", mb: 0.75 }}>
              Difficulty Tier
            </Box>
            <FormControl fullWidth size="small">
              <Select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                sx={selectSx}
                displayEmpty
              >
                <MenuItem value="All">All Tiers</MenuItem>
                <MenuItem value="Easy">Easy</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Card>
      </Box>

      {/* Guides Grid */}
      <Box sx={{ zIndex: 1 }}>
        {filteredGuides.length === 0 ? (
          <Card style={{ padding: "40px", textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              No preparation guides found matching the selected filters.
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {filteredGuides.map((guide) => {
              const logoBg = LOGO_GRADIENTS[guide.companyName] || "linear-gradient(135deg, #111 0%, #222 100%)";
              return (
                <Grid item xs={12} sm={6} md={4} key={guide.id} component={motion.div} variants={itemVariants}>
                  <Card hoverGlow={true} glowColor="primary" style={{ height: "100%", display: "flex", flexDirection: "column", p: "24px" }}>
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "12px",
                          background: logoBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 16,
                          color: "#FFF",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                        }}
                      >
                        {getInitials(guide.companyName)}
                      </Box>
                      <Badge variant={guide.difficulty.includes("Medium") ? "warning" : "success"}>
                        {guide.difficulty}
                      </Badge>
                    </Box>

                    {/* Company Details */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary", lineHeight: 1.3 }}>
                        {guide.companyName}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: "primary.main", mt: 0.25, fontWeight: "medium" }}>
                        {guide.examPattern?.examName || "Recruitment Assessment"}
                      </Typography>
                    </Box>

                    {/* Stats List */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Clock size={14} style={{ color: "rgba(212, 175, 55, 0.7)" }} />
                        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                          Duration: <strong style={{ color: "#FFF" }}>{guide.examPattern?.durationMinutes || "N/A"} Mins</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Ban size={14} style={{ color: "rgba(212, 175, 55, 0.7)" }} />
                        <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
                          Negative Mark: <strong style={{ color: "#FFF" }}>{guide.examPattern?.negativeMarking ? "Yes" : "No"}</strong>
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Award size={14} style={{ color: "rgba(212, 175, 55, 0.7)" }} />
                        <Typography sx={{ fontSize: "12px", color: "text.secondary", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={guide.examPattern?.passingCriteria}>
                          Cutoff: <strong style={{ color: "#FFF" }}>{guide.examPattern?.passingCriteria || "Default"}</strong>
                        </Typography>
                      </Box>
                    </Box>

                    {/* Syllabus Tags */}
                    <Box sx={{ mt: "auto", mb: 3 }}>
                      <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: "bold", mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
                        <BookOpen size={11} /> Syllabus Topics:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {guide.questionTypes.slice(0, 3).map((tag) => (
                          <Badge key={tag} size="sm" variant="outline">
                            {tag}
                          </Badge>
                        ))}
                        {guide.questionTypes.length > 3 && (
                          <Badge size="sm" variant="default">
                            +{guide.questionTypes.length - 3}
                          </Badge>
                        )}
                      </Box>
                    </Box>

                    {/* Action Button */}
                    <Button
                      component={Link}
                      to={`/company-guides/${guide.id}`}
                      variant="outline"
                      fullWidth
                    >
                      View Prep Guide
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
export default CompanyGuides;
