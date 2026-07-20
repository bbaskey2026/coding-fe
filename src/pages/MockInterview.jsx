import React, { useState, useEffect } from "react";
import { Play, Volume2, Star, Clock, Trophy, CheckCircle, HelpCircle, Activity } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

export const MockInterview = () => {
  const { addNotification, triggerConfettiEffect } = useApp();

  // Mock Session States: setup | active | feedback
  const [sessionState, setSessionState] = useState("setup");
  const [difficulty, setDifficulty] = useState("Medium");
  const [topic, setTopic] = useState("Arrays");
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      handleFinishSession();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleStartSession = () => {
    setTimeLeft(2700);
    setSessionState("active");
    setTimerActive(true);
    addNotification("Mock Session Started", `Good luck! You have 45 minutes to solve this ${difficulty} level ${topic} challenge.`, "info");
  };

  const handleFinishSession = () => {
    setTimerActive(false);
    setSessionState("feedback");
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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Mock Interview Simulator</h2>
        <p className="text-xs text-text-secondary mt-1">Practice coding challenges under time constraints with interviewer prompts.</p>
      </div>

      {sessionState === "setup" && (
        <Card className="p-8 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <Trophy size={36} className="text-primary mx-auto mb-3" />
            <h3 className="text-base font-extrabold text-text-primary">Configure Mock Session</h3>
            <p className="text-xs text-text-secondary mt-1">Select focus parameters to match upcoming loops.</p>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary">Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2">
                {["Easy", "Medium", "Hard"].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 rounded-lg border text-xs font-semibold cursor-pointer text-center transition-all ${
                      difficulty === diff
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary">Topic Category</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-surface border border-border text-text-primary text-xs rounded-lg px-3 py-2 cursor-pointer w-full focus:outline-none"
              >
                <option value="Arrays">Arrays & Hashing</option>
                <option value="DP">Dynamic Programming</option>
                <option value="Graphs">Graph Networks</option>
                <option value="Trees">Binary Trees</option>
              </select>
            </div>

            <Button onClick={handleStartSession} className="w-full py-2.5 mt-4 font-semibold">
              Start Mock Interview
            </Button>
          </div>
        </Card>
      )}

      {sessionState === "active" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question Details pane */}
          <Card className="lg:col-span-2 p-6 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Badge variant="primary" size="sm">Mock: {topic}</Badge>
                <div className="text-xs font-bold text-danger font-mono flex items-center gap-1">
                  <Clock size={14} /> {formatTime(timeLeft)}
                </div>
              </div>

              <h3 className="text-base font-bold text-text-primary">Design a dynamic network data caching system</h3>
              <p className="text-xs text-text-secondary mt-3 leading-relaxed font-light">
                Implement a data structure supporting <code>insert(key, val)</code>, <code>get(key)</code>, and <code>delete(key)</code> operations in average <code>O(1)</code> time. The cache must automatically evict least recently read nodes once limits are reached.
              </p>
            </div>

            <div className="border-t border-border/40 pt-4 mt-6 flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={playAudioPrompt} className="gap-1.5 text-xs font-semibold">
                <Volume2 size={14} /> Audio Prompt
              </Button>
              <Button variant="danger" size="sm" onClick={handleFinishSession} className="font-semibold text-xs">
                Finish Interview
              </Button>
            </div>
          </Card>

          {/* Interview Checklist and Tips */}
          <Card className="p-5">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Interviewer Notes Checklist</h3>
            </CardHeader>
            <ul className="flex flex-col gap-3.5 text-xs text-text-secondary font-light">
              <li className="flex items-start gap-2.5">
                <input type="checkbox" className="mt-0.5 rounded border-border text-primary" />
                <span>Explain brute-force complexity before coding.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <input type="checkbox" className="mt-0.5 rounded border-border text-primary" />
                <span>Verify pointer boundaries and empty array inputs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <input type="checkbox" className="mt-0.5 rounded border-border text-primary" />
                <span>Dry run code with sample input variables out loud.</span>
              </li>
            </ul>
          </Card>
        </div>
      )}

      {sessionState === "feedback" && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Core rating stats */}
          <Card className="p-6 text-center flex flex-col justify-between items-center">
            <div>
              <Trophy size={36} className="text-yellow-500 mb-4 animate-bounce" />
              <h3 className="text-base font-extrabold text-text-primary">Performance Assessment</h3>
              <p className="text-[10px] text-text-secondary mt-1 uppercase tracking-widest">Calculated Score</p>
              
              <div className="text-5xl font-extrabold text-primary font-mono mt-6">84%</div>
            </div>

            <Button variant="outline" size="sm" onClick={() => setSessionState("setup")} className="w-full mt-8 font-semibold">
              Return to Setup
            </Button>
          </Card>

          {/* Feedback logs details */}
          <Card className="md:col-span-2 p-6 text-left">
            <CardHeader className="mb-4 pb-2">
              <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider">Interviewer Evaluation Report</h3>
            </CardHeader>
            
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-primary">Code Correctness & Complexity</span>
                <span className="font-mono font-bold text-success">90%</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/30 pt-3">
                <span className="font-semibold text-text-primary">Communication & Out-Loud Logic</span>
                <span className="font-mono font-bold text-success">85%</span>
              </div>
              <div className="flex justify-between items-center border-t border-border/30 pt-3">
                <span className="font-semibold text-text-primary">Time efficiency & Edge Handling</span>
                <span className="font-mono font-bold text-warning">75%</span>
              </div>

              <div className="border-t border-border/40 my-3" />

              <div className="flex flex-col gap-2">
                <h4 className="font-bold text-text-primary">Candidate Feedback Checklist:</h4>
                <div className="flex items-start gap-2.5 text-text-secondary font-light">
                  <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                  <span>Excellent logic design. Handled clean LRU cache updates correctly.</span>
                </div>
                <div className="flex items-start gap-2.5 text-text-secondary font-light">
                  <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                  <span>Great communication out loud. Walked through list nodes before editing.</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
export default MockInterview;
