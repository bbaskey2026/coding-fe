import React, { useState, useEffect } from "react";
import { Play, Volume2, Clock, Trophy, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export const MockInterview = () => {
  const { addNotification, triggerConfettiEffect } = useApp();

  const [sessionState, setSessionState] = useState("setup");
  const [difficulty, setDifficulty] = useState("Medium");
  const [topic, setTopic] = useState("Arrays");
  const [timeLeft, setTimeLeft] = useState(2700);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      handleFinishSession();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleStartSession = () => {
    setTimeLeft(2700); setSessionState("active"); setTimerActive(true);
    addNotification("Mock Session Started", `Good luck! You have 45 minutes to solve this ${difficulty} level ${topic} challenge.`, "info");
  };

  const handleFinishSession = () => {
    setTimerActive(false); setSessionState("feedback");
    triggerConfettiEffect();
    addNotification("Session Completed", "Mock interview assessment compiled successfully.", "success");
  };

  const playAudioPrompt = () => {
    addNotification("Audio Prompt Playing", "Interviewer: 'Let us discuss time complexity. Can you walk me through optimizing the heap lookup?'", "info");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const difficultyColor = { Easy: "#22C55E", Medium: "#F59E0B", Hard: "#EF4444" };

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Mock Interview Simulator</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Practice coding challenges under time constraints with interviewer prompts.
        </Typography>
      </Box>

      {/* Setup Phase */}
      {sessionState === "setup" && (
        <Box sx={{ maxWidth: "600px", mx: "auto", width: "100%" }}>
          <Card style={{ padding: "32px" }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Trophy size={36} style={{ color: "#D4AF37", margin: "0 auto 12px" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>Configure Mock Session</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>Select focus parameters to match upcoming loops.</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, textAlign: "left" }}>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", display: "block", mb: 1 }}>Difficulty Level</Typography>
                <Grid container spacing={1}>
                  {["Easy", "Medium", "Hard"].map((diff) => (
                    <Grid item xs={4} key={diff}>
                      <ButtonBase onClick={() => setDifficulty(diff)}
                        sx={{
                          width: "100%", py: 1, borderRadius: "8px", border: "1px solid", fontSize: "12px", fontWeight: "bold",
                          borderColor: difficulty === diff ? "primary.main" : "divider",
                          color: difficulty === diff ? "primary.main" : "text.secondary",
                          backgroundColor: difficulty === diff ? "rgba(212,175,55,0.1)" : "background.card",
                          transition: "all 0.2s",
                          "&:hover": { color: difficulty !== diff ? "text.primary" : "primary.main" },
                        }}>
                        {diff}
                      </ButtonBase>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", display: "block", mb: 1 }}>Topic Category</Typography>
                <FormControl size="small" fullWidth>
                  <Select value={topic} onChange={(e) => setTopic(e.target.value)}
                    sx={{ fontSize: "12px", color: "text.primary", backgroundColor: "background.paper", "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" }, "& .MuiSelect-icon": { color: "text.secondary" } }}>
                    <MenuItem value="Arrays" sx={{ fontSize: "12px" }}>Arrays & Hashing</MenuItem>
                    <MenuItem value="DP" sx={{ fontSize: "12px" }}>Dynamic Programming</MenuItem>
                    <MenuItem value="Graphs" sx={{ fontSize: "12px" }}>Graph Networks</MenuItem>
                    <MenuItem value="Trees" sx={{ fontSize: "12px" }}>Binary Trees</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button onClick={handleStartSession} style={{ width: "100%", fontWeight: "bold", marginTop: "16px" }}>
                Start Mock Interview
              </Button>
            </Box>
          </Card>
        </Box>
      )}

      {/* Active Session */}
      {sessionState === "active" && (
        <Grid container spacing={3}>
          {/* Question Details pane */}
          <Grid item xs={12} lg={8}>
            <Card style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "400px" }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Badge variant="primary" size="sm">Mock: {topic}</Badge>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontWeight: "bold", color: "#D32F2F", fontFamily: "monospace", fontSize: "12px" }}>
                    <Clock size={14} /> {formatTime(timeLeft)}
                  </Box>
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary" }}>Design a dynamic network data caching system</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", mt: 1.5, display: "block", lineHeight: 1.6, fontWeight: "light" }}>
                  Implement a data structure supporting <code>insert(key, val)</code>, <code>get(key)</code>, and <code>delete(key)</code> operations in average <code>O(1)</code> time. The cache must automatically evict least recently read nodes once limits are reached.
                </Typography>
              </Box>

              <Box sx={{ borderTop: "1px solid rgba(44,44,44,0.4)", pt: 2, mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button variant="outline" size="sm" onClick={playAudioPrompt} style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold", fontSize: "12px" }}>
                  <Volume2 size={14} /> Audio Prompt
                </Button>
                <Button variant="danger" size="sm" onClick={handleFinishSession} style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Finish Interview
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* Interview Checklist */}
          <Grid item xs={12} lg={4}>
            <Card style={{ padding: "20px" }}>
              <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Interviewer Notes Checklist
                </Typography>
              </CardHeader>
              <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: 1.75, p: 0, m: 0, listStyle: "none" }}>
                {[
                  "Explain brute-force complexity before coding.",
                  "Verify pointer boundaries and empty array inputs.",
                  "Dry run code with sample input variables out loud.",
                ].map((item, i) => (
                  <Box component="li" key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25, fontSize: "12px", color: "text.secondary", fontWeight: "light" }}>
                    <input type="checkbox" style={{ marginTop: "2px", accentColor: "#D4AF37" }} />
                    <span>{item}</span>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Feedback Phase */}
      {sessionState === "feedback" && (
        <Grid container spacing={3}>
          {/* Core rating stats */}
          <Grid item xs={12} md={4}>
            <Card style={{ padding: "24px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Trophy size={36} style={{ color: "#F59E0B" }} className="animate-bounce" />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary", mt: 2 }}>Performance Assessment</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.1em", display: "block" }}>Calculated Score</Typography>
                <Typography variant="h2" sx={{ fontWeight: 800, color: "primary.main", fontFamily: "monospace", mt: 3 }}>84%</Typography>
              </Box>
              <Button variant="outline" size="sm" onClick={() => setSessionState("setup")} style={{ width: "100%", marginTop: "32px", fontWeight: "bold" }}>
                Return to Setup
              </Button>
            </Card>
          </Grid>

          {/* Feedback logs details */}
          <Grid item xs={12} md={8}>
            <Card style={{ padding: "24px", textAlign: "left" }}>
              <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Interviewer Evaluation Report
                </Typography>
              </CardHeader>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { label: "Code Correctness & Complexity", score: "90%", color: "#22C55E" },
                  { label: "Communication & Out-Loud Logic", score: "85%", color: "#22C55E" },
                  { label: "Time efficiency & Edge Handling", score: "75%", color: "#F59E0B" },
                ].map(({ label, score, color }, i) => (
                  <Box key={label}>
                    {i > 0 && <Divider sx={{ borderColor: "rgba(44,44,44,0.3)", my: 1.5 }} />}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                      <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary" }}>{label}</Typography>
                      <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: "bold", color }}>{score}</Typography>
                    </Box>
                  </Box>
                ))}

                <Divider sx={{ borderColor: "rgba(44,44,44,0.4)", my: 2 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block" }}>Candidate Feedback Checklist:</Typography>
                  {[
                    "Excellent logic design. Handled clean LRU cache updates correctly.",
                    "Great communication out loud. Walked through list nodes before editing.",
                  ].map((item, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25, fontSize: "12px", color: "text.secondary", fontWeight: "light" }}>
                      <CheckCircle size={14} style={{ color: "#22C55E", marginTop: "2px", flexShrink: 0 }} />
                      <span>{item}</span>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default MockInterview;
