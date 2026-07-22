import React, { useState } from "react";
import { Award, ShieldCheck, Download, ExternalLink } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

export const Certificates = () => {
  const { studyPlans, userProfile, addNotification } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState("interview_150");

  const activePlan = studyPlans.find(p => p.id === selectedPlanId) || studyPlans[0];

  const handleDownload = () => {
    addNotification("Certificate Downloaded", "Verified PDF certificate dispatched successfully.", "success");
  };

  const handleShare = () => {
    addNotification("Credential Link Copied", "Verification URL copied to your system clipboard.", "info");
  };

  return (
    <Box sx={{ maxWidth: "1024px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Accomplishment Certificates</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Claim shareable, cryptographically signed verification credentials for completed plans.
        </Typography>
      </Box>

      <Grid container spacing={3} alignItems="stretch">
        {/* Left Side: selection catalog */}
        <Grid item xs={12} lg={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", display: "block", fontSize: "10px" }}>
              Select Completed Plan
            </Typography>
            {studyPlans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <ButtonBase key={plan.id} onClick={() => setSelectedPlanId(plan.id)}
                  sx={{
                    width: "100%", p: 1.5, border: "1px solid", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "left", transition: "all 0.2s",
                    borderColor: isSelected ? "primary.main" : "divider",
                    backgroundColor: isSelected ? "rgba(212,175,55,0.1)" : "background.card",
                    color: isSelected ? "primary.main" : "text.secondary",
                    "&:hover": { color: isSelected ? "primary.main" : "text.primary" },
                  }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: "bold", display: "block" }}>{plan.title}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "9px", mt: 0.25, display: "block" }}>Cred Code: CF-{plan.id.toUpperCase()}</Typography>
                  </Box>
                  <Award size={14} style={{ color: isSelected ? "#D4AF37" : "#A1A1AA" }} />
                </ButtonBase>
              );
            })}
          </Box>
        </Grid>

        {/* Right Side: High Fidelity Certificate View */}
        <Grid item xs={12} lg={9}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Card style={{ padding: "4px", backgroundColor: "#09090b", border: "1px solid #3F3F46", borderRadius: "16px", position: "relative", boxShadow: "0 25px 50px rgba(0,0,0,0.8)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Certificate frame with border */}
              <Box sx={{
                border: "6px double rgba(180,120,30,0.6)", borderRadius: "12px",
                p: { xs: 4, sm: 6 }, width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", backgroundColor: "#09090b", position: "relative", my: 0.5,
              }}>
                {/* Corner brackets */}
                {[{ top: 12, left: 12, bt: "2px", bl: "2px", bb: 0, br: 0 }, { top: 12, right: 12, bt: "2px", br: "2px", bb: 0, bl: 0 }, { bottom: 12, left: 12, bb: "2px", bl: "2px", bt: 0, br: 0 }, { bottom: 12, right: 12, bb: "2px", br: "2px", bt: 0, bl: 0 }].map((corners, i) => (
                  <Box key={i} sx={{ position: "absolute", width: 32, height: 32, borderColor: "rgba(180,120,30,0.5)", borderStyle: "solid", borderTopWidth: corners.bt || 0, borderLeftWidth: corners.bl || 0, borderBottomWidth: corners.bb || 0, borderRightWidth: corners.br || 0, ...corners }} />
                ))}

                {/* Title Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#D4AF37", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "10px", fontWeight: "bold" }}>
                  <ShieldCheck size={14} style={{ color: "#F59E0B" }} />
                  <span>CodeX86 Verification Credentials</span>
                </Box>

                <Typography variant="h5" sx={{ fontFamily: "Georgia, serif", fontWeight: 800, color: "#F59E0B", mt: { xs: 3, sm: 5 } }}>
                  Certificate of Completion
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", mt: 1, fontStyle: "italic", display: "block" }}>
                  This document officially certifies that
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", borderBottom: "1px solid rgba(44,44,44,0.4)", pb: 0.5, px: 5, mt: 2, letterSpacing: "0.05em" }}>
                  {userProfile.username}
                </Typography>

                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", maxWidth: 380, mt: 2, lineHeight: 1.6, display: "block" }}>
                  has successfully compiled all assert scenarios, solved programming exercises, and completed modules inside the track
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.primary", mt: 1.5 }}>
                  {activePlan?.title}
                </Typography>

                {/* Seal */}
                <Box sx={{ mt: { xs: 4, sm: 6 }, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: 380, textAlign: "left" }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: "bold", display: "block", fontSize: "8px" }}>Verification Code</Typography>
                    <Typography variant="caption" sx={{ color: "text.primary", fontFamily: "monospace", fontWeight: "bold", display: "block" }}>CERT-{activePlan?.id.toUpperCase()}-A49</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", display: "block", mt: 0.25, fontSize: "8px" }}>Signed on July 2026</Typography>
                  </Box>

                  <Box sx={{ position: "relative", width: 56, height: 56 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: "50%", border: "4px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#000", fontSize: "9px", boxShadow: "0 0 15px rgba(245,158,11,0.5)" }}>
                        CF
                      </Box>
                    </Box>
                    <Box sx={{ position: "absolute", bottom: -12, left: "33%", width: 10, height: 24, backgroundColor: "rgba(180,120,30,0.6)", transform: "rotate(12deg)", zIndex: -1 }} />
                    <Box sx={{ position: "absolute", bottom: -12, right: "33%", width: 10, height: 24, backgroundColor: "rgba(180,120,30,0.6)", transform: "rotate(-12deg)", zIndex: -1 }} />
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Action triggers */}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button onClick={handleDownload} style={{ flex: 1, fontWeight: "bold", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <Download size={14} /> Download PDF
              </Button>
              <Button variant="outline" onClick={handleShare} style={{ flex: 1, fontWeight: "bold", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <ExternalLink size={14} /> Share Link
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Certificates;
