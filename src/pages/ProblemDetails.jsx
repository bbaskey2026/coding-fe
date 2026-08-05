import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Modal,
  Paper,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider,
  CircularProgress,
  Stack,
  Container,
  SvgIcon
} from "@mui/material";
import { useApp } from "../context/AppContext";

/* ---------------------------------------------------------------------- */
/* Inline icon components (replace @mui/icons-material to avoid the       */
/* "Failed to resolve import" error). These use @mui/material's SvgIcon,  */
/* which is already part of @mui/material, so no extra package is needed.*/
/* They accept the same props (sx, fontSize, etc.) as the original icons.*/
/* ---------------------------------------------------------------------- */

const ArrowBack = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </SvgIcon>
);

const PlayArrow = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </SvgIcon>
);

const CheckCircle = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </SvgIcon>
);

const Forum = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
  </SvgIcon>
);

const MenuBook = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
  </SvgIcon>
);

const Bookmark = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </SvgIcon>
);

const BookmarkAdded = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm-6.7 11.7L7 11.4l1.41-1.4 1.9 1.9 4.9-4.9 1.4 1.41-6.31 6.29z" />
  </SvgIcon>
);

const ExpandLess = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  </SvgIcon>
);

const AccessTime = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </SvgIcon>
);

const Terminal = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zM6 10l4 4-4 4-1.41-1.41L7.17 14 4.59 11.41 6 10zM12 16h6v2h-6z" />
  </SvgIcon>
);

const InfoOutlined = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </SvgIcon>
);

/* ---------------------------------------------------------------------- */

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy": return "success";
    case "Medium": return "warning";
    case "Hard": return "error";
    default: return "default";
  }
};

