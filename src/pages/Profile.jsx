import React from "react";
import { Link } from "react-router-dom";
import { Award, Target, Trophy, Bookmark, Shield, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Heatmap } from "../components/ui/Heatmap";

export const Profile = () => {
  const { userProfile, problems, bookmarkedProblemIds, bookmarkedExperienceIds, interviewExperiences } = useApp();

  const totalSolved = userProfile.solvedProblemsList.length;
  const solvedEasy = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Easy").length;
  const solvedMedium = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Medium").length;
  const solvedHard = problems.filter(p => userProfile.solvedProblemsList.includes(p.id) && p.difficulty === "Hard").length;

  const bookmarkedProblems = problems.filter(p => bookmarkedProblemIds.includes(p.id));
  const bookmarkedExps = interviewExperiences.filter(exp => bookmarkedExperienceIds.includes(exp.id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      {/* Profile Header card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img src={userProfile.avatar} alt={userProfile.username} className="w-20 h-20 rounded-xl bg-card border border-border" />
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="text-xl font-bold text-text-primary">{userProfile.username}</h2>
              {userProfile.role === "admin" && (
                <Badge variant="primary" size="sm" className="gap-1">
                  <Shield size={10} /> Administrator
                </Badge>
              )}
            </div>
            <p className="text-xs text-text-secondary mt-1 font-light">Senior Frontend Developer & Preparation Enthusiast</p>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mt-4">
              {userProfile.badges.map((b) => (
                <span
                  key={b.id}
                  title={b.desc}
                  className="px-2.5 py-1 bg-card border border-border/80 text-[10px] font-bold rounded-lg text-text-primary flex items-center gap-1.5 cursor-help"
                >
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 border-t sm:border-t-0 sm:border-l border-border/30 pt-4 sm:pt-0 sm:pl-6 text-center">
            <div>
              <div className="text-2xl font-extrabold text-text-primary font-mono">{totalSolved}</div>
              <div className="text-[10px] text-text-secondary uppercase">Challenges Solved</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-accent font-mono">{userProfile.rating}</div>
              <div className="text-[10px] text-text-secondary uppercase">Contest Points</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Heatmap Section */}
      <Heatmap data={userProfile.heatmap} />

      {/* Grid: Solved metrics & Achievements List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Difficulties Solve Progress */}
        <div className="flex flex-col gap-6">
          <Card className="p-5 text-left">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Solve Metrics</h3>
            </CardHeader>
            <div className="flex flex-col gap-3.5 mt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-success font-semibold">Easy Problems</span>
                  <span className="font-mono">{solvedEasy} solved</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: `${(solvedEasy / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-warning font-semibold">Medium Problems</span>
                  <span className="font-mono">{solvedMedium} solved</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: `${(solvedMedium / 50) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-danger font-semibold">Hard Problems</span>
                  <span className="font-mono">{solvedHard} solved</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-danger rounded-full" style={{ width: `${(solvedHard / 15) * 100}%` }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements List */}
        <div className="lg:col-span-2">
          <Card className="p-5 text-left">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Unlocked Achievements</h3>
            </CardHeader>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {userProfile.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 border rounded-xl flex items-start gap-3 ${
                    ach.unlocked
                      ? "bg-card border-primary/20 text-text-primary"
                      : "bg-card/20 border-border/40 text-text-secondary/60"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg border ${
                    ach.unlocked ? "bg-primary/10 border-primary/20 text-primary" : "bg-zinc-800/40 border-zinc-800 text-zinc-600"
                  }`}>
                    <Trophy size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary">{ach.name}</h4>
                    <p className="text-[10px] text-text-secondary mt-0.5 leading-relaxed font-light">{ach.desc}</p>
                    <span className="text-[9px] font-semibold mt-1 inline-block">
                      {ach.unlocked ? "✓ Active" : "Locked"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bookmarks Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bookmarked Problems */}
        <Card className="p-5 text-left">
          <CardHeader className="mb-3 pb-2">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Bookmarked Challenges</h3>
            <Bookmark size={14} className="text-text-secondary" />
          </CardHeader>
          <div className="flex flex-col gap-2 mt-2">
            {bookmarkedProblems.length === 0 ? (
              <div className="text-center text-xs text-text-secondary py-6">No saved problems found. Click bookmark icons inside workspace pages!</div>
            ) : (
              bookmarkedProblems.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-card/40 border border-border/40 hover:border-primary/50 transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-text-primary">{p.title}</div>
                    <span className="text-[9px] text-text-secondary">Difficulty: {p.difficulty}</span>
                  </div>
                  <Link to={`/problems/${p.id}`}>
                    <Button size="sm" variant="ghost" className="px-2">
                      <ChevronRight size={14} />
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Bookmarked Experiences */}
        <Card className="p-5 text-left">
          <CardHeader className="mb-3 pb-2">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Saved Interview Logs</h3>
            <Bookmark size={14} className="text-text-secondary" />
          </CardHeader>
          <div className="flex flex-col gap-2 mt-2">
            {bookmarkedExps.length === 0 ? (
              <div className="text-center text-xs text-text-secondary py-6">No saved interview experiences. Bookmark company reports!</div>
            ) : (
              bookmarkedExps.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-card/40 border border-border/40 hover:border-primary/50 transition-colors"
                >
                  <div>
                    <div className="text-xs font-semibold text-text-primary">{exp.company} Loop</div>
                    <span className="text-[9px] text-text-secondary">Verdict: {exp.verdict}</span>
                  </div>
                  <Link to={`/interviews`}>
                    <Button size="sm" variant="ghost" className="px-2">
                      <ChevronRight size={14} />
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Profile;
