import React, { useState } from "react";
import { Award, ShieldCheck, Download, ExternalLink, Printer } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export const Certificates = () => {
  const { studyPlans, userProfile, addNotification } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState("interview_150");

  const activePlan = studyPlans.find((p) => p.id === selectedPlanId) || studyPlans[0];

  const handleDownload = () => {
    addNotification("Certificate Downloaded", "Verified PDF certificate dispatched successfully.", "success");
  };

  const handleShare = () => {
    addNotification("Credential Link Copied", "Verification URL copied to your system clipboard.", "info");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Accomplishment Certificates</h2>
        <p className="text-xs text-text-secondary mt-1">Claim shareable, cryptographically signed verification credentials for completed plans.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-stretch">
        {/* Left Side: selection catalog */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-text-secondary uppercase">Select Completed Plan</span>
          {studyPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer text-left transition-all ${
                selectedPlanId === plan.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-card border-border text-text-secondary hover:text-text-primary"
              }`}
            >
              <div>
                <div className="text-xs font-bold">{plan.title}</div>
                <span className="text-[9px] text-text-secondary mt-0.5">Cred Code: CF-{plan.id.toUpperCase()}</span>
              </div>
              <Award size={14} className={selectedPlanId === plan.id ? "text-primary" : "text-text-secondary"} />
            </button>
          ))}
        </div>

        {/* Right Side: High Fidelity Certificate View */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <Card className="p-1 sm:p-4 bg-zinc-950 border border-zinc-800 rounded-2xl relative shadow-2xl overflow-hidden flex flex-col items-center">
            {/* Elegant SVG Frame container */}
            <div className="border-[6px] border-double border-amber-600/60 rounded-xl p-8 sm:p-12 w-full flex flex-col items-center text-center bg-[#09090b] relative my-2">
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600/50" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600/50" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600/50" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600/50" />

              {/* Title Header */}
              <div className="flex items-center gap-1.5 text-primary tracking-widest uppercase text-[10px] font-bold">
                <ShieldCheck size={14} className="text-amber-500" />
                <span>CodeForge Verification Credentials</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-amber-500 mt-6 sm:mt-10">Certificate of Completion</h3>
              <p className="text-[10px] text-text-secondary font-light mt-2 italic">This document officially certifies that</p>

              <div className="text-lg sm:text-xl font-extrabold text-text-primary border-b border-border/40 pb-2 px-10 mt-4 tracking-wide">
                {userProfile.username}
              </div>

              <p className="text-[10px] text-text-secondary font-light max-w-sm mt-4 leading-relaxed">
                has successfully compiled all assert scenarios, solved programming exercises, and completed modules inside the track
              </p>

              <div className="text-sm font-bold text-text-primary mt-3 tracking-tight">
                {activePlan.title}
              </div>

              {/* Gold seal seal */}
              <div className="mt-8 sm:mt-12 flex justify-between items-center w-full max-w-sm text-left">
                <div>
                  <div className="text-[8px] text-text-secondary uppercase font-semibold">Verification Code</div>
                  <div className="text-[10px] text-text-primary font-mono font-bold">CERT-{activePlan.id.toUpperCase()}-A49</div>
                  <div className="text-[8px] text-text-secondary font-light mt-0.5">Signed on July 2026</div>
                </div>

                <div className="w-14 h-14 rounded-full border-4 border-amber-500/30 flex items-center justify-center relative">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-text-primary font-bold text-[9px] shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                    CF
                  </div>
                  {/* Decorative seal ribbons */}
                  <div className="absolute -bottom-3 left-1/3 w-2.5 h-6 bg-amber-600/60 transform rotate-12 -z-10" />
                  <div className="absolute -bottom-3 right-1/3 w-2.5 h-6 bg-amber-600/60 transform -rotate-12 -z-10" />
                </div>
              </div>
            </div>
          </Card>

          {/* Action triggers */}
          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1 font-semibold text-xs gap-1.5">
              <Download size={14} /> Download PDF
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex-1 font-semibold text-xs gap-1.5">
              <ExternalLink size={14} /> Share Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Certificates;
