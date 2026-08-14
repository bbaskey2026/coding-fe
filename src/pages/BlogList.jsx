import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, ThumbsUp, PenTool, Edit, Trash2, BookOpen, Rss, Layers } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { blogService } from "../services/blog.service";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const TAG_PRESETS = ["All", "Algorithms", "System Design", "Web Dev", "Interviews", "Career"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export const BlogList = () => {
  const { user } = useAuth();
  const { addNotification } = useApp();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAll();
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to load blog posts:", err);
      addNotification("Error loading blogs", "Please check your network or try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await blogService.delete(id);
      addNotification("Article Deleted", "Your blog post was successfully removed.", "success");
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete post:", err);
      addNotification("Deletion Failed", "You do not have permission or a server error occurred.", "error");
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
      
    const matchesTag = selectedTag === "All" || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  // Featured article (first published post with most claps)
  const featuredPost = filteredPosts.length > 0 
    ? [...filteredPosts].sort((a, b) => b.claps - a.claps)[0]
    : null;

  // Remaining articles
  const secondaryPosts = featuredPost 
    ? filteredPosts.filter(p => p._id !== featuredPost._id)
    : filteredPosts;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        pt: 12,
        pb: 8,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        textAlign: "left",
        position: "relative"
      }}
    >
      {/* Background Graphic */}
      <Box className="pattern-crosshatch" sx={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.2 }} />

      {/* Header Area */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 2, zIndex: 1 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary", display: "flex", alignItems: "center", gap: 1.5 }}>
            <Rss size={28} /> CodeX86 Articles
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Insights, tutorials, and interview prep shared by the developer community.
          </Typography>
        </Box>
        <Button 
          variant="primary" 
          icon={PenTool} 
          onClick={() => navigate("/blogs/write")}
          sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}
        >
          Write Article
        </Button>
      </Box>

      {/* Filters & Search Toolbar */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, alignItems: "center", zIndex: 1 }}>
        <Box sx={{ flex: 1, display: "flex", gap: 1.5, width: "100%", position: "relative" }}>
          <Input
            placeholder="Search articles by title, tags, or summaries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
            sx={{
              width: "100%",
              "& .MuiInputBase-root": {
                height: 48,
                backgroundColor: "background.paper",
                borderRadius: "10px",
              }
            }}
          />
        </Box>

        {/* Preset Tag Chips */}
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", width: "100%", py: 0.5, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {TAG_PRESETS.map(tag => (
            <Box
              key={tag}
              onClick={() => setSelectedTag(tag)}
              sx={{
                px: 2,
                py: 1,
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "20px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                backgroundColor: selectedTag === tag ? "text.primary" : "background.paper",
                color: selectedTag === tag ? "background.paper" : "text.secondary",
                border: "1.5px solid",
                borderColor: selectedTag === tag ? "text.primary" : "divider",
                transition: "all 0.2s",
                "&:hover": {
                  color: "text.primary",
                  borderColor: "text.primary",
                  backgroundColor: "rgba(128, 128, 128, 0.05)"
                }
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={10}>
          <CircularProgress color="primary" />
        </Box>
      ) : filteredPosts.length === 0 ? (
        /* Empty State */
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 12, border: "1px dashed", borderColor: "divider", borderRadius: "12px", backgroundColor: "background.paper", zIndex: 1 }}>
          <BookOpen size={48} style={{ color: "#A1A1AA", marginBottom: "16px" }} />
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "text.primary" }}>No articles found</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5 }}>Try altering your search text or selected category filter.</Typography>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setSelectedTag("All"); }} sx={{ mt: 2 }}>
            Reset Filters
          </Button>
        </Box>
      ) : (
        <Box sx={{ zIndex: 1 }}>
          {/* Spotlight Featured Article */}
          {featuredPost && selectedTag === "All" && !search && (
            <Box component={motion.div} variants={itemVariants} sx={{ mb: 5 }}>
              <Link to={`/blogs/${featuredPost._id}`} style={{ textDecoration: "none" }}>
                <Card
                  className="glow-accent"
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "16px",
                    cursor: "pointer",
                    backgroundColor: "background.paper",
                    minHeight: { md: 320 }
                  }}
                >
                  {/* Cover Image */}
                  <Box
                    sx={{
                      width: { xs: "100%", md: "45%" },
                      minHeight: { xs: 200, md: "auto" },
                      background: featuredPost.coverImage 
                        ? `url(${featuredPost.coverImage}) center/cover no-repeat`
                        : "linear-gradient(135deg, #18181B 0%, #27272A 100%)",
                      position: "relative",
                      borderRight: { md: "1px solid" },
                      borderColor: { md: "divider" }
                    }}
                  >
                    {!featuredPost.coverImage && (
                      <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 1 }}>
                        <Layers size={24} />
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>CodeX86 Editorial</Typography>
                      </Box>
                    )}
                    <Box sx={{ position: "absolute", top: 12, left: 12 }}>
                      <Badge variant="primary">Spotlight Post</Badge>
                    </Box>
                  </Box>

                  {/* Content Panel */}
                  <Box sx={{ p: { xs: 3, md: 4 }, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Box>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
                        {featuredPost.tags && featuredPost.tags.slice(0, 3).map(t => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </Box>

                      <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", mb: 1.5, "&:hover": { color: "text.primary" }, transition: "color 0.2s" }}>
                        {featuredPost.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "text.secondary", lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 3 }}>
                        {featuredPost.summary}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar src={featuredPost.authorAvatar} alt={featuredPost.authorName} sx={{ width: 36, height: 36, border: "1px solid", borderColor: "divider" }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontSize: "13px" }}>{featuredPost.authorName}</Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", fontSize: "11px" }}>{formatDate(featuredPost.createdAt)}</Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 3, color: "text.secondary" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "12px" }}>
                          <ThumbsUp size={14} style={{ color: featuredPost.claps > 0 ? "text.primary" : "inherit" }} />
                          <span>{featuredPost.claps} claps</span>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "12px" }}>
                          <Clock size={14} />
                          <span>{featuredPost.readingTime} min</span>
                        </Box>

                        {/* Author quick actions */}
                        {(user && (user.id === featuredPost.authorId || user.role === "admin")) && (
                          <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                            <IconButton 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/blogs/edit/${featuredPost._id}`); }}
                              sx={{ p: 0.75, color: "text.secondary", "&:hover": { color: "text.primary" } }}
                            >
                              <Edit size={14} />
                            </IconButton>
                            <IconButton 
                              onClick={(e) => handleDeletePost(featuredPost._id, e)}
                              sx={{ p: 0.75, color: "text.secondary", "&:hover": { color: "#EF4444" } }}
                            >
                              <Trash2 size={14} />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Link>
            </Box>
          )}

          {/* Grid Layout for other posts */}
          <Grid container spacing={3}>
            {secondaryPosts.map(post => (
              <Grid item xs={12} sm={6} md={4} key={post._id} component={motion.div} variants={itemVariants}>
                <Link to={`/blogs/${post._id}`} style={{ textDecoration: "none" }}>
                  <Card
                    className="glow-accent"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "12px",
                      cursor: "pointer",
                      backgroundColor: "background.paper",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)" }
                    }}
                  >
                    {/* Cover Art */}
                    <Box
                      sx={{
                        height: 180,
                        background: post.coverImage 
                          ? `url(${post.coverImage}) center/cover no-repeat`
                          : "linear-gradient(135deg, #18181B 0%, #27272A 100%)",
                        position: "relative",
                        borderBottom: "1px solid",
                        borderColor: "divider"
                      }}
                    >
                      {!post.coverImage && (
                        <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 1 }}>
                          <Layers size={18} />
                          <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px" }}>CodeX86 Tech Blog</Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Meta info */}
                    <Box sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Box>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                          {post.tags && post.tags.slice(0, 2).map(t => (
                            <Badge key={t} variant="secondary">{t}</Badge>
                          ))}
                        </Box>

                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "text.primary", mb: 1, lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", "&:hover": { color: "text.primary" } }}>
                          {post.title}
                        </Typography>

                        <Typography variant="caption" sx={{ color: "text.secondary", lineClamp: 3, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 2 }}>
                          {post.summary}
                        </Typography>
                      </Box>

                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <Avatar src={post.authorAvatar} alt={post.authorName} sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontSize: "11px" }}>{post.authorName}</Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", fontSize: "9px" }}>{formatDate(post.createdAt)}</Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 1, borderColor: "divider" }} />

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "text.secondary" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "11px" }}>
                              <ThumbsUp size={12} style={{ color: post.claps > 0 ? "text.primary" : "inherit" }} />
                              <span>{post.claps}</span>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "11px" }}>
                              <Clock size={12} />
                              <span>{post.readingTime} min</span>
                            </Box>
                          </Box>

                          {/* Quick Actions */}
                          {(user && (user.id === post.authorId || user.role === "admin")) && (
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <IconButton 
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/blogs/edit/${post._id}`); }}
                                sx={{ p: 0.5, color: "text.secondary", "&:hover": { color: "text.primary" } }}
                              >
                                <Edit size={12} />
                              </IconButton>
                              <IconButton 
                                onClick={(e) => handleDeletePost(post._id, e)}
                                sx={{ p: 0.5, color: "text.secondary", "&:hover": { color: "#EF4444" } }}
                              >
                                <Trash2 size={12} />
                              </IconButton>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

// Quick helper component for icon button
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

export default BlogList;
