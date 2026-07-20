import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, Target, CheckCircle2, ChevronRight, Play, BookCheck, ShieldAlert } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Button } from "../components/ui/Button";

export const StudyPlans = () => {
  const { studyPlans, problems, userProfile } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState("interview_150");

  const activePlan = studyPlans.find(plan => plan.id === selectedPlanId) || studyPlans[0];

  // Helper to compile progress metrics for each plan
  const getPlanProgress = (plan) => {
    let solvedCount = 0;
    let totalCount = 0;
    
    plan.modules.forEach(mod => {
      mod.problems.forEach(probId => {
        totalCount++;
        if (userProfile.solvedProblemsList.includes(probId)) {
          solvedCount++;
        }
      });
    });
    
    return { solvedCount, totalCount };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Curated Study Plans</h2>
        <p className="text-xs text-text-secondary mt-1">Accelerate your training with structured node roadmap tracks.</p>
      </div>

      {/* Plans Picker grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {studyPlans.map((plan) => {
          const { solvedCount, totalCount } = getPlanProgress(plan);
          const isSelected = plan.id === selectedPlanId;
          
          return (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`p-5 cursor-pointer relative border transition-all ${
                isSelected
                  ? "bg-surface border-primary shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "bg-card border-border/80"
              }`}
            >
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Roadmap Track</span>
                <h3 className="text-sm font-bold text-text-primary">{plan.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed font-light">{plan.description}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] text-text-secondary font-semibold mb-1">
                    <span>Progress</span>
                    <span>{solvedCount} / {totalCount} Solved</span>
                  </div>
                  <ProgressBar value={solvedCount} max={totalCount} size="sm" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Roadmap Modules Timeline details */}
      <div className="grid lg:grid-cols-3 gap-6 mt-4">
        {/* Modules Progression Tree */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex justify-between items-center pb-3 border-b border-border/40 mb-6">
              <h3 className="text-sm font-bold text-text-primary">{activePlan.title} Roadmap Modules</h3>
              <Link to={`/certificates`}>
                <Button size="sm" variant="outline" className="text-xs gap-1.5 font-semibold">
                  <Award size={14} className="text-accent" /> View Certificate
                </Button>
              </Link>
            </div>

            {/* Timelines list */}
            <div className="flex flex-col gap-8 relative pl-4 border-l-2 border-border/60">
              {activePlan.modules.map((mod, mIdx) => (
                <div key={mIdx} className="relative flex flex-col gap-4 text-left">
                  {/* Timeline point indicator */}
                  <div className="absolute -left-[25px] top-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center border-4 border-bg" />
                  
                  <div>
                    <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest">{mod.name}</h4>
                    <span className="text-[10px] text-text-secondary font-medium">Module {mIdx + 1}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {mod.problems.map((probId) => {
                      const p = problems.find(prob => prob.id === probId);
                      if (!p) return null;
                      
                      const isSolved = userProfile.solvedProblemsList.includes(probId);
                      
                      return (
                        <div
                          key={probId}
                          className="flex items-center justify-between p-3.5 bg-card/45 border border-border/60 rounded-xl hover:border-primary/50 transition-all hover:bg-card group"
                        >
                          <div className="flex items-center gap-3">
                            {isSolved ? (
                              <CheckCircle2 size={16} className="text-success shrink-0" />
                            ) : (
                              <Play size={14} className="text-text-secondary/50 shrink-0" />
                            )}
                            <div>
                              <div className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors">{p.title}</div>
                              <div className="text-[10px] text-text-secondary mt-1 flex items-center gap-1.5">
                                <span className={
                                  p.difficulty === "Easy" ? "text-success font-semibold" : p.difficulty === "Medium" ? "text-warning font-semibold" : "text-danger font-semibold"
                                }>{p.difficulty}</span>
                                <span>•</span>
                                <span>Acceptance: {p.acceptance}</span>
                              </div>
                            </div>
                          </div>

                          <Link to={`/problems/${p.id}`}>
                            <Button size="sm" variant="ghost" className="px-2">
                              Solve <ChevronRight size={14} />
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Roadmap metrics & highlights */}
        <div className="flex flex-col gap-6 h-full">
          <Card className="p-5 text-left">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-4">Milestones & Perks</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <BookCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-text-primary">Unlock Certificate</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed font-light">
                    Complete 100% of the modules in this path to unlock a verifiable preparation certificate.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                  <Target size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-text-primary">Target Practice</h4>
                  <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed font-light">
                    These problems are explicitly weighted by FAANG interview loop frequency data.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default StudyPlans;
