import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, FileText, ChevronLeft, Eye, PenTool, Image, Tag, Plus, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { blogService } from "../services/blog.service";
import { renderRichContent } from "../utils/blogRenderer";

// MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const PRESET_COVERS = [
  { name: "Sleek Dark Fluid", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80" },
  { name: "Vibrant Retro", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=80" },
  { name: "Glassmorphic 3D", url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1000&auto=format&fit=crop&q=80" },
  { name: "Minimalist Waves", url: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=1000&auto=format&fit=crop&q=80" }
];

const SUGGESTED_TAGS = ["Algorithms", "System Design", "Web Dev", "Interviews", "Career", "React", "NodeJS", "Database"];

export const BlogWrite = () => {
  const { id } = useParams(); // post ID if editing
  const { user } = useAuth();
  const { addNotification } = useApp();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("published");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [activeTab, setActiveTab] = useState("edit"); // edit | preview
  
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const loadPostDetails = async () => {
        try {
          setFetching(true);
          const post = await blogService.getById(id);
          
          // Verify authority
          if (post.authorId !== user.id && user.role !== "admin") {
            addNotification("Access Denied", "You are not authorized to edit this article.", "error");
            navigate("/blogs");
            return;
          }

          setTitle(post.title);
          setSummary(post.summary);
          setContent(post.content);
          setCoverImage(post.coverImage || "");
          setStatus(post.status || "published");
          setTags(post.tags || []);
        } catch (err) {
          console.error("Failed to fetch blog post details:", err);
          addNotification("Error", "Could not fetch details for editing.", "error");
          navigate("/blogs");
        } finally {
          setFetching(false);
        }
      };
      
      loadPostDetails();
    }
  }, [id, isEditMode]);

  const handleAddTag = (tagToAdd) => {
    const trimmed = tagToAdd.trim();
    if (!trimmed) return;
    
    // Capitalize first letter or store lowercase
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    if (!tags.includes(formatted)) {
      setTags(prev => [...prev, formatted]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !content.trim()) {
      addNotification("Validation Error", "Title, summary, and content are required.", "error");
      return;
    }

    const payload = {
      title,
      summary,
      content,
      coverImage,
      status,
      tags
    };

    try {
      setSaving(true);
      let response;
      if (isEditMode) {
        response = await blogService.update(id, payload);
        addNotification("Article Updated", "Your changes have been saved.", "success");
      } else {
        response = await blogService.create(payload);
        addNotification("Article Published", "Your post is now live!", "success");
      }
      navigate(`/blogs/${response._id}`);
    } catch (err) {
      console.error("Failed to save post:", err);
      addNotification("Error", "Failed to save the article. Please check input parameters.", "error");
    } finally {
      setSaving(false);
    }
  };

  const selectPresetCover = (url) => {
    setCoverImage(url);
    addNotification("Cover Selected", "Preset background image pre-filled.", "info");
  };

  if (fetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      sx={{
        maxWidth: "960px",
        mx: "auto",
        px: { xs: 2, sm: 3 },
        pt: 12,
        pb: 10,
        textAlign: "left",
        position: "relative"
      }}
    >
      {/* Decorative patterns */}
      <Box className="pattern-dots" sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 200, pointerEvents: "none", opacity: 0.1 }} />

      {/* Back navigation */}
      <Button
        variant="ghost"
        size="sm"
        icon={ChevronLeft}
        onClick={() => navigate(isEditMode ? `/blogs/${id}` : "/blogs")}
        sx={{ mb: 4, color: "text.secondary" }}
      >
        Cancel
      </Button>

      {/* Page Title */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "text.primary" }}>
            {isEditMode ? "Edit Article" : "Write a new story"}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Create articles to share details, experiences, and notes with other developers.
          </Typography>
        </Box>

        {/* Tab Controls (Edit / Live Preview) */}
        <Box sx={{ display: "flex", gap: 0.5, border: "1px solid", borderColor: "divider", borderRadius: "8px", p: 0.5, backgroundColor: "background.paper" }}>
          <Box
            onClick={() => setActiveTab("edit")}
            sx={{
              px: 2,
              py: 0.75,
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: activeTab === "edit" ? "rgba(212, 175, 55, 0.15)" : "transparent",
              color: activeTab === "edit" ? "primary.main" : "text.secondary",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              transition: "all 0.2s"
            }}
          >
            <PenTool size={12} /> Edit
          </Box>
          <Box
            onClick={() => setActiveTab("preview")}
            sx={{
              px: 2,
              py: 0.75,
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: activeTab === "preview" ? "rgba(212, 175, 55, 0.15)" : "transparent",
              color: activeTab === "preview" ? "primary.main" : "text.secondary",
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              transition: "all 0.2s"
            }}
          >
            <Eye size={12} /> Preview
          </Box>
        </Box>
      </Box>

      {activeTab === "edit" ? (
        /* EDIT PANEL */
        <Box component="form" onSubmit={handlePublish} sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
          {/* Main Title Input */}
          <TextField
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            fullWidth
            required
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "2.25rem",
                fontWeight: 800,
                color: "var(--mui-palette-text-primary)"
              }
            }}
            sx={{
              "& input": { py: 1 },
              borderBottom: "1px solid",
              borderColor: "divider"
            }}
          />

          {/* Summary Input */}
          <TextField
            placeholder="Write a brief summary of what this article covers..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            variant="standard"
            fullWidth
            required
            multiline
            rows={2}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "1.1rem",
                color: "var(--mui-palette-text-secondary)",
                lineHeight: 1.5
              }
            }}
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              pb: 1
            }}
          />

          {/* Cover Image Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
              <Image size={14} /> Cover Image
            </Typography>
            <Input
              placeholder="Paste custom cover image URL here..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  height: 44,
                  backgroundColor: "background.paper",
                  borderRadius: "8px",
                }
              }}
            />
            {/* Preset covers grid */}
            <Box>
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
                Or select one of our premium preset background gradients:
              </Typography>
              <Grid container spacing={1.5}>
                {PRESET_COVERS.map(cover => (
                  <Grid item xs={6} sm={3} key={cover.name}>
                    <Box
                      onClick={() => selectPresetCover(cover.url)}
                      sx={{
                        height: 60,
                        borderRadius: "8px",
                        background: `url(${cover.url}) center/cover no-repeat`,
                        border: "2px solid",
                        borderColor: coverImage === cover.url ? "primary.main" : "transparent",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": { opacity: 0.85, transform: "scale(1.02)" }
                      }}
                    >
                      <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.6)", py: 0.25, px: 0.5, textAlign: "center" }}>
                        <Typography variant="caption" sx={{ fontSize: "8.5px", fontWeight: "bold", color: "#FFF", whiteSpace: "nowrap" }}>
                          {cover.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Tags Manager */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
              <Tag size={14} /> Tags & Categories
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: "8px", backgroundColor: "background.paper", minHeight: 48 }}>
              {tags.map(t => (
                <Box
                  key={t}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: "11px",
                    fontWeight: "bold",
                    borderRadius: "15px",
                    backgroundColor: "background.card",
                    color: "text.primary",
                    border: "1px solid",
                    borderColor: "divider",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75
                  }}
                >
                  <span>{t}</span>
                  <X size={10} style={{ cursor: "pointer", color: "red" }} onClick={() => handleRemoveTag(t)} />
                </Box>
              ))}

              <input
                type="text"
                placeholder="Type tag & press enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyPress}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  background: "transparent",
                  color: "var(--mui-palette-text-primary)",
                  flex: 1,
                  minWidth: 150
                }}
              />
            </Box>

            {/* Quick suggested tags list */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {SUGGESTED_TAGS.filter(t => !tags.includes(t)).map(t => (
                <Box
                  key={t}
                  onClick={() => handleAddTag(t)}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: "10px",
                    borderRadius: "15px",
                    border: "1px dashed",
                    borderColor: "divider",
                    color: "text.secondary",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main",
                      backgroundColor: "rgba(212, 175, 55, 0.05)"
                    }
                  }}
                >
                  <Plus size={10} />
                  <span>{t}</span>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Main Body Content TextArea */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", display: "flex", alignItems: "center", gap: 1 }}>
              <FileText size={14} /> Story Body
            </Typography>
            <TextField
              placeholder="Tell your story... You can use standard formatting or plain text."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              required
              minRows={12}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Georgia, serif", // readable reading font
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  backgroundColor: "background.paper",
                  borderRadius: "10px",
                }
              }}
            />
          </Box>

          {/* Visibility Status Selector */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <FormControl sx={{ minWidth: 160 }}>
              <InputLabel id="status-select-label" sx={{ fontSize: "12px", color: "text.secondary" }}>Visibility Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={status}
                label="Visibility Status"
                onChange={(e) => setStatus(e.target.value)}
                sx={{
                  height: 40,
                  fontSize: "12px",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" }
                }}
              >
                <MenuItem value="published" sx={{ fontSize: "12px" }}>Published (Public)</MenuItem>
                <MenuItem value="draft" sx={{ fontSize: "12px" }}>Draft (Private)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2, borderColor: "divider" }} />

          {/* Submit Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outline"
              onClick={() => navigate(isEditMode ? `/blogs/${id}` : "/blogs")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={saving}
              icon={Save}
            >
              {isEditMode ? "Save changes" : "Publish article"}
            </Button>
          </Box>
        </Box>
      ) : (
        /* PREVIEW PANEL */
        <Box sx={{ p: { xs: 2, sm: 4 }, border: "1px solid", borderColor: "divider", borderRadius: "16px", backgroundColor: "background.paper" }}>
          {coverImage && (
            <Box
              component="img"
              src={coverImage}
              alt="Preview cover"
              sx={{
                width: "100%",
                maxHeight: 350,
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                mb: 4
              }}
            />
          )}

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
            {tags.length === 0 ? (
              <Badge variant="secondary">No tags specified</Badge>
            ) : (
              tags.map(t => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))
            )}
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary", mb: 2, fontSize: { xs: "1.75rem", sm: "2.25rem" } }}>
            {title || "Untitled Draft"}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "1.05rem", mb: 4, fontStyle: "italic" }}>
            {summary || "No summary written yet."}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, pb: 3, borderBottom: "1px solid", borderColor: "divider", mb: 4 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "background.card", border: "1px solid", borderColor: "divider" }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "text.primary", fontSize: "12px" }}>
                {user ? user.username : "Author Name"}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "10px" }}>
                Live preview mode — reading time will auto-calculate
              </Typography>
            </Box>
          </Box>

          <Box 
            sx={{ 
              color: "text.primary",
              fontSize: "1.1rem",
              lineHeight: 1.8,
              fontFamily: "Georgia, serif",
              "& p": { mb: 2.5 },
              "& a": { color: "primary.main", textDecoration: "underline" },
              "& iframe": { width: "100%", minHeight: { xs: 200, sm: 300 }, borderRadius: "12px", border: "1px solid", borderColor: "divider", margin: "24px 0" },
              "& video, & audio": { width: "100%", borderRadius: "8px", margin: "24px 0" },
              "& code": { backgroundColor: "rgba(212, 175, 55, 0.1)", px: 1, py: 0.5, borderRadius: "4px", fontSize: "0.9em", fontFamily: "monospace", color: "primary.main" }
            }}
            dangerouslySetInnerHTML={{ __html: renderRichContent(content || "Start typing in the Edit tab to see your content render here...") }}
          />
        </Box>
      )}
    </Box>
  );
};

export default BlogWrite;