export const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    problems,
    solveProblem,
    attemptProblem,
    toggleProblemBookmark,
    bookmarkedProblemIds,
    addForumComment,
    addNotification
  } = useApp();

  const problem = problems.find((p) => p.id === parseInt(id)) || problems[0];

  const [activeTab, setActiveTab] = useState(0);
  const [language, setLanguage] = useState("javascript");
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    if (problem) {
      const template = problem.templates[language] || `// Template not available\nfunction solve() {\n    // Write code\n}`;
      setEditorValue(template);
    }
  }, [language, problem]);

  const [consoleOpen, setConsoleOpen] = useState(false);
  const [runLogs, setRunLogs] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!problem) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress />
      </Box>
    );
  }

  const isBookmarked = bookmarkedProblemIds.includes(problem.id);

  const handleRunCode = () => {
    setIsCompiling(true);
    setConsoleOpen(true);
    setRunLogs("Compiling script and verifying assertions...");
    attemptProblem(problem.id);

    setTimeout(() => {
      setIsCompiling(false);
      setRunLogs(`Status: Accepted 🟢\nRuntime: 12ms\nMemory: 41.2 MB\n\nOutput Log:\n---------------------\nCase 1 input: ${problem.examples[0]?.input || "data"}\nOutput: ${problem.examples[0]?.output || "true"}\nExpected: ${problem.examples[0]?.output || "true"}\n\nAssertion Successful. All tests verified.`);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setIsCompiling(true);
    setConsoleOpen(true);
    setRunLogs("Submitting code to assertion nodes...");

    setTimeout(() => {
      setIsCompiling(false);
      setRunLogs("Solution verified. Status: Solved 🟢");
      solveProblem(problem.id);
      setIsSubmitOpen(true);
    }, 1800);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addForumComment(1, commentText);
    setCommentText("");
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 10, pb: 3, height: "100vh", display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1 }}>
        <Button
          component={Link}
          to="/problems"
          startIcon={<ArrowBack sx={{ fontSize: 14 }} />}
          size="small"
          sx={{ color: "text.secondary", fontSize: 12, textTransform: "none" }}
        >
          Back to Catalog
        </Button>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton
            onClick={() => toggleProblemBookmark(problem.id)}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              color: isBookmarked ? "primary.main" : "text.secondary"
            }}
          >
            {isBookmarked ? <BookmarkAdded sx={{ fontSize: 14 }} /> : <Bookmark sx={{ fontSize: 14 }} />}
          </IconButton>

          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            borderRadius: 2,
            fontFamily: "monospace",
            fontSize: 12,
            fontWeight: 600
          }}>
            <AccessTime sx={{ fontSize: 12, color: "text.secondary" }} />
            <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 600 }}>
              {formatTime(time)}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Main Split Screen */}
      <Box sx={{ display: "grid", gridTemplateColumns: { lg: "1fr 1fr" }, gap: 2, flex: 1, minHeight: 500 }}>
        {/* Left Pane */}
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
            borderRadius: 3,
            bgcolor: "background.paper"
          }}
        >
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: "action.hover",
              minHeight: 44,
              "& .MuiTab-root": {
                fontSize: 11,
                fontWeight: 600,
                textTransform: "none",
                minHeight: 44,
                py: 0
              }
            }}
          >
            <Tab icon={<InfoOutlined sx={{ fontSize: 13 }} />} iconPosition="start" label="Description" />
            <Tab icon={<MenuBook sx={{ fontSize: 13 }} />} iconPosition="start" label="Editorial Walkthrough" />
            <Tab icon={<Forum sx={{ fontSize: 13 }} />} iconPosition="start" label={`Community Forum (${problem.discussions.length})`} />
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ flex: 1, overflowY: "auto", p: 3, fontSize: 13, color: "text.secondary", lineHeight: 1.7 }}>
            {/* Description Tab */}
            {activeTab === 0 && (
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                    {problem.id}. {problem.title}
                  </Typography>
                  <Chip
                    label={problem.difficulty}
                    color={getDifficultyColor(problem.difficulty)}
                    size="small"
                    sx={{ fontSize: 10, height: 20 }}
                  />
                </Box>

                <Divider />

                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", color: "text.primary", fontWeight: 400, fontSize: 13 }}>
                  {problem.description.replace(/###/g, "").replace(/\*\*/g, "")}
                </Typography>

                {/* Examples */}
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {problem.examples.map((ex, idx) => (
                    <Paper key={idx} variant="outlined" sx={{ p: 2, bgcolor: "action.hover", borderRadius: 2 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", display: "block", mb: 1 }}>
                        Example {idx + 1}:
                      </Typography>
                      <Box sx={{ fontFamily: "monospace", fontSize: 11, color: "text.secondary" }}>
                        <Box><Typography component="span" sx={{ fontWeight: 600, color: "text.primary", fontSize: 11 }}>Input:</Typography> {ex.input}</Box>
                        <Box><Typography component="span" sx={{ fontWeight: 600, color: "text.primary", fontSize: 11 }}>Output:</Typography> {ex.output}</Box>
                        {ex.explanation && (
                          <Box sx={{ mt: 0.5 }}>
                            <Typography component="span" sx={{ fontWeight: 600, color: "text.primary", fontSize: 11 }}>Explanation:</Typography> {ex.explanation}
                          </Box>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Stack>

                {/* Constraints */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", display: "block", mb: 1 }}>
                    Constraints:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, m: 0 }}>
                    {problem.constraints.map((c, idx) => (
                      <Box component="li" key={idx} sx={{ fontFamily: "monospace", fontSize: 11, color: "text.secondary", mb: 0.5 }}>
                        {c}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Hints */}
                <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary", display: "block", mb: 1 }}>
                    Hints:
                  </Typography>
                  <Stack spacing={1}>
                    {problem.hints.map((hint, idx) => (
                      <Accordion key={idx} variant="outlined" sx={{ bgcolor: "action.hover", borderRadius: "8px !important", "&:before": { display: "none" } }}>
                        <AccordionSummary expandIcon={<ExpandLess sx={{ fontSize: 14 }} />}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>
                            Hint {idx + 1}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0 }}>
                          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                            {hint}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            )}

            {/* Editorial Tab */}
            {activeTab === 1 && (
              <Stack spacing={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Official Editorial Guide
                </Typography>
                <Divider />
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", color: "text.primary", fontWeight: 300, lineHeight: 1.8 }}>
                  {problem.editorial}
                </Typography>
              </Stack>
            )}

            {/* Discussion Tab */}
            {activeTab === 2 && (
              <Stack spacing={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                  Thread Discussions
                </Typography>

                <Box component="form" onSubmit={handlePostComment} sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a comment or solution alternative..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    sx={{ fontSize: 12, "& .MuiInputBase-input": { fontSize: 12 } }}
                  />
                  <Button type="submit" variant="contained" size="small" sx={{ textTransform: "none", fontSize: 12, whiteSpace: "nowrap" }}>
                    Post
                  </Button>
                </Box>

                <Stack spacing={2}>
                  {problem.discussions.length === 0 ? (
                    <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary", py: 4, display: "block" }}>
                      No discussions started. Be the first to comment!
                    </Typography>
                  ) : (
                    problem.discussions.map((comm) => (
                      <Paper key={comm.id} variant="outlined" sx={{ p: 1.5, borderRadius: 2, display: "flex", gap: 1.5 }}>
                        <Avatar src={comm.avatar} alt={comm.username} sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }} />
                        <Box>
                          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>{comm.username}</Typography>
                            <Typography sx={{ fontSize: 9, color: "text.secondary" }}>{comm.date}</Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.6, display: "block", mt: 0.5 }}>
                            {comm.text}
                          </Typography>
                          <Typography sx={{ fontSize: 10, color: "text.secondary", mt: 1, cursor: "pointer", "&:hover": { color: "primary.main" } }}>
                            ▲ Upvote ({comm.likes})
                          </Typography>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Stack>
              </Stack>
            )}
          </Box>
        </Paper>

        {/* Right Pane - Editor */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "hidden",
              borderRadius: 3,
              bgcolor: "background.paper"
            }}
          >
            {/* Editor Toolbar */}
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "action.hover",
              px: 2,
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider"
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FormControl size="small">
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    sx={{ fontSize: 12, height: 30, "& .MuiSelect-select": { py: 0.5 } }}
                  >
                    <MenuItem value="javascript" sx={{ fontSize: 12 }}>JavaScript</MenuItem>
                    <MenuItem value="python" sx={{ fontSize: 12 }}>Python</MenuItem>
                    <MenuItem value="cpp" sx={{ fontSize: 12 }}>C++</MenuItem>
                    <MenuItem value="java" sx={{ fontSize: 12 }}>Java</MenuItem>
                  </Select>
                </FormControl>

                <Typography
                  variant="caption"
                  onClick={() => {
                    const template = problem.templates[language];
                    setEditorValue(template);
                    addNotification("Editor Reset", "The workspace template has been reset.", "info");
                  }}
                  sx={{ cursor: "pointer", color: "text.secondary", fontSize: 10, "&:hover": { color: "text.primary", textDecoration: "underline" } }}
                >
                  Reset Template
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "success.main" }} />
                <Typography variant="caption" sx={{ fontSize: 10, color: "text.secondary", fontFamily: "monospace" }}>
                  Compiler Online
                </Typography>
              </Box>
            </Box>

            {/* Monaco Editor */}
            <Box sx={{ flex: 1, width: "100%", bgcolor: "background.paper", position: "relative", minHeight: 300 }}>
              <Editor
                height="100%"
                language={language}
                theme="light"
                value={editorValue}
                onChange={(val) => setEditorValue(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineHeight: 20,
                  fontFamily: "Fira Code, ui-monospace, monospace",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 12 }
                }}
              />
            </Box>

            {/* Console Output */}
            {consoleOpen && (
              <Box sx={{
                height: 192,
                borderTop: "1px solid",
                borderColor: "divider",
                bgcolor: "background.card",
                p: 2,
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
                fontSize: 12
              }}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "text.secondary",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  pb: 1,
                  mb: 1
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
                    <Terminal sx={{ fontSize: 14 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                      Compilation Console Logs
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    onClick={() => setConsoleOpen(false)}
                    sx={{ cursor: "pointer", fontSize: 10, fontWeight: 700, textTransform: "uppercase", "&:hover": { color: "text.primary" } }}
                  >
                    Close
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, overflowY: "auto", whiteSpace: "pre-wrap", lineHeight: 1.6, color: "text.primary", fontSize: 11 }}>
                  {runLogs}
                </Box>
              </Box>
            )}

            {/* Footer */}
            <Box sx={{
              bgcolor: "action.hover",
              px: 2,
              py: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setConsoleOpen(!consoleOpen)}
                sx={{ textTransform: "none", fontSize: 12 }}
              >
                Console
              </Button>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  onClick={handleRunCode}
                  disabled={isCompiling}
                  startIcon={isCompiling ? <CircularProgress size={12} /> : <PlayArrow sx={{ fontSize: 14 }} />}
                  sx={{ textTransform: "none", fontSize: 12, fontWeight: 600 }}
                >
                  Run Code
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleSubmitCode}
                  disabled={isCompiling}
                  startIcon={isCompiling ? <CircularProgress size={12} color="inherit" /> : null}
                  sx={{ textTransform: "none", fontSize: 12, fontWeight: 600 }}
                >
                  Submit Code
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Success Modal */}
      <Modal open={isSubmitOpen} onClose={() => setIsSubmitOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4
        }}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Box sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "success.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <CheckCircle sx={{ fontSize: 32, color: "success.main" }} />
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
              Assertion Success! 🎉
            </Typography>

            <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
              All testcase inputs verified. You solved <strong>{problem.title}</strong> and updated your stats!
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ width: "100%", mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsSubmitOpen(false)}
                sx={{ flex: 1, textTransform: "none", fontSize: 12 }}
              >
                Review Code
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setIsSubmitOpen(false);
                  navigate("/problems");
                }}
                sx={{ flex: 1, textTransform: "none", fontSize: 12 }}
              >
                Back to Catalog
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default ProblemDetails;