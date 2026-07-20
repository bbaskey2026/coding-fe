import React, { useState, useMemo } from "react";
import { MessageSquare, ArrowUp, Send, User, ChevronRight, PlusCircle, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";

export const Discussion = () => {
  const { forumPosts, upvoteForumPost, addForumComment, userProfile } = useApp();

  // Search & Category states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // All | General | Career | Tutorials
  
  // Selected post detail viewer
  const [selectedPostId, setSelectedPostId] = useState(1);

  // New Post Modal State
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [newPostText, setNewPostText] = useState("");

  // Detailed comment submit state
  const [replyText, setReplyText] = useState("");

  const activePost = forumPosts.find(p => p.id === selectedPostId) || forumPosts[0];

  const filteredPosts = useMemo(() => {
    return forumPosts.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [forumPosts, search, selectedCategory]);

  const handlePostCreate = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostText.trim()) return;
    
    // Programmatically push to forum list
    forumPosts.unshift({
      id: Date.now(),
      title: newPostTitle,
      category: newPostCategory,
      upvotes: 1,
      repliesCount: 0,
      author: userProfile.username,
      authorAvatar: userProfile.avatar,
      date: "Just now",
      comments: []
    });

    setNewPostTitle("");
    setNewPostText("");
    setNewPostOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addForumComment(activePost.id, replyText);
    setReplyText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Community Forum</h2>
          <p className="text-xs text-text-secondary mt-1">Discuss algorithms, share loops, and debate architecture patterns.</p>
        </div>
        <Button size="sm" className="font-semibold gap-1.5" onClick={() => setNewPostOpen(true)}>
          <PlusCircle size={14} /> New Post
        </Button>
      </div>

      {/* Grid: Lists & Detailed Thread split view */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Side: Category tabs & Posts Feed */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="p-4 flex flex-col gap-3">
            <Input
              id="forum-search"
              placeholder="Search discussions..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="border-t border-border/40 my-1" />

            <div className="flex flex-col gap-1 text-xs">
              <span className="text-[10px] font-bold text-text-secondary uppercase px-2 mb-1.5">Categories</span>
              {["All", "General", "Career", "Tutorials", "Feedback"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-card/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Card>

          {/* Posts Feed list */}
          <div className="flex flex-col gap-2.5">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`p-3.5 border rounded-xl flex gap-3 text-left cursor-pointer transition-all ${
                  selectedPostId === post.id
                    ? "bg-surface border-primary"
                    : "bg-card/45 border-border hover:border-text-secondary/50"
                }`}
              >
                {/* Upvotes Column */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      upvoteForumPost(post.id);
                    }}
                    className={`p-1 rounded hover:bg-card cursor-pointer ${post.hasUpvoted ? "text-primary" : "text-text-secondary"}`}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <span className="text-[10px] font-bold text-text-primary font-mono">{post.upvotes}</span>
                </div>

                {/* Content info */}
                <div className="flex-1 min-w-0">
                  <Badge size="sm" className="mb-1.5">{post.category}</Badge>
                  <h4 className="text-xs font-bold text-text-primary truncate">{post.title}</h4>
                  <div className="text-[9px] text-text-secondary mt-1.5 flex items-center gap-1.5">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.repliesCount} replies</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Comment Thread view */}
        <div className="lg:col-span-3">
          {activePost ? (
            <Card className="p-6">
              {/* Header */}
              <div className="pb-4 border-b border-border/40 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="primary" size="sm">{activePost.category}</Badge>
                  <span className="text-[10px] text-text-secondary font-mono">{activePost.date}</span>
                </div>
                <h3 className="text-base font-extrabold text-text-primary leading-snug">{activePost.title}</h3>
                
                <div className="flex items-center gap-2.5 mt-4">
                  <img src={activePost.authorAvatar} alt={activePost.author} className="w-6 h-6 rounded-full bg-card" />
                  <span className="text-xs text-text-primary font-medium">{activePost.author}</span>
                </div>
              </div>

              {/* Main content body */}
              <div className="text-xs text-text-secondary leading-relaxed font-light whitespace-pre-wrap mb-8">
                {activePost.content || "Join the conversation below and share your code or optimization strategy for this thread."}
              </div>

              {/* Replies Console */}
              <div className="border-t border-border/40 pt-5">
                <h4 className="text-xs font-bold text-text-primary mb-4 flex items-center gap-1.5">
                  <MessageSquare size={14} /> Responses ({activePost.comments.length})
                </h4>

                {/* Submit Comment */}
                <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Type your reply to this competitor thread..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 bg-card border border-border rounded-lg text-xs px-3.5 py-2.5 focus:outline-none"
                  />
                  <Button type="submit" size="sm" className="font-semibold gap-1">
                    Reply <Send size={12} />
                  </Button>
                </form>

                {/* Comments List */}
                <div className="flex flex-col gap-3.5">
                  {activePost.comments.length === 0 ? (
                    <div className="text-center text-xs text-text-secondary py-6 font-light">
                      No replies yet. Share your thoughts to kickstart this discussion!
                    </div>
                  ) : (
                    activePost.comments.map((comm) => (
                      <div key={comm.id} className="p-3 border border-border/40 bg-card/20 rounded-xl flex gap-3">
                        <img src={comm.avatar} alt={comm.author} className="w-6.5 h-6.5 rounded-full bg-card border" />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-text-primary">{comm.author}</span>
                            <span className="text-[9px] text-text-secondary">Just now</span>
                          </div>
                          <p className="text-xs text-text-secondary font-light mt-1 leading-relaxed">{comm.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <div className="glass p-12 text-center text-xs text-text-secondary rounded-xl">
              Select a thread on the left to read conversations
            </div>
          )}
        </div>
      </div>

      {/* New Post Creator Modal */}
      <Modal isOpen={newPostOpen} onClose={() => setNewPostOpen(false)} title="Create New Forum Thread">
        <form onSubmit={handlePostCreate} className="flex flex-col gap-4">
          <Input
            label="Thread Title"
            id="post-title"
            placeholder="e.g. Tips to optimize DP memoization tables"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="post-cat" className="text-xs font-semibold text-text-secondary">Category</label>
            <select
              id="post-cat"
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value)}
              className="bg-surface border border-border text-text-primary text-xs rounded-lg px-3 py-2 cursor-pointer focus:outline-none"
            >
              <option value="General">General</option>
              <option value="Career">Career</option>
              <option value="Tutorials">Tutorials</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="post-desc" className="text-xs font-semibold text-text-secondary">Body Content</label>
            <textarea
              id="post-desc"
              rows={4}
              placeholder="Describe your question or share your insights..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              className="w-full bg-surface border border-border text-text-primary text-xs rounded-lg p-3 resize-none focus:outline-none"
              required
            />
          </div>

          <Button type="submit" className="w-full py-2.5 mt-2 font-semibold">
            Publish Thread
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default Discussion;
