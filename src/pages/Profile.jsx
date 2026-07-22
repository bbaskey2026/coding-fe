import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Bookmark, Shield, CheckCircle2, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Heatmap } from "../components/ui/Heatmap";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Profile = () => {
  const { userProfile, problems, bookmarkedProblemIds, bookmarkedExperienceIds, interviewExperiences } = useApp();

  const totalSolved = userProfile.solvedProblemsList.length;
  const solvedEasy = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Easy").length;
  const solvedMedium = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Medium").length;
  const solvedHard = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Hard").length;

  const bookmarkedProblems = problems.filter(p => bookmarkedProblemIds.includes(p.id));
  const bookmarkedExps = interviewExperiences.filter(exp => bookmarkedExperienceIds.includes(exp.id));

  const ProgressBar = ({ value, max, color }) => (
    <Box sx={{ width: "100%", height: 6, backgroundColor: "rgba(24,24,27,1)", border: "1px solid rgba(39,39,42,0.8)", borderRadius: "9999px", overflow: "hidden" }}>
      <Box sx={{ height: "100%", backgroundColor: color, borderRadius: "9999px", width: `${Math.min(100, (value / max) * 100)}%` }} />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      {/* Profile Header card */}
      <Card style={{ padding: "24px" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: 3 }}>
          <Box component="img" src={userProfile.avatar} alt={userProfile.username} sx={{ width: 80, height: 80, borderRadius: "12px", backgroundColor: "background.card", border: "1px solid", borderColor: "divider" }} />

          <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "center" }, gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>{userProfile.username}</Typography>
              {userProfile.role === "admin" && (
                <Badge variant="primary" size="sm" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <Shield size={10} /> Administrator
                </Badge>
              )}
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light" }}>
              Senior Frontend Developer & Preparation Enthusiast
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" }, gap: 1.25, mt: 2 }}>
              {userProfile.badges.map((b) => (
                <Box key={b.id} title={b.desc} sx={{ px: 1.25, py: 0.5, backgroundColor: "background.card", border: "1px solid", borderColor: "divider", fontSize: "10px", fontWeight: "bold", borderRadius: "8px", color: "text.primary", display: "flex", alignItems: "center", gap: 0.75, cursor: "help" }}>
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, borderTop: { xs: "1px solid", sm: "none" }, borderLeft: { xs: "none", sm: "1px solid" }, borderColor: "rgba(44,44,44,0.3)", pt: { xs: 2, sm: 0 }, pl: { xs: 0, sm: 3 }, textAlign: "center" }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", fontFamily: "monospace" }}>{totalSolved}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", display: "block", fontSize: "10px" }}>Challenges Solved</Typography>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#FFD700", fontFamily: "monospace" }}>{userProfile.rating}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", display: "block", fontSize: "10px" }}>Contest Points</Typography>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Heatmap Section */}
      <Heatmap data={userProfile.heatmap} />

      {/* Grid: Solved metrics & Achievements List */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>Solve Metrics</Typography>
            </CardHeader>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              {[
                { label: "Easy Problems", color: "#22C55E", solved: solvedEasy, max: 20 },
                { label: "Medium Problems", color: "#F59E0B", solved: solvedMedium, max: 50 },
                { label: "Hard Problems", color: "#EF4444", solved: solvedHard, max: 15 },
              ].map(({ label, color, solved, max }) => (
                <Box key={label}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "12px", mb: 0.5 }}>
                    <span style={{ color, fontWeight: "bold" }}>{label}</span>
                    <span style={{ fontFamily: "monospace", color: "#FFFFFF" }}>{solved} solved</span>
                  </Box>
                  <ProgressBar value={solved} max={max} color={color} />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>Unlocked Achievements</Typography>
            </CardHeader>
            <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
              {userProfile.achievements.map((ach) => (
                <Grid item xs={12} sm={6} key={ach.id}>
                  <Box sx={{
                    p: 1.5, border: "1px solid", borderRadius: "12px", display: "flex", alignItems: "flex-start", gap: 1.5,
                    borderColor: ach.unlocked ? "rgba(212,175,55,0.2)" : "rgba(44,44,44,0.4)",
                    backgroundColor: ach.unlocked ? "background.card" : "rgba(26,26,26,0.2)",
                    color: ach.unlocked ? "text.primary" : "rgba(161,161,170,0.6)",
                  }}>
                    <Box sx={{ p: 0.75, borderRadius: "8px", border: "1px solid", borderColor: ach.unlocked ? "rgba(212,175,55,0.2)" : "rgba(39,39,42,0.8)", backgroundColor: ach.unlocked ? "rgba(212,175,55,0.1)" : "rgba(39,39,42,0.4)", color: ach.unlocked ? "#D4AF37" : "#52525B", flexShrink: 0 }}>
                      <Trophy size={14} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>{ach.name}</Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", lineHeight: 1.5, display: "block" }}>{ach.desc}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", mt: 0.5, fontSize: "9px", color: ach.unlocked ? "#22C55E" : "#A1A1AA" }}>
                        {ach.unlocked ? "✓ Active" : "Locked"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Bookmarks Row */}
      <Grid container spacing={3}>
        {[
          {
            title: "Bookmarked Challenges",
            items: bookmarkedProblems,
            emptyMsg: "No saved problems found. Click bookmark icons inside workspace pages!",
            renderItem: (p) => ({ primary: p.title, secondary: `Difficulty: ${p.difficulty}`, to: `/problems/${p.id}` }),
          },
          {
            title: "Saved Interview Logs",
            items: bookmarkedExps,
            emptyMsg: "No saved interview experiences. Bookmark company reports!",
            renderItem: (exp) => ({ primary: `${exp.company} Loop`, secondary: `Verdict: ${exp.verdict}`, to: "/interviews" }),
          },
        ].map(({ title, items, emptyMsg, renderItem }) => (
          <Grid item xs={12} md={6} key={title}>
            <Card style={{ padding: "20px", textAlign: "left" }}>
              <CardHeader style={{ marginBottom: "12px", paddingBottom: "8px" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</Typography>
                <Bookmark size={14} style={{ color: "#A1A1AA" }} />
              </CardHeader>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                {items.length === 0 ? (
                  <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary", py: 3, display: "block" }}>{emptyMsg}</Typography>
                ) : (
                  items.map((item) => {
                    const { primary, secondary, to } = renderItem(item);
                    return (
                      <Box key={item.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.25, borderRadius: "8px", backgroundColor: "rgba(26,26,26,0.4)", border: "1px solid", borderColor: "divider", transition: "border-color 0.2s", "&:hover": { borderColor: "rgba(212,175,55,0.5)" } }}>
                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>{primary}</Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "9px" }}>{secondary}</Typography>
                        </Box>
                        <Link to={to} style={{ textDecoration: "none" }}>
                          <Button size="sm" variant="ghost" style={{ padding: "4px 8px" }}>
                            <ChevronRight size={14} />
                          </Button>
                        </Link>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Profile;
