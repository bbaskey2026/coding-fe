import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, CheckCircle2, Circle, AlertCircle, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
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
    if (userProfile.solvedProblemsList.includes(pId)) return <CheckCircle2 size={16} style={{ color: "#22C55E", flexShrink: 0 }} />;
    if (userProfile.attemptedProblemsList.includes(pId)) return <AlertCircle size={16} style={{ color: "#F59E0B", flexShrink: 0 }} />;
    return <Circle size={16} style={{ color: "rgba(161,161,170,0.35)", flexShrink: 0 }} />;
  };

  const difficultyColor = { Easy: "#22C55E", Medium: "#F59E0B", Hard: "#EF4444" };

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
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Problem Catalog</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Select challenges matching difficulty tiers and target companies.
        </Typography>
      </Box>

      {/* Filters Card */}
      <Card style={{ padding: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1.75, alignItems: { md: "flex-end" } }}>
          {/* Search bar */}
          <Box sx={{ flex: 1 }}>
            <Input
              id="list-search"
              placeholder="Search problem title or ID..."
              icon={Search}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </Box>

          {/* Tag selector */}
          <Box sx={{ minWidth: { xs: "100%", md: 192 } }}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ fontSize: "10px", fontWeight: "bold", color: "text.secondary", textTransform: "uppercase" }}>Topic Tag</InputLabel>
              <Select value={selectedTag} onChange={(e) => { setSelectedTag(e.target.value); setCurrentPage(1); }} sx={selectSx} label="Topic Tag">
                {allTags.map(t => <MenuItem key={t} value={t} sx={{ fontSize: "12px" }}>{t}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          {/* Company selector */}
          <Box sx={{ minWidth: { xs: "100%", md: 192 } }}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ fontSize: "10px", fontWeight: "bold", color: "text.secondary", textTransform: "uppercase" }}>Company</InputLabel>
              <Select value={selectedCompany} onChange={(e) => { setSelectedCompany(e.target.value); setCurrentPage(1); }} sx={selectSx} label="Company">
                {allCompanies.map(c => <MenuItem key={c} value={c} sx={{ fontSize: "12px" }}>{c}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>

          {/* Reset Filters */}
          <Box>
            <Button variant="outline" size="sm" onClick={resetFilters} style={{ height: 36, display: "flex", alignItems: "center", gap: "6px" }}>
              <RefreshCw size={14} /> Clear
            </Button>
          </Box>
        </Box>

        {/* Chips Filters */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between", pt: 1.5, mt: 1.5, borderTop: "1px solid rgba(44,44,44,0.4)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", pr: 0.5 }}>Difficulty:</Typography>
            {["All", "Easy", "Medium", "Hard"].map(diff => (
              <ButtonBase key={diff} onClick={() => { setSelectedDifficulty(diff); setCurrentPage(1); }}
                sx={{
                  px: 1.5, py: 0.5, fontSize: "12px", borderRadius: "50px", fontWeight: "bold", border: "1px solid",
                  borderColor: selectedDifficulty === diff ? "primary.main" : "divider",
                  color: selectedDifficulty === diff ? "primary.main" : "text.secondary",
                  backgroundColor: selectedDifficulty === diff ? "rgba(212,175,55,0.1)" : "background.card",
                  transition: "all 0.2s",
                  "&:hover": { color: "text.primary" },
                }}>
                {diff}
              </ButtonBase>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", pr: 0.5 }}>Status:</Typography>
            {["All", "Solved", "Attempted", "Unsolved"].map(st => (
              <ButtonBase key={st} onClick={() => { setSelectedStatus(st); setCurrentPage(1); }}
                sx={{
                  px: 1.5, py: 0.5, fontSize: "12px", borderRadius: "50px", fontWeight: "bold", border: "1px solid",
                  borderColor: selectedStatus === st ? "primary.main" : "divider",
                  color: selectedStatus === st ? "primary.main" : "text.secondary",
                  backgroundColor: selectedStatus === st ? "rgba(212,175,55,0.1)" : "background.card",
                  transition: "all 0.2s",
                  "&:hover": { color: "text.primary" },
                }}>
                {st}
              </ButtonBase>
            ))}
          </Box>
        </Box>
      </Card>

      {/* Problems Table */}
      <Box className="glass" sx={{ borderRadius: "12px", border: "1px solid", borderColor: "divider", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
        <Box sx={{ overflowX: "auto" }}>
          <Box component="table" sx={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "700px" }}>
            <Box component="thead">
              <Box component="tr" sx={{ borderBottom: "1px solid rgba(44,44,44,0.6)", backgroundColor: "rgba(26,26,26,0.45)" }}>
                {["Status", "ID", "Title", "Topic Tags", "Acceptance", "Difficulty", "Target Companies"].map((h, i) => (
                  <Box key={h} component="th" sx={{ py: 1.5, px: i === 0 ? 2.5 : 2, fontSize: "10px", fontWeight: "bold", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase", textAlign: i === 4 ? "center" : "left" }}>
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {paginatedProblems.length === 0 ? (
                <Box component="tr">
                  <Box component="td" colSpan={7} sx={{ py: 6, textAlign: "center", color: "text.secondary", fontSize: "12px" }}>
                    No coding challenges match your search filters.
                  </Box>
                </Box>
              ) : (
                paginatedProblems.map((p) => (
                  <Box component="tr" key={p.id} sx={{ borderBottom: "1px solid rgba(44,44,44,0.3)", transition: "background-color 0.2s", "&:hover": { backgroundColor: "rgba(26,26,26,0.25)" }, cursor: "pointer" }}>
                    <Box component="td" sx={{ py: 1.5, px: 2.5 }}>{getStatusIcon(p.id)}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "center", color: "text.secondary", fontFamily: "monospace", fontSize: "12px" }}>{p.id}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, fontWeight: "bold", color: "text.primary", fontSize: "12px", "&:hover": { color: "primary.main" } }}>
                      <Link to={`/problems/${p.id}`} style={{ color: "inherit", textDecoration: "none" }}>{p.title}</Link>
                    </Box>
                    <Box component="td" sx={{ py: 1.5, px: 2 }}>
                      <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                        {p.tags.slice(0, 2).map(t => <Badge key={t} size="sm">{t}</Badge>)}
                        {p.tags.length > 2 && <Badge size="sm">+{p.tags.length - 2}</Badge>}
                      </Box>
                    </Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "center", color: "text.secondary", fontFamily: "monospace", fontSize: "12px" }}>{p.acceptance}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, fontWeight: "bold", color: difficultyColor[p.difficulty], fontSize: "12px" }}>{p.difficulty}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, color: "text.secondary", fontSize: "12px", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.companies.slice(0, 3).join(", ")}{p.companies.length > 3 && ` +${p.companies.length - 3}`}
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>

        {/* Table Footer / Pagination */}
        <Box sx={{ backgroundColor: "rgba(26,26,26,0.35)", borderTop: "1px solid rgba(44,44,44,0.4)", px: 3, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Showing <strong style={{ color: "#FFFFFF" }}>{Math.min(totalItems, startIndex + 1)}</strong> to{" "}
            <strong style={{ color: "#FFFFFF" }}>{Math.min(totalItems, startIndex + itemsPerPage)}</strong> of{" "}
            <strong style={{ color: "#FFFFFF" }}>{totalItems}</strong> challenges
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            <Typography variant="caption" sx={{ color: "text.secondary", px: 1 }}>
              Page <strong style={{ color: "#FFFFFF" }}>{currentPage}</strong> of {totalPages}
            </Typography>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ProblemList;
