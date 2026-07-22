import React, { useState, useMemo } from "react";
import { Search, Briefcase, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";

export const InterviewExperiences = () => {
  const { interviewExperiences, companies, toggleExperienceBookmark, bookmarkedExperienceIds } = useApp();

  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedExpId, setSelectedExpId] = useState(null);

  const activeExp = interviewExperiences.find(exp => exp.id === selectedExpId);

  const filteredExps = useMemo(() => {
    return interviewExperiences.filter((exp) => {
      const matchSearch = exp.title.toLowerCase().includes(search.toLowerCase()) || exp.role.toLowerCase().includes(search.toLowerCase()) || exp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCompany = selectedCompany === "All" || exp.company === selectedCompany;
      return matchSearch && matchCompany;
    });
  }, [interviewExperiences, search, selectedCompany]);

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Interview Experiences</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Read detailed technical assessment logs shared by actual candidates.
        </Typography>
      </Box>

      {/* Company grid shortcuts */}
      <Grid container spacing={1.5}>
        {companies.slice(0, 8).map((comp) => {
          const isSelected = selectedCompany === comp.name;
          return (
            <Grid item xs={6} sm={3} lg={1.5} key={comp.id}>
              <ButtonBase
                onClick={() => setSelectedCompany(isSelected ? "All" : comp.name)}
                sx={{
                  width: "100%", p: 1.5, border: "1px solid", borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                  borderColor: isSelected ? "primary.main" : "divider",
                  backgroundColor: isSelected ? "rgba(212,175,55,0.1)" : "background.card",
                  color: isSelected ? "primary.main" : "text.secondary",
                  "&:hover": { borderColor: isSelected ? "primary.main" : "rgba(161,161,170,0.5)", color: "text.primary" },
                }}>
                <Briefcase size={16} style={{ marginBottom: "6px" }} />
                <Typography variant="caption" sx={{ fontWeight: "bold", fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80px", display: "block" }}>{comp.name}</Typography>
              </ButtonBase>
            </Grid>
          );
        })}
      </Grid>

      {/* Main split: Filter bar & list results */}
      <Grid container spacing={3}>
        {/* Left column: Search / filters */}
        <Grid item xs={12} lg={3}>
          <Card style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <Input id="exp-search" placeholder="Search roles, tags..." icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
            {selectedCompany !== "All" && (
              <Button variant="outline" size="sm" onClick={() => setSelectedCompany("All")} style={{ width: "100%", fontSize: "10px", fontWeight: "bold" }}>
                Clear Company Filter
              </Button>
            )}
          </Card>
        </Grid>

        {/* Right column: Experiences list */}
        <Grid item xs={12} lg={9}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
            {filteredExps.length === 0 ? (
              <Box className="glass" sx={{ p: 6, textAlign: "center", fontSize: "12px", color: "text.secondary", borderRadius: "12px" }}>
                No interview experiences matching criteria. Try broadening search queries.
              </Box>
            ) : (
              filteredExps.map((exp) => {
                const isSaved = bookmarkedExperienceIds.includes(exp.id);
                return (
                  <Box key={exp.id} onClick={() => setSelectedExpId(exp.id)}
                    sx={{
                      p: 2.5, backgroundColor: "rgba(26,26,26,0.45)", border: "1px solid", borderColor: "divider", borderRadius: "12px",
                      display: "flex", gap: 2, textAlign: "left", cursor: "pointer", transition: "all 0.2s",
                      "&:hover": { borderColor: "rgba(161,161,170,0.4)", backgroundColor: "background.card" },
                    }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <Badge variant="primary" size="sm">{exp.company}</Badge>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "9px" }}>{exp.date}</Typography>
                        </Box>
                        <ButtonBase onClick={(e) => { e.stopPropagation(); toggleExperienceBookmark(exp.id); }}
                          sx={{ p: 0.5, borderRadius: "4px", color: isSaved ? "primary.main" : "text.secondary", "&:hover": { color: "text.primary" } }}>
                          {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                        </ButtonBase>
                      </Box>

                      <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {exp.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.75, display: "block", lineHeight: 1.5, fontWeight: "light", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {exp.summary}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 0.75, mt: 1.5, flexWrap: "wrap" }}>
                        <Badge variant={exp.difficulty === "Easy" ? "success" : exp.difficulty === "Medium" ? "warning" : "danger"} size="sm">{exp.difficulty}</Badge>
                        <Badge variant={exp.verdict === "Accepted" ? "success" : "danger"} size="sm">{exp.verdict}</Badge>
                        {exp.tags.map(t => <Badge key={t} size="sm">{t}</Badge>)}
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ChevronRight size={16} style={{ color: "rgba(161,161,170,0.4)" }} />
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Detailed Experience Modal */}
      <Modal isOpen={selectedExpId !== null} onClose={() => setSelectedExpId(null)} title="Interview Detailed Log">
        {activeExp && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, fontWeight: "light" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", gap: 1.25, alignItems: "center" }}>
                <Badge variant="primary" size="sm">{activeExp.company}</Badge>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary" }}>{activeExp.role}</Typography>
              </Box>
              <Badge variant={activeExp.verdict === "Accepted" ? "success" : "danger"} size="sm">{activeExp.verdict}</Badge>
            </Box>

            <Divider sx={{ borderColor: "rgba(44,44,44,0.3)" }} />

            <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
              {activeExp.content.replace(/###/g, "").replace(/\*\*/g, "")}
            </Typography>

            <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid rgba(44,44,44,0.3)" }}>
              <Button variant="outline" size="sm" onClick={() => setSelectedExpId(null)} style={{ width: "100%", fontWeight: "bold" }}>
                Close Log
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
};
export default InterviewExperiences;
