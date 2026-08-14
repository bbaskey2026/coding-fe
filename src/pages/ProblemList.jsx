import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, RefreshCw, Check, Clock } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";

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

export const ProblemList = () => {
  const { problems, userProfile } = useApp();

  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    problems.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet).sort()];
  }, [problems]);

  const allCompanies = useMemo(() => {
    const compsSet = new Set();
    problems.forEach(p => p.companies.forEach(c => compsSet.add(c)));
    return ["All", ...Array.from(compsSet).sort().slice(0, 15)];
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search;
      const matchDifficulty = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const isSolved = userProfile.solvedProblemsList.includes(p.id);
      const isAttempted = userProfile.attemptedProblemsList.includes(p.id);
      let matchStatus = true;
      if (selectedStatus === "Solved") matchStatus = isSolved;
      else if (selectedStatus === "Attempted") matchStatus = isAttempted && !isSolved;
      else if (selectedStatus === "Unsolved") matchStatus = !isSolved && !isAttempted;
      const matchTag = selectedTag === "All" || p.tags.includes(selectedTag);
      const matchCompany = selectedCompany === "All" || p.companies.includes(selectedCompany);
      return matchSearch && matchDifficulty && matchStatus && matchTag && matchCompany;
    });
  }, [problems, search, selectedDifficulty, selectedStatus, selectedTag, selectedCompany, userProfile]);

  const resetFilters = () => {
    setSearch(""); setSelectedDifficulty("All"); setSelectedStatus("All");
    setSelectedTag("All"); setSelectedCompany("All"); setCurrentPage(1);
  };

  const totalItems = filteredProblems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProblems = useMemo(() => filteredProblems.slice(startIndex, startIndex + itemsPerPage), [filteredProblems, startIndex]);

  const getStatusIcon = (pId) => {
    if (userProfile.solvedProblemsList.includes(pId)) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #2E9B77", color: "#2E9B77", backgroundColor: "rgba(46, 155, 119, 0.08)", flexShrink: 0 }}>
          <Check size={13} strokeWidth={3} />
        </Box>
      );
    }
    if (userProfile.attemptedProblemsList.includes(pId)) {
      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", border: "1.5px solid #D98A2B", color: "#D98A2B", backgroundColor: "rgba(217, 138, 43, 0.08)", flexShrink: 0 }}>
          <Clock size={13} strokeWidth={2.5} />
        </Box>
      );
    }
    return (
      <Box sx={{ width: 24, height: 24, borderRadius: "50%", border: "1.5px dashed rgba(255, 255, 255, 0.2)", flexShrink: 0 }} />
    );
  };

  const getProblemStatusText = (pId) => {
    if (userProfile.solvedProblemsList.includes(pId)) return "solved";
    if (userProfile.attemptedProblemsList.includes(pId)) return "attempted";
    return "unsolved";
  };

  const difficultyColor = { 
    Easy: "#2E9B77", 
    Medium: "#D98A2B", 
    Hard: "#B23A32" 
  };

  const selectSx = {
    fontSize: "12px",
    color: "text.primary",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    height: 40,
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiSelect-icon": { color: "text.secondary" },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ maxWidth: "100%", px: { xs: 2, md: 4 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}
    >
      <Box component={motion.div} variants={itemVariants}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Problem Catalog</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Select challenges matching difficulty tiers and target companies.
        </Typography>
      </Box>

      {/* Filters Card */}
      <Box component={motion.div} variants={itemVariants} style={{ width: "100%" }}>
        <Card style={{ padding: "24px", border: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#121214" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, alignItems: "flex-end" }}>
            {/* Search bar */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <Input
                id="list-search"
                placeholder="Search problem title or ID..."
                icon={Search}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
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

            {/* Tag selector */}
            <Box sx={{ minWidth: { xs: "100%", md: 180 } }}>
              <FormControl size="small" fullWidth>
                <InputLabel sx={{ fontSize: "9px", fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", mt: -0.25, letterSpacing: "0.08em" }}>Topic Tag</InputLabel>
                <Select value={selectedTag} onChange={(e) => { setSelectedTag(e.target.value); setCurrentPage(1); }} sx={selectSx} label="Topic Tag">
                  {allTags.map(t => <MenuItem key={t} value={t} sx={{ fontSize: "12px" }}>{t}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            {/* Company selector */}
            <Box sx={{ minWidth: { xs: "100%", md: 180 } }}>
              <FormControl size="small" fullWidth>
                <InputLabel sx={{ fontSize: "9px", fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", mt: -0.25, letterSpacing: "0.08em" }}>Company</InputLabel>
                <Select value={selectedCompany} onChange={(e) => { setSelectedCompany(e.target.value); setCurrentPage(1); }} sx={selectSx} label="Company">
                  {allCompanies.map(c => <MenuItem key={c} value={c} sx={{ fontSize: "12px" }}>{c}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            {/* Reset Filters */}
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

          {/* Chips Filters */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", pr: 0.5, fontSize: "10.5px", letterSpacing: "0.05em" }}>Difficulty</Typography>
              {["All", "Easy", "Medium", "Hard"].map(diff => (
                <ButtonBase key={diff} onClick={() => { setSelectedDifficulty(diff); setCurrentPage(1); }}
                  sx={{
                    px: 1.75, py: 0.6, fontSize: "11px", borderRadius: "50px", fontWeight: "bold", border: "1px solid",
                    borderColor: selectedDifficulty === diff ? "#D4AF37" : "transparent",
                    color: selectedDifficulty === diff ? "#D4AF37" : "text.secondary",
                    backgroundColor: selectedDifficulty === diff ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.05)",
                    transition: "all 0.15s",
                    "&:hover": { color: "text.primary" },
                  }}>
                  {diff}
                </ButtonBase>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", pr: 0.5, fontSize: "10.5px", letterSpacing: "0.05em" }}>Status</Typography>
              {["All", "Solved", "Attempted", "Unsolved"].map(st => (
                <ButtonBase key={st} onClick={() => { setSelectedStatus(st); setCurrentPage(1); }}
                  sx={{
                    px: 1.75, py: 0.6, fontSize: "11px", borderRadius: "50px", fontWeight: "bold", border: "1px solid",
                    borderColor: selectedStatus === st ? "#D4AF37" : "transparent",
                    color: selectedStatus === st ? "#D4AF37" : "text.secondary",
                    backgroundColor: selectedStatus === st ? "rgba(212, 175, 55, 0.12)" : "rgba(255, 255, 255, 0.05)",
                    transition: "all 0.15s",
                    "&:hover": { color: "text.primary" },
                  }}>
                  {st}
                </ButtonBase>
              ))}
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Showing count */}
      <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary", fontSize: "12px" }}>
        Showing <strong style={{ color: "#D4AF37" }}>{totalItems}</strong> problems
      </Typography>

      {/* Problems Table */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{ 
          borderRadius: "12px", 
          border: "1px solid rgba(255,255,255,0.08)", 
          overflow: "hidden", 
          backgroundColor: "#121214",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)" 
        }}
      >
        <Box sx={{ overflowX: "auto" }}>
          <Box component="table" sx={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "800px" }}>
            <Box component="thead">
              <Box component="tr" sx={{ borderBottom: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                {["Status", "ID", "Title", "Topic Tags", "Acceptance", "Difficulty", "Companies"].map((h, i) => (
                  <Box 
                    key={h} 
                    component="th" 
                    sx={{ 
                      py: 2, 
                      px: 2.5, 
                      fontSize: "11px", 
                      fontWeight: "bold", 
                      letterSpacing: "0.1em", 
                      color: "#71717A", 
                      textTransform: "uppercase",
                      fontFamily: "monospace"
                    }}
                  >
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {paginatedProblems.length === 0 ? (
                <Box component="tr">
                  <Box component="td" colSpan={7} sx={{ py: 6, textAlign: "center", color: "text.secondary", fontSize: "13px" }}>
                    No coding challenges match your search filters.
                  </Box>
                </Box>
              ) : (
                paginatedProblems.map((p) => (
                  <Box
                    component="tr"
                    key={p.id}
                    sx={{ 
                      borderBottom: "1px solid rgba(255,255,255,0.05)", 
                      transition: "background-color 0.2s", 
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.015)" }
                    }}
                  >
                    {/* Status Circle */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5 }}>
                      {getStatusIcon(p.id)}
                    </Box>

                    {/* ID */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5, color: "#52525B", fontFamily: "monospace", fontSize: "13px", fontWeight: "bold" }}>
                      {String(p.id).padStart(3, "0")}
                    </Box>

                    {/* Title & status subtitle */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5 }}>
                      <Link to={`/problems/${p.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontSize: "14px", "&:hover": { color: "#D4AF37" }, transition: "color 0.2s" }}>
                          {p.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#52525B", fontSize: "10px", display: "block", mt: 0.25, fontWeight: "light" }}>
                          {getProblemStatusText(p.id)}
                        </Typography>
                      </Link>
                    </Box>

                    {/* Tags */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5 }}>
                      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                        {p.tags.slice(0, 2).map(t => (
                          <Box 
                            key={t} 
                            sx={{ 
                              px: 1.25, 
                              py: 0.5, 
                              fontSize: "10px", 
                              fontWeight: "bold", 
                              color: "#71717A", 
                              backgroundColor: "rgba(255, 255, 255, 0.04)", 
                              borderRadius: "15px", 
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              fontFamily: "monospace"
                            }}
                          >
                            {t}
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Acceptance */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5 }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width: 70 }}>
                        <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: "bold", fontSize: "11px", color: "text.primary" }}>
                          {p.acceptance}%
                        </Typography>
                        <Box sx={{ width: "100%", height: 4, borderRadius: 1, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                          <Box sx={{ width: `${p.acceptance}%`, height: "100%", backgroundColor: "#2E9B77" }} />
                        </Box>
                      </Box>
                    </Box>

                    {/* Difficulty */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5, fontWeight: "bold", color: difficultyColor[p.difficulty], fontSize: "12px", fontFamily: "monospace" }}>
                      {p.difficulty}
                    </Box>

                    {/* Companies */}
                    <Box component="td" sx={{ py: 2.5, px: 2.5, color: "#71717A", fontSize: "12px", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.companies.slice(0, 3).join(", ")}{p.companies.length > 3 && `...`}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Table Footer / Pagination */}
        <Box sx={{ backgroundColor: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.08)", px: 3, py: 2, display: "flex", alignItems: "center", justifyBetween: "space-between", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Showing <strong style={{ color: "#FFFFFF" }}>{Math.min(totalItems, startIndex + 1)}</strong> to{" "}
            <strong style={{ color: "#FFFFFF" }}>{Math.min(totalItems, startIndex + itemsPerPage)}</strong> of{" "}
            <strong style={{ color: "#FFFFFF" }}>{totalItems}</strong> challenges
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              Previous
            </Button>
            <Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>
              Page <strong style={{ color: "#FFFFFF" }}>{currentPage}</strong> of {totalPages}
            </Typography>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemList;
