import React, { useState, useMemo } from "react";
import { Search, Trophy, Medal, Shield } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";

export const Leaderboard = () => {
  const { users } = useApp();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("weekly");

  const filteredUsers = useMemo(() => {
    return users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));
  }, [users, search]);

  const medalColors = ["#F59E0B", "#D4D4D8", "#92400E"];

  const getRankBadge = (rank) => {
    if (rank === 1) return <Trophy size={16} style={{ color: "#F59E0B", fill: "#F59E0B" }} />;
    if (rank === 2) return <Medal size={16} style={{ color: "#D4D4D8", fill: "#D4D4D8" }} />;
    if (rank === 3) return <Medal size={16} style={{ color: "#B45309", fill: "#B45309" }} />;
    return <span style={{ fontFamily: "monospace", color: "#A1A1AA", fontWeight: "bold", fontSize: "12px" }}>{rank}</span>;
  };

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Platform Leaderboards</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          See how you match up against top competitors globally.
        </Typography>
      </Box>

      {/* Top 3 Competitor Highlights */}
      <Grid container spacing={2}>
        {users.slice(0, 3).map((user, idx) => (
          <Grid item xs={12} md={4} key={user.id}>
            <Card style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", height: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={user.avatar}
                    alt={user.username}
                    sx={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "background.card", border: "1px solid", borderColor: "divider" }}
                  />
                  <Box sx={{
                    position: "absolute", bottom: -6, right: -6, width: 24, height: 24, borderRadius: "50%",
                    backgroundColor: "background.paper", border: "1px solid", borderColor: "divider",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Trophy size={12} style={{ color: medalColors[idx] }} />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", mt: 1.5, display: "flex", alignItems: "center", gap: 0.5 }}>
                  {user.username}
                  {user.role === "admin" && <Shield size={12} style={{ color: "#FFD700" }} />}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.25, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Rank {idx + 1}
                </Typography>
              </Box>
              <Divider sx={{ width: "100%", my: 2, borderColor: "rgba(44,44,44,0.3)" }} />
              <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%", fontSize: "12px", color: "text.secondary" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontFamily: "monospace" }}>{user.rating}</Typography>
                  <Typography variant="caption" sx={{ fontSize: "9px" }}>Rating</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontFamily: "monospace" }}>{user.solvedCount}</Typography>
                  <Typography variant="caption" sx={{ fontSize: "9px" }}>Solved</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Leaderboard Table */}
      <Card style={{ padding: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: 2, mb: 3 }}>
          {/* Tabs */}
          <Box sx={{ display: "flex", backgroundColor: "background.card", p: 0.5, borderRadius: "8px", border: "1px solid", borderColor: "divider", width: "fit-content", fontSize: "12px" }}>
            {["weekly", "monthly"].map(tab => (
              <ButtonBase key={tab} onClick={() => setActiveTab(tab)}
                sx={{
                  px: 2, py: 0.75, borderRadius: "6px", fontWeight: "bold", fontSize: "12px",
                  backgroundColor: activeTab === tab ? "primary.main" : "transparent",
                  color: activeTab === tab ? "background.default" : "text.secondary",
                  transition: "all 0.2s",
                  "&:hover": { color: activeTab === tab ? "background.default" : "text.primary" },
                }}>
                {tab === "weekly" ? "Weekly Sprint" : "Monthly Marathon"}
              </ButtonBase>
            ))}
          </Box>

          {/* Search bar */}
          <Box sx={{ maxWidth: 280, width: "100%" }}>
            <Input
              id="leader-search"
              placeholder="Search competitor..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ overflowX: "auto" }}>
          <Box component="table" sx={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "500px" }}>
            <Box component="thead">
              <Box component="tr" sx={{ borderBottom: "1px solid rgba(44,44,44,0.6)", backgroundColor: "rgba(26,26,26,0.25)" }}>
                {[{ label: "Rank", align: "center" }, { label: "Competitor" }, { label: "Achievements" }, { label: "Solved", align: "center" }, { label: "Contest Rating", align: "right" }].map(h => (
                  <Box key={h.label} component="th" sx={{ py: 1.5, px: 2, fontSize: "10px", fontWeight: "bold", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase", textAlign: h.align || "left" }}>
                    {h.label}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {filteredUsers.length === 0 ? (
                <Box component="tr">
                  <Box component="td" colSpan={5} sx={{ py: 4, textAlign: "center", color: "text.secondary", fontSize: "12px" }}>
                    No competitors match search terms.
                  </Box>
                </Box>
              ) : (
                filteredUsers.slice(0, 50).map((user) => (
                  <Box component="tr" key={user.id} sx={{ borderBottom: "1px solid rgba(44,44,44,0.3)", transition: "background-color 0.2s", "&:hover": { backgroundColor: "rgba(26,26,26,0.2)" } }}>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "center" }}>{getRankBadge(user.rank)}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Box component="img" src={user.avatar} alt={user.username} sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "background.card" }} />
                        <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary" }}>{user.username}</Typography>
                      </Box>
                    </Box>
                    <Box component="td" sx={{ py: 1.5, px: 2 }}>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {user.badges.slice(0, 3).map((b, bIdx) => (
                          <span key={bIdx} title={b.desc} style={{ fontSize: "14px", cursor: "help", userSelect: "none" }}>{b.icon}</span>
                        ))}
                      </Box>
                    </Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "center", color: "text.secondary", fontFamily: "monospace", fontWeight: "medium", fontSize: "12px" }}>{user.solvedCount}</Box>
                    <Box component="td" sx={{ py: 1.5, px: 2, textAlign: "right", color: "#FFD700", fontWeight: "bold", fontFamily: "monospace", fontSize: "12px" }}>{user.rating}</Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default Leaderboard;
