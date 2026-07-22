import React, { useState, useEffect } from "react";
import { Clock, Trophy, Users, Award, Play } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const Contests = () => {
  const { contests, registerForContest } = useApp();

  const liveContest = contests.find(c => c.status === "live");
  const upcomingContests = contests.filter(c => c.status === "upcoming").slice(0, 4);
  const pastContests = contests.filter(c => c.status === "past").slice(0, 10);

  const [countdown, setCountdown] = useState({ h: 1, m: 24, s: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        else if (prev.m > 0) return { h: prev.h, m: prev.m - 1, s: 59 };
        else if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        else { clearInterval(timer); return prev; }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdownStr = () =>
    `${countdown.h.toString().padStart(2, "0")}h ${countdown.m.toString().padStart(2, "0")}m ${countdown.s.toString().padStart(2, "0")}s`;

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Competitive Arena</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Participate in algorithmic marathons, rank high, and boost your rating score.
        </Typography>
      </Box>

      {/* Live Contest Highlight */}
      {liveContest && (
        <Card hoverGlow glowColor="primary" style={{ padding: "24px", borderColor: "rgba(212,175,55,0.3)", backgroundColor: "rgba(212,175,55,0.03)" }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { md: "center" }, gap: 3 }}>
            <Box>
              <Badge variant="danger" size="sm" className="animate-pulse" style={{ marginBottom: "12px" }}>Live Contest Active</Badge>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>{liveContest.title}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block", fontWeight: "light" }}>
                Solve 4 algorithmic coding problems in 3 hours. Compete with {liveContest.participants} registered coders.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", md: "flex-end" }, gap: 1.5 }}>
              <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: "bold", display: "block", fontSize: "10px" }}>Ends In</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                  <Clock size={20} style={{ color: "#D32F2F" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#D32F2F", fontFamily: "monospace" }}>
                    {formatCountdownStr()}
                  </Typography>
                </Box>
              </Box>
              <Button size="md" style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
                Enter Arena <Play size={12} style={{ fill: "currentColor" }} />
              </Button>
            </Box>
          </Box>
        </Card>
      )}

      {/* Upcoming Contests */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", mb: 2 }}>
          Upcoming Tournaments
        </Typography>
        <Grid container spacing={2}>
          {upcomingContests.map((c) => (
            <Grid item xs={12} md={6} key={c.id}>
              <Card style={{ padding: "20px", height: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                      <Badge variant="primary" size="sm">Scheduled</Badge>
                      <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "10px" }}>ID: #{c.id}</Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary" }}>{c.title}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.75, color: "text.secondary", fontSize: "12px" }}>
                      <Clock size={12} /> <span>Starts on {new Date(c.startTime).toLocaleDateString()}</span>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.75, color: "text.secondary", fontSize: "12px" }}>
                      <Users size={12} /> <span>{c.participants} coders registered</span>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid rgba(44,44,44,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light" }}>Duration: {c.durationMinutes} min</Typography>
                    <Button
                      variant={c.registered ? "success" : "outline"}
                      size="sm"
                      onClick={() => registerForContest(c.id)}
                      disabled={c.registered}
                      style={{ fontWeight: "bold" }}
                    >
                      {c.registered ? "Registered ✓" : "Register Now"}
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Past Contests catalog */}
      <Card style={{ padding: "20px" }}>
        <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
          <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Past Contests History
          </Typography>
        </CardHeader>
        <Box sx={{ overflowX: "auto" }}>
          <Box component="table" sx={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "500px" }}>
            <Box component="thead">
              <Box component="tr" sx={{ borderBottom: "1px solid rgba(44,44,44,0.6)", backgroundColor: "rgba(26,26,26,0.25)" }}>
                {[{ label: "Contest Title" }, { label: "Registrants", align: "center" }, { label: "Difficulty", align: "center" }, { label: "Action", align: "right" }].map(h => (
                  <Box key={h.label} component="th" sx={{ py: 1.25, px: 2, fontSize: "10px", fontWeight: "bold", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase", textAlign: h.align || "left" }}>
                    {h.label}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {pastContests.map((c) => (
                <Box component="tr" key={c.id} sx={{ borderBottom: "1px solid rgba(44,44,44,0.3)", transition: "background-color 0.2s", "&:hover": { backgroundColor: "rgba(26,26,26,0.2)" } }}>
                  <Box component="td" sx={{ py: 1.5, px: 2, fontWeight: "bold", color: "text.primary", fontSize: "12px" }}>{c.title}</Box>
                  <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "center", color: "text.secondary", fontFamily: "monospace", fontSize: "12px" }}>{c.participants}</Box>
                  <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5, fontSize: "10px" }}>
                      <span style={{ color: "#22C55E" }}>Easy</span>
                      <span style={{ color: "#A1A1AA" }}>/</span>
                      <span style={{ color: "#F59E0B" }}>Medium</span>
                      <span style={{ color: "#A1A1AA" }}>/</span>
                      <span style={{ color: "#EF4444" }}>Hard</span>
                    </Box>
                  </Box>
                  <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "right" }}>
                    <Button variant="ghost" size="sm" style={{ fontSize: "12px", fontWeight: "bold" }}>
                      View Leaderboard
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default Contests;
