import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, HelpCircle, Calendar, ShieldCheck, MapPin, Layers } from "lucide-react";
import { useApp } from "../context/AppContext";
import { companyGuidesService } from "../services/companyGuides.service";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// High-end CSS Gradient logo maps for companies
const LOGO_GRADIENTS = {
  "TCS (Tata Consultancy Services)": "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  "Infosys": "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
  "Wipro": "linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)",
  "Cognizant (CTS)": "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
  "Accenture": "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)"
};

/**
 * Render structured markdown articles beautifully in dark mode
 */
const renderMarkdown = (text = "") => {
  if (!text) return null;
  const lines = text.split("\n");
  
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    
    // H1
    if (trimmed.startsWith("# ")) {
      return (
        <Typography key={idx} variant="h6" sx={{ fontWeight: 800, mt: 3, mb: 2, color: "primary.main", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {trimmed.substring(2)}
        </Typography>
      );
    }
    // H2
    if (trimmed.startsWith("## ")) {
      return (
        <Typography key={idx} sx={{ fontSize: "14px", fontWeight: "bold", mt: 3, mb: 1.5, color: "text.primary" }}>
          {trimmed.substring(3)}
        </Typography>
      );
    }
    // H3
    if (trimmed.startsWith("### ")) {
      return (
        <Typography key={idx} sx={{ fontSize: "13px", fontWeight: "bold", mt: 2, mb: 1, color: "text.secondary" }}>
          {trimmed.substring(4)}
        </Typography>
      );
    }
    // Separators
    if (trimmed === "---") {
      return <Divider key={idx} sx={{ my: 3, borderColor: "divider" }} />;
    }
    // Bullet list
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const content = parseInlineMarkdown(trimmed.substring(2));
      return (
        <Box key={idx} sx={{ display: "flex", gap: 1.25, ml: 2, mb: 1, alignItems: "flex-start" }}>
          <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "primary.main", mt: 0.75, flexShrink: 0 }} />
          <Typography sx={{ fontSize: "13px", color: "text.secondary", lineHeight: 1.6 }}>
            {content}
          </Typography>
        </Box>
      );
    }
    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const number = trimmed.match(/^\d+/)[0];
      const rest = trimmed.replace(/^\d+\.\s/, "");
      const content = parseInlineMarkdown(rest);
      return (
        <Box key={idx} sx={{ display: "flex", gap: 1, ml: 2, mb: 1, alignItems: "flex-start" }}>
          <Typography sx={{ fontSize: "13px", fontWeight: "bold", color: "primary.main", minWidth: 16 }}>
            {number}.
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "text.secondary", lineHeight: 1.6 }}>
            {content}
          </Typography>
        </Box>
      );
    }
    
    // Blank lines
    if (!trimmed) {
      return <Box key={idx} sx={{ height: 8 }} />;
    }
    
    // Table Rows (Ignore markdown table formatting block lines)
    if (trimmed.startsWith("|") && trimmed.includes("---")) {
      return null;
    }
    if (trimmed.startsWith("|")) {
      const columns = trimmed.split("|").map(c => c.trim()).filter(Boolean);
      // If it is a header row, render nicely
      const isHeader = idx > 0 && lines[idx - 1].trim() === "" && lines[idx + 1]?.includes("---");
      return (
        <Box key={idx} sx={{ display: "flex", borderBottom: "1px solid", borderColor: "divider", py: 1.25, px: 1, bgcolor: isHeader ? "rgba(255,255,255,0.02)" : "transparent" }}>
          {columns.map((col, cIdx) => (
            <Typography key={cIdx} sx={{ flex: 1, fontSize: "12px", fontWeight: isHeader ? "bold" : "normal", color: isHeader ? "text.primary" : "text.secondary" }}>
              {col}
            </Typography>
          ))}
        </Box>
      );
    }

    // Default paragraph
    return (
      <Typography key={idx} sx={{ fontSize: "13px", color: "text.secondary", mb: 2, lineHeight: 1.7 }}>
        {parseInlineMarkdown(trimmed)}
      </Typography>
    );
  });
};

/**
 * Bold text parser **bold**
 */
const parseInlineMarkdown = (text = "") => {
  const parts = [];
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;
  let lastIndex = 0;
  
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} style={{ color: "#FFF", fontWeight: "bold" }}>
        {match[1]}
      </strong>
    );
    lastIndex = boldRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

