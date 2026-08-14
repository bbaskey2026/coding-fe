import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ThumbsUp, Clock, Calendar, PenTool, Edit, Trash2, Send, MessageSquare, Tag, Bookmark } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { blogService } from "../services/blog.service";
import { renderRichContent } from "../utils/blogRenderer";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

export const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addNotification } = useApp();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [clapsEffect, setClapsEffect] = useState([]); // Array for floating numbers

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const data = await blogService.getById(id);
      setPost(data);
    } catch (err) {
      console.error("Failed to load post details:", err);
      addNotification("Error", "Could not find the requested blog post.", "error");
      navigate("/blogs");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const data = await blogService.getComments(id);
      setComments(data || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
    fetchComments();
  }, [id]);

  const handleClap = async () => {
    if (!user) {
      addNotification("Authentication required", "Please login to applaud this article.", "info");
      return;
    }
    
    // Add floating clap effect ID
    const newEffectId = Date.now();
    setClapsEffect(prev => [...prev, newEffectId]);
    setTimeout(() => {
      setClapsEffect(prev => prev.filter(eid => eid !== newEffectId));
    }, 1000);

    // Optimistic update
    const clappedByList = post.clappedBy || [];
    const alreadyClapped = clappedByList.includes(user.id);
    setPost(prev => {
      const prevClappedBy = prev.clappedBy || [];
      return {
        ...prev,
        claps: alreadyClapped ? Math.max(0, prev.claps - 1) : prev.claps + 1,
        clappedBy: alreadyClapped 
          ? prevClappedBy.filter(uid => uid !== user.id)
          : [...prevClappedBy, user.id]
      };
    });

    try {
      const data = await blogService.clap(post._id);
      // Sync with final server response
      setPost(prev => ({
        ...prev,
        claps: data.claps,
        clappedBy: data.clappedBy
      }));
    } catch (err) {
      console.error("Failed to register clap:", err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) {
      addNotification("Authentication Required", "Please log in to leave comments.", "info");
      return;
    }

    try {
      setSubmittingComment(true);
      const data = await blogService.addComment(post._id, { content: commentText });
      setComments(prev => [data, ...prev]);
      setCommentText("");
      addNotification("Comment Posted", "Your response has been recorded.", "success");
    } catch (err) {
      console.error("Failed to add comment:", err);
      addNotification("Failed to post comment", "Server error, please try again.", "error");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment permanently?")) return;

    try {
      await blogService.deleteComment(commentId);
      setComments(prev => prev.filter(c => c._id !== commentId));
      addNotification("Comment Removed", "Successfully deleted comment.", "success");
    } catch (err) {
      console.error("Failed to delete comment:", err);
      addNotification("Failed to delete comment", "Unauthorized or server error.", "error");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Delete this article permanently?")) return;

    try {
      await blogService.delete(post._id);
      addNotification("Article Deleted", "Your blog post was successfully removed.", "success");
      navigate("/blogs");
    } catch (err) {
      console.error("Failed to delete post:", err);
      addNotification("Deletion Failed", "Unauthorized or server error.", "error");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!post) return null;

  const isAuthor = user && (user.id === post.authorId || user.role === "admin");
  const userHasClapped = user && (post.clappedBy || []).includes(user.id);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        maxWidth: "800px",
        mx: "auto",
        px: { xs: 2, sm: 3 },
        pt: 12,
        pb: 10,
        textAlign: "left",
        position: "relative"
      }}
    >
      {/* Decorative patterns */}
      <Box className="pattern-dots" sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 300, pointerEvents: "none", opacity: 0.1 }} />

      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        icon={ChevronLeft}
        onClick={() => navigate("/blogs")}
        sx={{ mb: 4, color: "text.secondary" }}
      >
        Back to articles
      </Button>

      {/* Article Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {post.tags && post.tags.map(t => (
            <Badge key={t} variant="secondary">
              <Tag size={10} style={{ marginRight: 4 }} />
              {t}
            </Badge>
          ))}
        </Box>

        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            color: "text.primary", 
            lineHeight: 1.25, 
            letterSpacing: "-0.5px",
            fontSize: { xs: "2rem", sm: "2.5rem" },
            mb: 2 
          }}
        >
          {post.title}
        </Typography>

        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: "text.secondary", 
            fontSize: "1.1rem", 
            fontWeight: 400, 
            lineHeight: 1.5, 
            mb: 3 
          }}
        >
          {post.summary}
        </Typography>

        {/* Author / Date Meta */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2, pb: 3, borderBottom: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar src={post.authorAvatar} alt={post.authorName} sx={{ width: 44, height: 44, border: "1px solid", borderColor: "divider" }} />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.primary", fontSize: "14px" }}>{post.authorName}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, color: "text.secondary", fontSize: "12px", mt: 0.25 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Calendar size={12} />
                  <span>{formatDate(post.createdAt)}</span>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Clock size={12} />
                  <span>{post.readingTime} min read</span>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Quick Edit/Delete Actions */}
          {isAuthor && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outline"
                size="sm"
                icon={Edit}
                onClick={() => navigate(`/blogs/edit/${post._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Trash2}
                onClick={handleDeletePost}
                sx={{ color: "#EF4444", borderColor: "rgba(239, 68, 68, 0.3)", "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.05)" } }}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Cover Image */}
      {post.coverImage && (
        <Box
          component="img"
          src={post.coverImage}
          alt={post.title}
          sx={{
            width: "100%",
            maxHeight: 450,
            objectFit: "cover",
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "divider",
            mb: 5
          }}
        />
      )}

      {/* Article Content (Medium typography) */}
      <Box 
        sx={{ 
          color: "text.primary",
          fontSize: "1.1rem",
          lineHeight: 1.8,
          fontFamily: "Georgia, serif", // Medium signature style
          mb: 6,
          "& p": { mb: 2.5 },
          "& a": { color: "text.primary", textDecoration: "underline" },
          "& iframe": { width: "100%", minHeight: { xs: 260, sm: 400 }, borderRadius: "12px", border: "1px solid", borderColor: "divider", margin: "24px 0" },
          "& video, & audio": { width: "100%", borderRadius: "8px", margin: "24px 0" },
          "& code": { backgroundColor: "rgba(128, 128, 128, 0.1)", px: 1, py: 0.5, borderRadius: "4px", fontSize: "0.9em", fontFamily: "monospace", color: "text.primary" }
        }}
        dangerouslySetInnerHTML={{ __html: renderRichContent(post.content) }}
      />

      <Divider sx={{ mb: 4, borderColor: "divider" }} />

      {/* Footer Clap / Interaction Toolbar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 6, zIndex: 2 }}>
        <Box sx={{ position: "relative" }}>
          {/* Floating Clap Particles */}
          <AnimatePresence>
            {clapsEffect.map(eid => (
              <motion.span
                key={eid}
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -48, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute",
                  top: -24,
                  left: 12,
                  color: "text.primary",
                  fontWeight: "bold",
                  fontSize: "14px",
                  pointerEvents: "none"
                }}
              >
                +1
              </motion.span>
            ))}
          </AnimatePresence>

          <Button
            variant={userHasClapped ? "primary" : "outline"}
            size="md"
            icon={ThumbsUp}
            onClick={handleClap}
            sx={{
              borderRadius: "50px",
              px: 2.5,
              py: 1,
              borderColor: userHasClapped ? "text.primary" : "divider",
              backgroundColor: userHasClapped ? "rgba(128, 128, 128, 0.15)" : "transparent",
              color: userHasClapped ? "text.primary" : "text.secondary",
              "& .lucide-thumbs-up": { fill: userHasClapped ? "currentColor" : "none" },
              "&:hover": {
                borderColor: "text.primary",
                backgroundColor: "rgba(128, 128, 128, 0.05)",
                color: "text.primary"
              }
            }}
          >
            {post.claps} {post.claps === 1 ? "Clap" : "Claps"}
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary", fontSize: "14px" }}>
          <MessageSquare size={16} />
          <span>{comments.length} responses</span>
        </Box>
      </Box>

      {/* Comments / Responses Segment */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mb: 3 }}>
          Responses ({comments.length})
        </Typography>

        {/* Comment input form */}
        {user ? (
          <Box component="form" onSubmit={handleAddComment} sx={{ mb: 4 }}>
            <TextField
              placeholder="What are your thoughts on this?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              multiline
              rows={3}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  backgroundColor: "background.paper",
                  borderColor: "divider",
                  borderRadius: "10px",
                }
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={submittingComment}
                disabled={!commentText.trim()}
                icon={Send}
              >
                Respond
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 3, border: "1px dashed", borderColor: "divider", borderRadius: "10px", textAlign: "center", backgroundColor: "background.paper", mb: 4 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Please <Link to="/auth?mode=login" style={{ color: "var(--mui-palette-text-primary)", fontWeight: "bold", textDecoration: "underline" }}>sign in</Link> to share your response.
            </Typography>
          </Box>
        )}

        {/* Comments Feed */}
        {commentsLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress size={24} color="primary" />
          </Box>
        ) : comments.length === 0 ? (
          <Typography variant="caption" sx={{ display: "block", color: "text.secondary", py: 4, textAlign: "center" }}>
            No responses yet. Be the first to share your thoughts!
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {comments.map((comment) => {
              const isCommentOwner = user && (user.id === comment.authorId || user.role === "admin" || user.id === post.authorId);
              return (
                <Box 
                  key={comment._id} 
                  sx={{ 
                    p: 2.5, 
                    borderRadius: "12px", 
                    backgroundColor: "background.paper", 
                    border: "1px solid", 
                    borderColor: "divider" 
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={comment.authorAvatar} alt={comment.authorName} sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontSize: "12px" }}>{comment.authorName}</Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "9px" }}>{formatDate(comment.createdAt)}</Typography>
                      </Box>
                    </Box>

                    {isCommentOwner && (
                      <IconButton 
                        onClick={() => handleDeleteComment(comment._id)}
                        sx={{ p: 0.5, color: "text.secondary", "&:hover": { color: "#EF4444" } }}
                      >
                        <Trash2 size={12} />
                      </IconButton>
                    )}
                  </Box>

                  <Typography variant="body2" sx={{ color: "text.primary", fontSize: "13px", lineHeight: 1.5, pl: 0.25 }}>
                    {comment.content}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Internal icon button
const IconButton = ({ children, onClick, sx, ...props }) => {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        transition: "all 0.2s",
        "&:hover": { backgroundColor: "background.card" },
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BlogDetails;
