import React, { createContext, useContext, useState, useEffect } from "react";
import { generateMockData } from "../data/mockDataGenerator";
import { useAuth } from "./AuthContext";
import { problemsService } from "../services/problems.service";
import { companyGuidesService } from "../services/companyGuides.service";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(() => generateMockData());
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "dark";
  });

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };
  const [userProfile, setUserProfile] = useState(data.userProfile);
  const [problems, setProblems] = useState([]);
  const [companyGuides, setCompanyGuides] = useState([]);

  // Fetch problems and company guides from backend once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const fetchProblems = async () => {
        try {
          const list = await problemsService.getAll();
          if (list && Array.isArray(list)) {
            setProblems(list);
          }
        } catch (err) {
          console.error("Failed to fetch problems from live backend. Using mock catalog as fallback.", err);
        }
      };

      const fetchCompanyGuides = async () => {
        try {
          const list = await companyGuidesService.getAll();
          if (list && Array.isArray(list)) {
            setCompanyGuides(list);
          }
        } catch (err) {
          console.error("Failed to fetch company guides from live backend.", err);
        }
      };

      fetchProblems();
      fetchCompanyGuides();
    }
  }, [isAuthenticated]);
  const [contests, setContests] = useState(data.contests);
  const [forumPosts, setForumPosts] = useState(data.forumPosts);
  const [interviewExperiences, setInterviewExperiences] = useState(data.interviewExperiences);
  const [studyPlans, setStudyPlans] = useState(data.studyPlans);

  // Markdown Notes State
  const [notes, setNotes] = useState([
    { id: 1, title: "DP Knapsack Templates", content: "# DP Knapsack Templates\n\nStandard 0/1 Knapsack formulation:\n```python\nfor i in range(1, n+1):\n    for w in range(W, -1, -1):\n        dp[w] = max(dp[w], dp[w-weight[i-1]] + value[i-1])\n```", folder: "Dynamic Programming", pinned: true, bookmarked: true },
    { id: 2, title: "Sliding Window Cheatsheet", content: "# Sliding Window Cheatsheet\n\n```javascript\nlet left = 0, right = 0;\nwhile (right < n) {\n    // expand window\n    while (conditionViolated) {\n        // shrink window\n        left++;\n    }\n    right++;\n}\n```", folder: "Patterns", pinned: false, bookmarked: true }
  ]);
  const [folders, setFolders] = useState(["Dynamic Programming", "Patterns", "Graphs", "General Notes"]);

  // Toast Notifications Stack
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Welcome to CodeX86!", message: "Explore challenges, complete roadmap modules, and practice mock interviews.", read: false, date: "Just now", type: "system" },
    { id: 2, title: "New Daily Challenge Active", message: "Solve 'Median of Two Sorted Arrays' today to extend your streak!", read: false, date: "1 hour ago", type: "challenge" }
  ]);

  // UI Interactive Triggers
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(null); // { level: number } or null
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  // Bookmarks lists for problems and experiences
  const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState([2, 3]);
  const [bookmarkedExperienceIds, setBookmarkedExperienceIds] = useState([1]);

  // Streak Timer Simulation
  const [streakActive, setStreakActive] = useState(true);

  // Trigger Confetti helper
  const triggerConfettiEffect = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // 1. Solve a problem (interactivity)
  const solveProblem = (problemId) => {
    // Check if already solved
    if (userProfile.solvedProblemsList.includes(problemId)) {
      addNotification("Problem submitted", "You have already solved this problem! Success verification completed.", "info");
      return;
    }

    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;

    // Update user profile solved list
    const updatedSolvedList = [...userProfile.solvedProblemsList, problemId];
    const updatedAttemptedList = userProfile.attemptedProblemsList.filter(id => id !== problemId);
    
    const newSolvedCount = updatedSolvedList.length;
    const oldSolvedCount = userProfile.solvedProblemsList.length;

    // Build new achievements checking
    const updatedAchievements = userProfile.achievements.map(ach => {
      if (ach.id === "first_solve" && newSolvedCount >= 1) return { ...ach, unlocked: true };
      if (ach.id === "medium_50" && problem.difficulty === "Medium" && newSolvedCount >= 5) return { ...ach, unlocked: true }; // scaled down for easy mock triggers
      if (ach.id === "hard_10" && problem.difficulty === "Hard" && newSolvedCount >= 2) return { ...ach, unlocked: true }; // scaled down
      return ach;
    });

    const hasNewAchievement = updatedAchievements.some((ach, index) => ach.unlocked && !userProfile.achievements[index].unlocked);

    setUserProfile(prev => ({
      ...prev,
      solvedProblemsList: updatedSolvedList,
      attemptedProblemsList: updatedAttemptedList,
      solvedCount: prev.solvedCount + 1,
      streak: prev.streak + 1, // increment streak on success submission
      achievements: updatedAchievements
    }));

    // Trigger Success Level-Up animations dynamically
    triggerConfettiEffect();
    
    // Simulate Level up every 5 problems solved in mock sandbox
    const currentLevel = Math.floor(oldSolvedCount / 5) + 1;
    const nextLevel = Math.floor(newSolvedCount / 5) + 1;
    if (nextLevel > currentLevel) {
      setShowLevelUp({ level: nextLevel });
      addNotification("Level Up! 🎉", `Congratulations! You have reached Coding Level ${nextLevel}!`, "success");
    } else {
      addNotification("Solution Accepted! 🟢", `You solved '${problem.title}' and maintained your ${userProfile.streak + 1}-day streak!`, "success");
    }

    if (hasNewAchievement) {
      addNotification("Achievement Unlocked! 🏆", "Check your profile page to claim your new badge.", "achievement");
    }
  };

  // 2. Attempt a problem (console compilation)
  const attemptProblem = (problemId) => {
    if (userProfile.solvedProblemsList.includes(problemId)) return;
    if (!userProfile.attemptedProblemsList.includes(problemId)) {
      setUserProfile(prev => ({
        ...prev,
        attemptedProblemsList: [...prev.attemptedProblemsList, problemId]
      }));
    }
  };

  // 3. Bookmark problem
  const toggleProblemBookmark = (problemId) => {
    setBookmarkedProblemIds(prev => {
      const isBookmarked = prev.includes(problemId);
      const updated = isBookmarked ? prev.filter(id => id !== problemId) : [...prev, problemId];
      addNotification(
        isBookmarked ? "Removed Bookmark" : "Problem Bookmarked",
        isBookmarked ? "Removed problem from your saved folders." : "Added problem to your bookmarks list.",
        "info"
      );
      return updated;
    });
  };

  // 4. Bookmark interview experiences
  const toggleExperienceBookmark = (expId) => {
    setBookmarkedExperienceIds(prev => {
      const isBookmarked = prev.includes(expId);
      const updated = isBookmarked ? prev.filter(id => id !== expId) : [...prev, expId];
      addNotification(
        isBookmarked ? "Removed Experience" : "Saved Experience",
        isBookmarked ? "Removed experience log from your shortcuts." : "Saved experience log for offline access.",
        "info"
      );
      return updated;
    });
  };

  // 5. Notes manager
  const addNote = (folder, title, content) => {
    const newNote = {
      id: Date.now(),
      title: title || "Untitled Note",
      content: content || "",
      folder: folder || "General Notes",
      pinned: false,
      bookmarked: false
    };
    setNotes(prev => [newNote, ...prev]);
    addNotification("Note Created", `'${newNote.title}' has been saved to folder: ${newNote.folder}.`, "success");
    return newNote;
  };

  const updateNote = (id, fields) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...fields } : n));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    addNotification("Note Deleted", "The note was permanently removed from index.", "info");
  };

  const createFolder = (name) => {
    if (folders.includes(name) || !name.trim()) return;
    setFolders(prev => [...prev, name.trim()]);
    addNotification("Folder Created", `Created folder directory: '${name}'.`, "success");
  };

  // 6. Contest interactions
  const registerForContest = (contestId) => {
    setContests(prev => prev.map(c => {
      if (c.id === contestId) {
        addNotification("Registration Successful", `You are successfully registered for ${c.title}!`, "success");
        return { ...c, registered: true, participants: c.participants + 1 };
      }
      return c;
    }));
  };

  // 7. Forum interactions
  const upvoteForumPost = (postId) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasUpvoted = p.hasUpvoted;
        return {
          ...p,
          upvotes: hasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          hasUpvoted: !hasUpvoted
        };
      }
      return p;
    }));
  };

  const addForumComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: Date.now(),
          author: userProfile.username,
          avatar: userProfile.avatar,
          text: commentText,
          upvotes: 0,
          replies: []
        };
        return {
          ...p,
          repliesCount: p.repliesCount + 1,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
    addNotification("Comment Posted", "Your response has been published to the thread.", "success");
  };

  // 8. Admin interactions (Add new problem)
  const addProblem = (newProblem) => {
    const formatted = {
      id: problems.length + 1,
      title: newProblem.title,
      difficulty: newProblem.difficulty || "Medium",
      acceptance: "100.0%",
      solvedCount: 0,
      companies: newProblem.companies || ["Google"],
      tags: newProblem.tags || ["Arrays"],
      description: newProblem.description || "No description provided.",
      examples: newProblem.examples || [],
      constraints: newProblem.constraints || [],
      templates: {
        javascript: `function solve(input) {\n    // Code here\n}`,
        python: `def solve(input):\n    pass`
      },
      hints: ["Standard constraints apply."],
      editorial: "No editorial yet.",
      discussions: []
    };
    setProblems(prev => [formatted, ...prev]);
    addNotification("Problem Added", `Successfully registered problem ID #${formatted.id}: ${formatted.title}`, "success");
  };

  // 9. Toast Stack Adder
  const addNotification = (title, message, type = "system") => {
    const newNotif = {
      id: Date.now() + Math.random(),
      title,
      message,
      read: false,
      date: "Just now",
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      userProfile,
      setUserProfile,
      problems,
      companyGuides,
      setCompanyGuides,
      contests,
      forumPosts,
      interviewExperiences,
      studyPlans,
      notes,
      folders,
      notifications,
      showConfetti,
      setShowConfetti,
      showLevelUp,
      setShowLevelUp,
      commandPaletteOpen,
      setCommandPaletteOpen,
      bookmarkedProblemIds,
      bookmarkedExperienceIds,
      streakActive,
      setStreakActive,
      solveProblem,
      attemptProblem,
      toggleProblemBookmark,
      toggleExperienceBookmark,
      addNote,
      updateNote,
      deleteNote,
      createFolder,
      registerForContest,
      upvoteForumPost,
      addForumComment,
      addProblem,
      addNotification,
      markAllNotificationsRead,
      triggerConfettiEffect,
      themeMode,
      setThemeMode,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