export const CompanyGuideDetails = () => {
  const { id } = useParams();
  const { companyGuides } = useApp();
  
  const [guide, setGuide] = useState(() => companyGuides.find(g => g.id === parseInt(id)));
  const [loading, setLoading] = useState(!guide);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        const data = await companyGuidesService.getById(id);
        if (data) {
          setGuide(data);
        }
      } catch (err) {
        console.error("Failed to load company guide details from API", err);
        setError("Could not retrieve company guide specifications.");
      } finally {
        setLoading(false);
      }
    };

    if (!guide) {
      fetchGuide();
    }
  }, [id, guide]);

  const getInitials = (name = "") => {
    return name
      .replace(/\(.*?\)/g, "")
      .trim()
      .split(" ")
      .map(w => w[0])
      .join("")
      .substring(0, 3)
      .toUpperCase();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !guide) {
    return (
      <Box sx={{ maxWidth: "800px", mx: "auto", px: 3, pt: 15, pb: 6, textAlign: "left" }}>
        <Card style={{ padding: "32px", textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "error.main", mb: 2 }}>{error || "Company guide not found."}</Typography>
          <Button component={Link} to="/company-guides" icon={ArrowLeft} variant="outline">
            Back to Catalog
          </Button>
        </Card>
      </Box>
    );
  }

  const logoBg = LOGO_GRADIENTS[guide.companyName] || "linear-gradient(135deg, #111 0%, #222 100%)";

  return (
    <Box
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
      {/* Back button */}
      <Box sx={{ zIndex: 1 }}>
        <Button
          component={Link}
          to="/company-guides"
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          sx={{ pl: 0 }}
        >
          Back to Catalog
        </Button>
      </Box>

      {/* Header Banner Card */}
      <Card style={{ padding: "32px", zIndex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, alignItems: "center" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "16px",
              background: logoBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 20,
              color: "#FFF",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)"
            }}
          >
            {getInitials(guide.companyName)}
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
              {guide.companyName}
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mt: 0.5, justifyContent: { xs: "center", md: "flex-start" } }}>
              <Typography sx={{ fontSize: "12px", color: "primary.main", fontWeight: "bold" }}>
                {guide.examPattern?.examName || "Standard Placement Assessment"}
              </Typography>
              <Badge variant={guide.difficulty.includes("Medium") ? "warning" : "success"}>
                {guide.difficulty}
              </Badge>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Grid Layout */}
      <Grid container spacing={3} sx={{ zIndex: 1 }}>
        {/* Left Side Details */}
        <Grid item xs={12} md={5} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Exam Pattern Card */}
          <Card style={{ padding: "24px" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <ShieldCheck size={16} style={{ color: "#D4AF37" }} /> Exam Configuration
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider", pb: 1 }}>
                <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>Duration:</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#FFF" }}>{guide.examPattern?.durationMinutes || "N/A"} Minutes</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider", pb: 1 }}>
                <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>Negative Marking:</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#FFF" }}>{guide.examPattern?.negativeMarking ? "Yes" : "No"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider", pb: 1 }}>
                <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>Testing Mode:</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#FFF", fontSize: 11 }}>{guide.examPattern?.mode || "Online"}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "divider", pb: 1 }}>
                <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>Assessment Frequency:</Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#FFF", fontSize: 11 }}>{guide.examPattern?.frequency || "Annually"}</Typography>
              </Box>
            </Box>

            {guide.examPattern?.sections && (
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontSize: "11px", fontWeight: "bold", color: "primary.main", mb: 1, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Section-wise Timing & Questions
                </Typography>
                <TableContainer>
                  <Table size="small" sx={{ "& .TableCell-root": { borderBottomColor: "divider" }, "& .MuiTableCell-root": { borderColor: "divider", px: 0.5, py: 1, fontSize: "12px", color: "text.secondary" } }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: "text.primary", fontWeight: "bold" }}>Section</TableCell>
                        <TableCell align="right" sx={{ color: "text.primary", fontWeight: "bold" }}>Qns</TableCell>
                        <TableCell align="right" sx={{ color: "text.primary", fontWeight: "bold" }}>Mins</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {guide.examPattern.sections.map((sect, idx) => (
                        <TableRow key={idx}>
                          <TableCell sx={{ color: "text.primary", fontWeight: "medium" }}>{sect.name}</TableCell>
                          <TableCell align="right" sx={{ color: "#FFF" }}>{sect.questions}</TableCell>
                          <TableCell align="right" sx={{ color: "#FFF" }}>{sect.time}m</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Card>

          {/* Topics Card */}
          <Card style={{ padding: "24px" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <Layers size={16} style={{ color: "#D4AF37" }} /> Syllabus Modules
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {guide.questionTypes.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </Box>
          </Card>

          {/* Common Coding Questions Card */}
          <Card style={{ padding: "24px" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
              <HelpCircle size={16} style={{ color: "#D4AF37" }} /> Suggested Challenges
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 2 }}>
              Practice these matching programming challenges frequently asked in past papers.
            </Typography>
            
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {guide.commonQuestions && guide.commonQuestions.length > 0 ? (
                guide.commonQuestions.map((q, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderRadius: "8px",
                      bgcolor: "rgba(255,255,255,0.01)",
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": {
                        borderColor: "rgba(212,175,55,0.3)",
                        bgcolor: "background.card"
                      }
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "text.primary" }}>
                        {q.title}
                      </Typography>
                      <Typography sx={{ fontSize: "10px", color: "text.secondary" }}>
                        Suggested practice task
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      to={`/problems/${q.problemId}`}
                      size="sm"
                      variant="outline"
                      icon={Play}
                    >
                      Solve
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography variant="caption" sx={{ color: "text.secondary" }}>No specific coding challenges suggested.</Typography>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Right Side: Markdown Preparation Guide */}
        <Grid item xs={12} md={7}>
          <Card style={{ padding: "32px", minHeight: "450px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {renderMarkdown(guide.articleContent)}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CompanyGuideDetails;
