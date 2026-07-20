import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  ChevronUp,
  Clock,
  Sparkles,
  Terminal
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Card } from "../components/ui/Card";

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

  // Active Left panel tab: description | editorial | discussion
  const [activeTab, setActiveTab] = useState("description");

  // Code editor states
  const [language, setLanguage] = useState("javascript");
  const [editorValue, setEditorValue] = useState("");

  // Sync templates on language change
  useEffect(() => {
    if (problem) {
      const template = problem.templates[language] || `// Template not available\nfunction solve() {\n    // Write code\n}`;
      setEditorValue(template);
    }
  }, [language, problem]);

  // Console Drawer states
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [runLogs, setRunLogs] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [activeTestcaseTab, setActiveTestcaseTab] = useState(0);

  // Success Submission Modal
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Stopwatch Timer
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

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

  // Discussions state
  const [commentText, setCommentText] = useState("");

  // Bookmark checker
  const isBookmarked = bookmarkedProblemIds.includes(problem.id);

  // Compile / Run Code simulation
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

  // Submit Code Simulation
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
    addForumComment(1, commentText); // Seed to first post comments array for mock updates
    setCommentText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-6 flex flex-col gap-4 text-left h-screen">
      {/* Header breadcrumbs */}
      <div className="flex justify-between items-center py-2">
        <Link
          to="/problems"
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>

        <div className="flex items-center gap-3">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleProblemBookmark(problem.id)}
            className="p-1.5 rounded-lg border border-border bg-card text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck size={14} className="text-primary" />
            ) : (
              <Bookmark size={14} />
            )}
          </button>

          {/* Stopwatch */}
          <div className="flex items-center gap-1.5 px-3 py-1 border border-border/80 bg-card rounded-lg text-xs font-semibold text-text-primary font-mono">
            <Clock size={12} className="text-text-secondary" />
            <span>{formatTime(time)}</span>
          </div>
        </div>
      </div>

      {/* Main IDE Splitscreen */}
      <div className="grid lg:grid-cols-2 gap-4 flex-1 min-h-[500px]">
        {/* Left Pane (Tabbed description, editorial, discussion) */}
        <div className="glass rounded-xl border border-border/50 overflow-hidden flex flex-col h-full bg-surface">
          {/* Tab buttons */}
          <div className="flex border-b border-border/40 bg-card/40 text-xs">
            <button
              onClick={() => setActiveTab("description")}
              className={`flex items-center gap-1.5 px-4 py-3 cursor-pointer border-b-2 font-semibold ${
                activeTab === "description"
                  ? "border-primary text-text-primary bg-card/10"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <HelpCircle size={14} /> Description
            </button>
            <button
              onClick={() => setActiveTab("editorial")}
              className={`flex items-center gap-1.5 px-4 py-3 cursor-pointer border-b-2 font-semibold ${
                activeTab === "editorial"
                  ? "border-primary text-text-primary bg-card/10"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <BookOpen size={14} /> Editorial Walkthrough
            </button>
            <button
              onClick={() => setActiveTab("discussion")}
              className={`flex items-center gap-1.5 px-4 py-3 cursor-pointer border-b-2 font-semibold ${
                activeTab === "discussion"
                  ? "border-primary text-text-primary bg-card/10"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              <MessageSquare size={14} /> Community Forum ({problem.discussions.length})
            </button>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 overflow-y-auto p-6 text-sm text-text-secondary leading-relaxed">
            {activeTab === "description" && (
              <div className="flex flex-col gap-4 font-light">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-text-primary">
                    {problem.id}. {problem.title}
                  </h2>
                  <Badge
                    variant={
                      problem.difficulty === "Easy" ? "success" : problem.difficulty === "Medium" ? "warning" : "danger"
                    }
                    size="sm"
                  >
                    {problem.difficulty}
                  </Badge>
                </div>

                <div className="border-t border-border/30 my-2" />

                {/* Body details */}
                <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm text-text-primary font-normal">
                  {problem.description.replace(/###/g, "").replace(/\*\*/g, "")}
                </div>

                {/* Examples */}
                <div className="flex flex-col gap-4 mt-4">
                  {problem.examples.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-card/45 border border-border/50 rounded-lg text-xs">
                      <div className="font-semibold text-text-primary mb-2">Example {idx + 1}:</div>
                      <div className="font-mono flex flex-col gap-1 text-text-secondary">
                        <div>
                          <span className="text-text-primary font-medium">Input:</span> {ex.input}
                        </div>
                        <div>
                          <span className="text-text-primary font-medium">Output:</span> {ex.output}
                        </div>
                        {ex.explanation && (
                          <div className="mt-1 leading-relaxed">
                            <span className="text-text-primary font-medium">Explanation:</span> {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="mt-4">
                  <div className="font-semibold text-text-primary mb-2">Constraints:</div>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx} className="font-mono text-text-secondary">{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Hints Accordion */}
                <div className="mt-6 border-t border-border/30 pt-4">
                  <div className="font-semibold text-text-primary mb-2">Hints:</div>
                  <div className="flex flex-col gap-2">
                    {problem.hints.map((hint, idx) => (
                      <details key={idx} className="group border border-border rounded-lg bg-card/25 p-3 cursor-pointer">
                        <summary className="text-xs font-bold text-text-primary list-none flex justify-between items-center">
                          <span>Hint {idx + 1}</span>
                          <ChevronUp size={12} className="transform group-open:rotate-180 transition-transform" />
                        </summary>
                        <p className="text-xs text-text-secondary mt-2 leading-relaxed font-light">{hint}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "editorial" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-text-primary">Official Editorial Guide</h3>
                <div className="border-t border-border/30 my-2" />
                <div className="text-xs sm:text-sm text-text-primary font-light whitespace-pre-wrap leading-relaxed">
                  {problem.editorial}
                </div>
              </div>
            )}

            {activeTab === "discussion" && (
              <div className="flex flex-col gap-6">
                <h3 className="text-base font-bold text-text-primary">Thread Discussions</h3>
                
                {/* Comment creator */}
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment or solution alternative..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 bg-card border border-border rounded-lg text-xs px-3.5 py-2 focus:outline-none"
                  />
                  <Button type="submit" size="sm">Post</Button>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-4">
                  {problem.discussions.length === 0 ? (
                    <div className="text-center text-xs text-text-secondary py-6">No discussions started. Be the first to comment!</div>
                  ) : (
                    problem.discussions.map((comm) => (
                      <div key={comm.id} className="p-3 border border-border/40 bg-card/20 rounded-lg flex gap-3">
                        <img src={comm.avatar} alt={comm.username} className="w-7 h-7 rounded-full bg-card border" />
                        <div>
                          <div className="flex gap-2 items-center">
                            <span className="text-xs font-bold text-text-primary">{comm.username}</span>
                            <span className="text-[9px] text-text-secondary">{comm.date}</span>
                          </div>
                          <p className="text-xs text-text-secondary font-light mt-1 leading-relaxed">{comm.text}</p>
                          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-text-secondary">
                            <button className="hover:text-primary cursor-pointer">▲ Upvote ({comm.likes})</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (Monaco Editor layout) */}
        <div className="flex flex-col gap-4 h-full">
          <div className="glass rounded-xl border border-border/50 overflow-hidden flex flex-col flex-1 bg-surface">
            {/* Editor toolbar */}
            <div className="flex justify-between items-center bg-card/45 px-4 py-2.5 border-b border-border/40">
              <div className="flex items-center gap-3">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-surface border border-border text-text-primary text-xs rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>

                <button
                  onClick={() => {
                    const template = problem.templates[language];
                    setLanguage(language);
                    setEditorValue(template);
                    addNotification("Editor Reset", "The workspace template has been reset.", "info");
                  }}
                  className="text-[10px] text-text-secondary hover:text-text-primary cursor-pointer hover:underline"
                >
                  Reset Template
                </button>
              </div>

              <div className="text-[10px] text-text-secondary font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span>Compiler Online</span>
              </div>
            </div>

            {/* Monaco Editor Component */}
            <div className="flex-1 w-full bg-[#1e1e1e] relative min-h-[300px]">
              <Editor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                theme="vs-dark"
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
            </div>

            {/* Console output slider */}
            {consoleOpen && (
              <div className="h-48 border-t border-border bg-[#0e0e10] p-4 flex flex-col font-mono text-xs text-left">
                <div className="flex justify-between items-center text-text-secondary border-b border-border/40 pb-2 mb-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <Terminal size={14} /> Compilation Console Logs
                  </span>
                  <button
                    onClick={() => setConsoleOpen(false)}
                    className="hover:text-text-primary text-[10px] uppercase font-bold"
                  >
                    Close
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto whitespace-pre-wrap leading-relaxed text-text-primary">
                  {runLogs}
                </div>
              </div>
            )}

            {/* Footer triggers */}
            <div className="bg-card/45 px-4 py-3 border-t border-border/40 flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConsoleOpen(!consoleOpen)}
                className="text-xs"
              >
                Console
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRunCode}
                  loading={isCompiling}
                  className="font-semibold text-xs"
                >
                  <Play size={12} /> Run Code
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitCode}
                  loading={isCompiling}
                  className="font-semibold text-xs"
                >
                  Submit Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Popup */}
      <Modal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)} title="Solution Verified">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-14 h-14 rounded-full bg-success/10 text-success flex items-center justify-center mb-4">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-base font-extrabold text-text-primary">Assertion Success! 🎉</h3>
          <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            All testcase inputs verified. You solved <strong>{problem.title}</strong> and updated your stats!
          </p>

          <div className="flex gap-3.5 mt-6 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitOpen(false)}
              className="flex-1 text-xs"
            >
              Review Code
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsSubmitOpen(false);
                navigate("/problems");
              }}
              className="flex-1 text-xs"
            >
              Back to Catalog
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ProblemDetails;
