import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, Target, CheckCircle2, ChevronRight, Play, BookCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const StudyPlans = () => {
  const { studyPlans, problems, userProfile } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState("interview_150");

  const activePlan = studyPlans.find(plan => plan.id === selectedPlanId) || studyPlans[0];

  const getPlanProgress = (plan) => {
    let solvedCount = 0, totalCount = 0;
    plan.modules.forEach(mod => {
      mod.problems.forEach(probId => {
        totalCount++;
        if (userProfile.solvedProblemsList.includes(probId)) solvedCount++;
      });
    });
    return { solvedCount, totalCount };
  };

  const difficultyColor = { Easy: "#22C55E", Medium: "#F59E0B", Hard: "#EF4444" };

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Curated Study Plans</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Accelerate your training with structured node roadmap tracks.
        </Typography>
      </Box>

      {/* Plans Picker grid */}
      <Grid container spacing={2}>
        {studyPlans.map((plan) => {
          const { solvedCount, totalCount } = getPlanProgress(plan);
          const isSelected = plan.id === selectedPlanId;
          return (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card
                onClick={() => setSelectedPlanId(plan.id)}
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  height: "100%",
                  border: `1px solid ${isSelected ? "#D4AF37" : "rgba(44,44,44,0.8)"}`,
                  backgroundColor: isSelected ? "rgba(17,17,17,0.9)" : "rgba(26,26,26,0.4)",
                  boxShadow: isSelected ? "0 0 20px rgba(212,175,55,0.15)" : "none",
                  transition: "all 0.2s",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>
                    Roadmap Track
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary" }}>{plan.title}</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {plan.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "text.secondary", fontWeight: "bold", mb: 0.5 }}>
                      <span>Progress</span>
                      <span>{solvedCount} / {totalCount} Solved</span>
                    </Box>
                    <ProgressBar value={solvedCount} max={totalCount} size="sm" />
                  </Box>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Roadmap Modules Timeline details */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Modules Progression Tree */}
        <Grid item xs={12} lg={8}>
          <Card style={{ padding: "24px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1.5, borderBottom: "1px solid rgba(44,44,44,0.4)", mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary" }}>
                {activePlan?.title} Roadmap Modules
              </Typography>
              <Link to="/certificates" style={{ textDecoration: "none" }}>
                <Button size="sm" variant="outline" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "bold" }}>
                  <Award size={14} style={{ color: "#FFD700" }} /> View Certificate
                </Button>
              </Link>
            </Box>

            {/* Timeline list */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", pl: 2, borderLeft: "2px solid rgba(44,44,44,0.6)" }}>
              {activePlan?.modules.map((mod, mIdx) => (
                <Box key={mIdx} sx={{ position: "relative", display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}>
                  {/* Timeline point indicator */}
                  <Box sx={{
                    position: "absolute", left: -25, top: 6, width: 16, height: 16, borderRadius: "50%",
                    backgroundColor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center",
                    border: "4px solid", borderColor: "background.default",
                  }} />
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>
                      {mod.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "medium" }}>Module {mIdx + 1}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {mod.problems.map((probId) => {
                      const p = problems.find(prob => prob.id === probId);
                      if (!p) return null;
                      const isSolved = userProfile.solvedProblemsList.includes(probId);
                      return (
                        <Box key={probId} sx={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          p: 1.75, backgroundColor: "rgba(26,26,26,0.45)", border: "1px solid", borderColor: "divider",
                          borderRadius: "12px", transition: "all 0.2s", cursor: "pointer",
                          "&:hover": { borderColor: "rgba(212,175,55,0.5)", backgroundColor: "background.card" },
                        }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            {isSolved
                              ? <CheckCircle2 size={16} style={{ color: "#22C55E", flexShrink: 0 }} />
                              : <Play size={14} style={{ color: "rgba(161,161,170,0.5)", flexShrink: 0 }} />
                            }
                            <Box>
                              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>{p.title}</Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                                <Typography variant="caption" sx={{ color: difficultyColor[p.difficulty], fontWeight: "bold", fontSize: "10px" }}>{p.difficulty}</Typography>
                                <span style={{ color: "#A1A1AA", fontSize: "10px" }}>•</span>
                                <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px" }}>Acceptance: {p.acceptance}</Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Link to={`/problems/${p.id}`} style={{ textDecoration: "none" }}>
                            <Button size="sm" variant="ghost" style={{ padding: "4px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
                              Solve <ChevronRight size={14} />
                            </Button>
                          </Link>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Roadmap metrics & highlights */}
        <Grid item xs={12} lg={4}>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", mb: 2 }}>
              Milestones & Perks
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)", flexShrink: 0 }}>
                  <BookCheck size={16} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>Unlock Certificate</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", lineHeight: 1.5 }}>
                    Complete 100% of the modules in this path to unlock a verifiable preparation certificate.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: "rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)", flexShrink: 0 }}>
                  <Target size={16} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>Target Practice</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", lineHeight: 1.5 }}>
                    These problems are explicitly weighted by FAANG interview loop frequency data.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default StudyPlans;
