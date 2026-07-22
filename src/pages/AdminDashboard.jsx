import React, { useState } from "react";
import { PlusCircle, Eye, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Input, TextArea } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const AdminDashboard = () => {
  const { problems, addProblem, users } = useApp();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("Arrays");
  const [companies, setCompanies] = useState("Google");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addProblem({ title, difficulty, description, tags: tags.split(",").map(t => t.trim()), companies: companies.split(",").map(c => c.trim()) });
    setTitle(""); setDescription(""); setTags("Arrays"); setCompanies("Google");
  };

  const difficultyColor = { Easy: "#22C55E", Medium: "#F59E0B", Hard: "#EF4444" };

  const metrics = [
    { label: "Active Problems", count: problems.length, detail: "Across all diff levels" },
    { label: "Registered Users", count: users.length, detail: "Platform wide registrations" },
    { label: "Ongoing Sprints", count: 2, detail: "Contest evaluation buffers" },
    { label: "Reported Anomalies", count: 0, detail: "Auto-moderated flags" }
  ];

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Admin Control Center</Typography>
        <Badge variant="primary" size="sm">Platform Administrator</Badge>
      </Box>

      {/* Metrics Grid */}
      <Grid container spacing={2}>
        {metrics.map((m, idx) => (
          <Grid item xs={6} md={3} key={idx}>
            <Card style={{ padding: "16px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px", display: "block" }}>{m.label}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", mt: 0.75, fontFamily: "monospace" }}>{m.count}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", display: "block", mt: 0.5, fontSize: "9px" }}>{m.detail}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Forms & Table Layout */}
      <Grid container spacing={3}>
        {/* Left Column: Form compiler */}
        <Grid item xs={12} lg={5}>
          <Card style={{ padding: "24px" }}>
            <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <PlusCircle size={14} style={{ color: "#FFD700" }} />
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Register Coding Challenge
                </Typography>
              </Box>
            </CardHeader>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "left" }}>
              <Input label="Problem Title" id="adm-title" placeholder="e.g. Find K-th Graph Path" value={title} onChange={(e) => setTitle(e.target.value)} required />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>Difficulty Level</Typography>
                <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} size="small"
                  sx={{ fontSize: "12px", color: "text.primary", backgroundColor: "background.paper", "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" }, "& .MuiSelect-icon": { color: "text.secondary" } }}>
                  {["Easy", "Medium", "Hard"].map(d => <MenuItem key={d} value={d} sx={{ fontSize: "12px" }}>{d}</MenuItem>)}
                </Select>
              </Box>

              {typeof TextArea === "function" ? (
                <TextArea label="Problem Description (Markdown supported)" id="adm-desc" placeholder="Describe constraints and input details..." value={description} onChange={(e) => setDescription(e.target.value)} required />
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>Problem Description</Typography>
                  <Box component="textarea" rows={4} placeholder="Describe constraints and input details..." value={description} onChange={(e) => setDescription(e.target.value)} required
                    sx={{ backgroundColor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: "8px", p: 1.5, fontSize: "12px", color: "text.primary", resize: "vertical", fontFamily: "inherit", "&:focus": { outline: "none", borderColor: "primary.main" } }} />
                </Box>
              )}

              <Input label="Topic Tags (comma-separated)" id="adm-tags" value={tags} onChange={(e) => setTags(e.target.value)} required />
              <Input label="Target Companies (comma-separated)" id="adm-comp" value={companies} onChange={(e) => setCompanies(e.target.value)} required />

              <Button type="submit" style={{ width: "100%", fontWeight: "bold", marginTop: "8px" }}>
                Deploy Challenge
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Right Column: Problems review logs */}
        <Grid item xs={12} lg={7}>
          <Card style={{ padding: "20px" }}>
            <CardHeader style={{ marginBottom: "16px", paddingBottom: "8px" }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Recently Registered Challenges
              </Typography>
            </CardHeader>

            <Box sx={{ overflowX: "auto" }}>
              <Box component="table" sx={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <Box component="thead">
                  <Box component="tr" sx={{ borderBottom: "1px solid rgba(44,44,44,0.6)", backgroundColor: "rgba(26,26,26,0.25)" }}>
                    {[{ label: "ID", align: "center" }, { label: "Title" }, { label: "Difficulty" }, { label: "Moderations", align: "right" }].map(h => (
                      <Box key={h.label} component="th" sx={{ py: 1.25, px: 2, fontSize: "10px", fontWeight: "bold", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase", textAlign: h.align || "left" }}>
                        {h.label}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {problems.slice(0, 10).map((p) => (
                    <Box component="tr" key={p.id} sx={{ borderBottom: "1px solid rgba(44,44,44,0.3)", transition: "background-color 0.2s", "&:hover": { backgroundColor: "rgba(26,26,26,0.2)" } }}>
                      <Box component="td" sx={{ py: 1.25, px: 2, textAlign: "center", fontFamily: "monospace", color: "text.secondary", fontSize: "12px" }}>{p.id}</Box>
                      <Box component="td" sx={{ py: 1.25, px: 2, fontWeight: "bold", color: "text.primary", fontSize: "12px" }}>{p.title}</Box>
                      <Box component="td" sx={{ py: 1.25, px: 2, fontWeight: "bold", color: difficultyColor[p.difficulty], fontSize: "12px" }}>{p.difficulty}</Box>
                      <Box component="td" sx={{ py: 1.25, px: 2, textAlign: "right" }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.75 }}>
                          <ButtonBase sx={{ p: 0.5, borderRadius: "4px", border: "1px solid", borderColor: "divider", backgroundColor: "background.card", color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                            <Eye size={12} />
                          </ButtonBase>
                          <ButtonBase sx={{ p: 0.5, borderRadius: "4px", border: "1px solid", borderColor: "divider", backgroundColor: "background.card", color: "#D32F2F", "&:hover": { backgroundColor: "rgba(211,47,47,0.1)" } }}>
                            <Trash2 size={12} />
                          </ButtonBase>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AdminDashboard;
