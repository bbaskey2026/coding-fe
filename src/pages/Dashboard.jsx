import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Cpu,
  Bookmark,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Code2
} from "lucide-react";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Heatmap } from "../components/ui/Heatmap";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const Dashboard = () => {
  const { userProfile, problems, contests, solveProblem } = useApp();

  const totalSolved = userProfile.solvedProblemsList.length;
  const solvedEasy = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Easy").length;
  const solvedMedium = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Medium").length;
  const solvedHard = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Hard").length;

  const totalEasyInDb = problems.filter(p => p.difficulty === "Easy").length;
  const totalMediumInDb = problems.filter(p => p.difficulty === "Medium").length;
  const totalHardInDb = problems.filter(p => p.difficulty === "Hard").length;

  const doughnutData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [{
      data: [solvedEasy || 20, solvedMedium || 50, solvedHard || 14],
      backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
      borderColor: ["#09090B", "#09090B", "#09090B"],
      borderWidth: 2,
      cutout: "75%"
    }]
  };

  const doughnutOptions = {
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false
  };

  const lineData = {
    labels: ["Contest 390", "Contest 394", "Contest 398", "Contest 400", "Contest 402", "Contest 404"],
    datasets: [{
      label: "Rating",
      data: [1500, 1580, 1640, 1720, 1790, userProfile.rating],
      fill: false,
      borderColor: "#8B5CF6",
      tension: 0.35,
      pointBackgroundColor: "#8B5CF6",
      pointBorderWidth: 1,
      pointRadius: 4
    }]
  };

  const lineOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#A1A1AA", font: { size: 10 } } },
      y: { grid: { color: "rgba(39, 39, 42, 0.4)" }, ticks: { color: "#A1A1AA", font: { size: 10 } } }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const dailyChallengeId = 3;
  const dailyProblem = problems.find(p => p.id === dailyChallengeId) || problems[0];

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
        position: "relative",
      }}
    >
      {/* M3 Decorative background */}
      <Box className="pattern-crosshatch" sx={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "24px" }} />
      <Box
        className="animate-blob-morph"
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 192,
          height: 192,
          background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(255,215,0,0.06) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Welcome banner */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, position: "relative", zIndex: 10 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
            Welcome back, {userProfile.username} <Sparkles size={20} style={{ color: "#FFD700" }} className="animate-pulse" />
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
            Here is your coding preparation progress dashboard.
          </Typography>
        </Box>

        {/* Level Indicator */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider", p: 1.5, borderRadius: "12px" }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "8px",
              background: "linear-gradient(45deg, #D4AF37 0%, #FFD700 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "background.default",
              fontSize: "12px",
            }}
          >
            Lvl {Math.floor(totalSolved / 5) + 1}
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "bold", textTransform: "uppercase", display: "block", fontSize: "10px" }}>Rank Score</Typography>
            <Typography variant="caption" sx={{ color: "text.primary", fontWeight: "bold" }}>Top {userProfile.rank} on leaderboards</Typography>
          </Box>
        </Box>
      </Box>

      {/* Grid: Daily Challenge & Progress Overview */}
      <Grid container spacing={3} sx={{ position: "relative", zIndex: 10 }}>
        {/* Daily Challenge Card */}
        <Grid item xs={12} lg={8} component={motion.div} variants={itemVariants}>
          <Card hoverGlow glowColor="accent" style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Badge variant="primary" size="sm">Daily Challenge</Badge>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "10px", color: "text.secondary" }}>
                  <Flame size={12} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                  <span>Ends in 12h 40m</span>
                </Box>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary", mt: 1 }}>
                {dailyProblem?.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block", lineHeight: 1.6, fontWeight: "light" }}>
                {dailyProblem?.description.replace(/###/g, "").replace(/\*\*/g, "").slice(0, 200)}…
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                <Badge
                  variant={dailyProblem?.difficulty === "Easy" ? "success" : dailyProblem?.difficulty === "Medium" ? "warning" : "danger"}
                  size="sm"
                >
                  {dailyProblem?.difficulty}
                </Badge>
                {dailyProblem?.tags?.map(t => (
                  <Badge key={t} size="sm">{t}</Badge>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3, pt: 2, borderTop: "1px solid", borderColor: "rgba(44,44,44,0.4)" }}>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light" }}>
                Acceptance: {dailyProblem?.acceptance}
              </Typography>
              <Link to={`/problems/${dailyProblem?.id}`} style={{ textDecoration: "none" }}>
                <Button size="sm" style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
                  Solve Challenge <ArrowRight size={14} />
                </Button>
              </Link>
            </Box>
          </Card>
        </Grid>

        {/* Streak & Achievements Mini Card */}
        <Grid item xs={12} lg={4} component={motion.div} variants={itemVariants}>
          <Card style={{ padding: "24px", height: "100%" }}>
            <CardHeader style={{ marginBottom: "12px", paddingBottom: "8px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Weekly Streak
              </Typography>
              <Flame size={18} style={{ color: "#F59E0B", fill: "#F59E0B" }} className="animate-bounce" />
            </CardHeader>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#F59E0B" }}>{userProfile.streak}</Typography>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>Consecutive Days Coded</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", lineHeight: 1.5 }}>
                  Keep solving 1 problem daily to sustain the streak score.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: "rgba(44,44,44,0.4)" }} />

            <Box>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", mb: 1.5, fontSize: "10px" }}>
                Quick Actions
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <ButtonBase
                    onClick={() => solveProblem(1)}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      p: 1,
                      backgroundColor: "background.card",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "8px",
                      fontSize: "10px",
                      color: "text.primary",
                      justifyContent: "flex-start",
                      "&:hover": { borderColor: "primary.main", backgroundColor: "background.paper" },
                    }}
                  >
                    <Code2 size={12} style={{ color: "#D4AF37" }} />
                    <span>Quick Solve</span>
                  </ButtonBase>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/mock-interview" style={{ textDecoration: "none", display: "block" }}>
                    <ButtonBase
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        p: 1,
                        backgroundColor: "background.card",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "8px",
                        fontSize: "10px",
                        color: "text.primary",
                        justifyContent: "flex-start",
                        "&:hover": { borderColor: "primary.main", backgroundColor: "background.paper" },
                      }}
                    >
                      <Cpu size={12} style={{ color: "#FFD700" }} />
                      <span>Mock Prep</span>
                    </ButtonBase>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Grid: Charts & Statistics */}
      <Grid container spacing={3}>
        {/* Solved Problems Breakdown Chart */}
        <Grid item xs={12} md={4} component={motion.div} variants={itemVariants}>
          <Card style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", mb: 2 }}>
                Solved Problems
              </Typography>
              <Box sx={{ position: "relative", width: 144, height: 144, mx: "auto", display: "flex", alignItems: "center", justifyContent: "center", mt: 1 }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
                <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>{totalSolved}</Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.05em", fontSize: "10px" }}>Solved</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
              {[
                { label: "Easy", color: "#22C55E", solved: solvedEasy, total: totalEasyInDb },
                { label: "Medium", color: "#F59E0B", solved: solvedMedium, total: totalMediumInDb },
                { label: "Hard", color: "#EF4444", solved: solvedHard, total: totalHardInDb },
              ].map(({ label, color, solved, total }) => (
                <Box key={label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color, fontWeight: "medium" }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                    {label}
                  </Box>
                  <Typography variant="caption" sx={{ color: "text.primary", fontWeight: "bold" }}>
                    {solved} / <span style={{ color: "#A1A1AA", fontWeight: "normal" }}>{total}</span>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Rating Progress Line Chart */}
        <Grid item xs={12} md={8} component={motion.div} variants={itemVariants}>
          <Card style={{ padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Rating History
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "12px", fontWeight: "bold", color: "#FFD700" }}>
                  <TrendingUp size={14} />
                  Global Rank #{userProfile.rank}
                </Box>
              </Box>
              <Box sx={{ height: 176, width: "100%", mt: 1, position: "relative" }}>
                <Line data={lineData} options={lineOptions} />
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", mt: 2, pt: 1.5, display: "block", borderTop: "1px solid rgba(44,44,44,0.4)" }}>
              Contest performance is updated automatically at the conclusion of weekly sprints.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Contribution Calendar Heatmap */}
      <Box component={motion.div} variants={itemVariants}>
        <Heatmap data={userProfile.heatmap} />
      </Box>

      {/* Grid: Continue Solving & Recent Activities */}
      <Grid container spacing={3}>
        {/* Continue Solving List */}
        <Grid item xs={12} lg={8} component={motion.div} variants={itemVariants}>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <CardHeader style={{ marginBottom: "12px", paddingBottom: "8px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Continue Solving
              </Typography>
            </CardHeader>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, mt: 1 }}>
              {problems.slice(15, 18).map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: "8px",
                    backgroundColor: "background.card",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "rgba(212,175,55,0.5)" },
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>{p.title}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.75 }}>
                      <Badge variant={p.difficulty === "Easy" ? "success" : p.difficulty === "Medium" ? "warning" : "danger"} size="sm">
                        {p.difficulty}
                      </Badge>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>Acceptance: {p.acceptance}</Typography>
                    </Box>
                  </Box>
                  <Link to={`/problems/${p.id}`} style={{ textDecoration: "none" }}>
                    <Button size="sm" variant="ghost" style={{ padding: "4px", color: "#D4AF37" }}>
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Saved Bookmarks Shortcuts */}
        <Grid item xs={12} lg={4} component={motion.div} variants={itemVariants}>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <CardHeader style={{ marginBottom: "12px", paddingBottom: "8px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Saved Bookmarks
              </Typography>
              <Bookmark size={14} style={{ color: "#A1A1AA" }} />
            </CardHeader>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
              {problems.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  to={`/problems/${p.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                      color: "text.secondary",
                      py: 1,
                      borderBottom: "1px solid rgba(44,44,44,0.3)",
                      "&:last-child": { borderBottom: 0 },
                      "&:hover": { color: "text.primary" },
                      transition: "color 0.2s",
                    }}
                  >
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>{p.title}</span>
                    <Badge size="sm">{p.difficulty}</Badge>
                  </Box>
                </Link>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
