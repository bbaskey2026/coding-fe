import React, { useState, useMemo } from "react";
import { MessageSquare, ArrowUp, Send, PlusCircle, Search } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

export const Discussion = () => {
  const { forumPosts, upvoteForumPost, addForumComment, userProfile } = useApp();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPostId, setSelectedPostId] = useState(1);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [newPostText, setNewPostText] = useState("");
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
    forumPosts.unshift({ id: Date.now(), title: newPostTitle, category: newPostCategory, upvotes: 1, repliesCount: 0, author: userProfile.username, authorAvatar: userProfile.avatar, date: "Just now", comments: [] });
    setNewPostTitle(""); setNewPostText(""); setNewPostOpen(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addForumComment(activePost.id, replyText);
    setReplyText("");
  };

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { sm: "center" }, gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Community Forum</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
            Discuss algorithms, share loops, and debate architecture patterns.
          </Typography>
        </Box>
        <Button size="sm" onClick={() => setNewPostOpen(true)} style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
          <PlusCircle size={14} /> New Post
        </Button>
      </Box>

      {/* Grid: Lists & Detailed Thread split view */}
      <Grid container spacing={3}>
        {/* Left Side: Category tabs & Posts Feed */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Card style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <Input id="forum-search" placeholder="Search discussions..." icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} />
              <Divider sx={{ borderColor: "rgba(44,44,44,0.4)" }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", px: 1, mb: 0.75, display: "block", fontSize: "10px" }}>Categories</Typography>
                {["All", "General", "Career", "Tutorials", "Feedback"].map((cat) => (
                  <ButtonBase key={cat} onClick={() => setSelectedCategory(cat)}
                    sx={{
                      width: "100%", textAlign: "left", px: 1.25, py: 1, borderRadius: "8px", fontSize: "12px",
                      color: selectedCategory === cat ? "primary.main" : "text.secondary",
                      backgroundColor: selectedCategory === cat ? "rgba(212,175,55,0.1)" : "transparent",
                      fontWeight: selectedCategory === cat ? "bold" : "normal",
                      transition: "all 0.2s",
                      "&:hover": { color: "text.primary", backgroundColor: "rgba(26,26,26,0.4)" },
                    }}>
                    {cat}
                  </ButtonBase>
                ))}
              </Box>
            </Card>

            {/* Posts Feed */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              {filteredPosts.map((post) => (
                <Box key={post.id} onClick={() => setSelectedPostId(post.id)}
                  sx={{
                    p: 1.75, border: "1px solid", borderRadius: "12px", display: "flex", gap: 1.5, textAlign: "left", cursor: "pointer", transition: "all 0.2s",
                    borderColor: selectedPostId === post.id ? "primary.main" : "divider",
                    backgroundColor: selectedPostId === post.id ? "background.paper" : "rgba(26,26,26,0.45)",
                    "&:hover": { borderColor: selectedPostId === post.id ? "primary.main" : "rgba(161,161,170,0.5)" },
                  }}>
                  {/* Upvotes Column */}
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <ButtonBase onClick={(e) => { e.stopPropagation(); upvoteForumPost(post.id); }}
                      sx={{ p: 0.5, borderRadius: "4px", color: post.hasUpvoted ? "primary.main" : "text.secondary", "&:hover": { backgroundColor: "rgba(26,26,26,0.8)" } }}>
                      <ArrowUp size={14} />
                    </ButtonBase>
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", fontFamily: "monospace", fontSize: "10px" }}>{post.upvotes}</Typography>
                  </Box>

                  {/* Content info */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ mb: 0.75 }}><Badge size="sm">{post.category}</Badge></Box>
                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75, fontSize: "9px", color: "text.secondary" }}>
                      <span>By {post.author}</span><span>•</span><span>{post.repliesCount} replies</span>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Right Side: Detailed Comment Thread view */}
        <Grid item xs={12} lg={8}>
          {activePost ? (
            <Card style={{ padding: "24px" }}>
              {/* Header */}
              <Box sx={{ pb: 2, borderBottom: "1px solid rgba(44,44,44,0.4)", mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                  <Badge variant="primary" size="sm">{activePost.category}</Badge>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "10px" }}>{activePost.date}</Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.3 }}>{activePost.title}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 2 }}>
                  <Box component="img" src={activePost.authorAvatar} alt={activePost.author} sx={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "background.card" }} />
                  <Typography variant="caption" sx={{ color: "text.primary", fontWeight: "medium" }}>{activePost.author}</Typography>
                </Box>
              </Box>

              {/* Main content body */}
              <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.6, fontWeight: "light", display: "block", whiteSpace: "pre-wrap", mb: 4 }}>
                {activePost.content || "Join the conversation below and share your code or optimization strategy for this thread."}
              </Typography>

              {/* Replies Console */}
              <Box sx={{ borderTop: "1px solid rgba(44,44,44,0.4)", pt: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 2 }}>
                  <MessageSquare size={14} style={{ color: "#FFFFFF" }} />
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary" }}>Responses ({activePost.comments.length})</Typography>
                </Box>

                {/* Submit Comment */}
                <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <InputBase
                    placeholder="Type your reply to this competitor thread..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    sx={{
                      flex: 1, backgroundColor: "background.card", border: "1px solid", borderColor: "divider", borderRadius: "8px",
                      px: 1.75, py: 1.25, fontSize: "12px", color: "text.primary",
                      "&:focus-within": { borderColor: "primary.main" },
                    }}
                  />
                  <Button type="submit" size="sm" style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "4px" }}>
                    Reply <Send size={12} />
                  </Button>
                </Box>

                {/* Comments List */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
                  {activePost.comments.length === 0 ? (
                    <Typography variant="caption" sx={{ textAlign: "center", color: "text.secondary", py: 3, display: "block", fontWeight: "light" }}>
                      No replies yet. Share your thoughts to kickstart this discussion!
                    </Typography>
                  ) : (
                    activePost.comments.map((comm) => (
                      <Box key={comm.id} sx={{ p: 1.5, border: "1px solid rgba(44,44,44,0.4)", backgroundColor: "rgba(26,26,26,0.2)", borderRadius: "12px", display: "flex", gap: 1.5 }}>
                        <Box component="img" src={comm.avatar} alt={comm.author} sx={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: "background.card", border: "1px solid", borderColor: "divider" }} />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.primary" }}>{comm.author}</Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "9px" }}>Just now</Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: "light", mt: 0.5, lineHeight: 1.5, display: "block" }}>{comm.text}</Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </Card>
          ) : (
            <Box className="glass" sx={{ p: 6, textAlign: "center", fontSize: "12px", color: "text.secondary", borderRadius: "12px" }}>
              Select a thread on the left to read conversations
            </Box>
          )}
        </Grid>
      </Grid>

      {/* New Post Creator Modal */}
      <Modal isOpen={newPostOpen} onClose={() => setNewPostOpen(false)} title="Create New Forum Thread">
        <Box component="form" onSubmit={handlePostCreate} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Input label="Thread Title" id="post-title" placeholder="e.g. Tips to optimize DP memoization tables" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} required />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>Category</Typography>
            <Select id="post-cat" value={newPostCategory} onChange={(e) => setNewPostCategory(e.target.value)} size="small"
              sx={{ fontSize: "12px", color: "text.primary", backgroundColor: "background.paper", "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" } }}>
              {["General", "Career", "Tutorials", "Feedback"].map(c => <MenuItem key={c} value={c} sx={{ fontSize: "12px" }}>{c}</MenuItem>)}
            </Select>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary" }}>Body Content</Typography>
            <InputBase component="textarea" id="post-desc" rows={4} placeholder="Describe your question or share your insights..."
              value={newPostText} onChange={(e) => setNewPostText(e.target.value)} required multiline
              sx={{ backgroundColor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: "8px", p: 1.5, fontSize: "12px", color: "text.primary", resize: "none" }}
            />
          </Box>

          <Button type="submit" style={{ width: "100%", fontWeight: "bold", marginTop: "8px" }}>
            Publish Thread
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default Discussion;
