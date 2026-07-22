import React, { useState } from "react";
import { Folder, FileText, Plus, Pin, Trash2, Eye, FileEdit, FolderPlus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

// MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";

export const Notes = () => {
  const { notes, folders, addNote, updateNote, deleteNote, createFolder, addNotification } = useApp();

  const [selectedFolder, setSelectedFolder] = useState("Dynamic Programming");
  const [activeNoteId, setActiveNoteId] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [newFolderOpen, setNewFolderOpen] = useState(false);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];
  const filteredNotes = notes.filter(n => n.folder === selectedFolder);

  const handleCreateNote = () => {
    const created = addNote(selectedFolder, "New Coding Note", "# New Note\n\nWrite your thoughts here...");
    setActiveNoteId(created.id);
    setEditMode(true);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderTitle.trim()) return;
    createFolder(newFolderTitle);
    setSelectedFolder(newFolderTitle);
    setNewFolderTitle("");
    setNewFolderOpen(false);
  };

  const renderMarkdown = (text) => {
    if (!text) return "";
    let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/^# (.*$)/gim, '<h1 style="font-size:18px;font-weight:bold;color:#FFFFFF;margin:16px 0 8px;padding-bottom:4px;border-bottom:1px solid rgba(44,44,44,0.3)">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="font-size:16px;font-weight:bold;color:#FFFFFF;margin:12px 0 6px">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 style="font-size:14px;font-weight:bold;color:#FFFFFF;margin:8px 0 4px">$1</h3>');
    html = html.replace(/```([\s\S]*?)```/gm, '<pre style="background:rgba(0,0,0,0.6);padding:12px;border-radius:8px;border:1px solid rgba(44,44,44,0.8);font-size:12px;font-family:monospace;margin:12px 0;overflow-x:auto;color:#D4AF37">$1</pre>');
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(39,39,42,0.8);color:#FFFFFF;padding:2px 6px;border-radius:4px;font-size:11px;font-family:monospace">$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:bold;color:#FFFFFF">$1</strong>');
    html = html.replace(/\n/g, "<br />");
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 3 }, pt: 12, pb: 6, display: "flex", flexDirection: "column", gap: 3, textAlign: "left", height: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>Notes Workspace</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
            Create study sheets, syntax bookmarks, and algorithmic templates.
          </Typography>
        </Box>
        <Button size="sm" onClick={handleCreateNote} style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
          <Plus size={14} /> Add Note
        </Button>
      </Box>

      {/* Main Splitscreen workspace */}
      <Grid container spacing={3} sx={{ flex: 1, minHeight: "500px", alignItems: "stretch" }}>
        {/* Leftmost Folder sidebar */}
        <Grid item xs={12} lg={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Card style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", fontWeight: "bold", color: "text.secondary", textTransform: "uppercase" }}>
                <span>Folders</span>
                <ButtonBase onClick={() => setNewFolderOpen(!newFolderOpen)} sx={{ color: "primary.main", p: 0.25, borderRadius: "4px" }}>
                  <FolderPlus size={14} />
                </ButtonBase>
              </Box>

              {newFolderOpen && (
                <Box component="form" onSubmit={handleCreateFolder} sx={{ display: "flex", gap: 1 }}>
                  <InputBase
                    placeholder="Folder name..." value={newFolderTitle} onChange={(e) => setNewFolderTitle(e.target.value)} required
                    sx={{ flex: 1, backgroundColor: "background.paper", border: "1px solid", borderColor: "divider", borderRadius: "4px", px: 1, fontSize: "10px", color: "text.primary" }}
                  />
                  <Button type="submit" size="sm" style={{ fontSize: "10px", padding: "4px 8px" }}>Add</Button>
                </Box>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {folders.map((fold) => (
                  <ButtonBase key={fold}
                    onClick={() => { setSelectedFolder(fold); const firstNote = notes.find(n => n.folder === fold); if (firstNote) setActiveNoteId(firstNote.id); }}
                    sx={{
                      width: "100%", textAlign: "left", px: 1.25, py: 1, borderRadius: "8px", fontSize: "12px",
                      color: selectedFolder === fold ? "primary.main" : "text.secondary",
                      backgroundColor: selectedFolder === fold ? "rgba(212,175,55,0.1)" : "transparent",
                      fontWeight: selectedFolder === fold ? "bold" : "normal",
                      display: "flex", alignItems: "center", gap: 1, transition: "all 0.2s",
                      "&:hover": { color: "text.primary", backgroundColor: "rgba(26,26,26,0.4)" },
                    }}>
                    <Folder size={14} style={{ flexShrink: 0 }} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{fold}</span>
                  </ButtonBase>
                ))}
              </Box>
            </Card>

            {/* Files inside selected folder */}
            <Card style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", textTransform: "uppercase", display: "block", mb: 1, fontSize: "10px" }}>Files</Typography>
              {filteredNotes.length === 0 ? (
                <Typography variant="caption" sx={{ color: "text.secondary", textAlign: "center", py: 3, display: "block", fontSize: "10px" }}>No files in folder</Typography>
              ) : (
                filteredNotes.map((note) => (
                  <ButtonBase key={note.id}
                    onClick={() => { setActiveNoteId(note.id); setEditMode(false); }}
                    sx={{
                      width: "100%", textAlign: "left", px: 1, py: 1, borderRadius: "8px", border: "1px solid", fontSize: "12px",
                      borderColor: activeNoteId === note.id ? "primary.main" : "transparent",
                      backgroundColor: activeNoteId === note.id ? "background.paper" : "background.card",
                      color: activeNoteId === note.id ? "text.primary" : "text.secondary",
                      display: "flex", alignItems: "center", gap: 1, transition: "all 0.2s",
                      "&:hover": { color: "text.primary", backgroundColor: "rgba(26,26,26,0.6)" },
                    }}>
                    <FileText size={14} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{note.title}</span>
                    {note.pinned && <Pin size={10} style={{ color: "#D4AF37", flexShrink: 0, transform: "rotate(45deg)" }} />}
                  </ButtonBase>
                ))
              )}
            </Card>
          </Box>
        </Grid>

        {/* Center / Right editor workspace */}
        <Grid item xs={12} lg={9}>
          {activeNote ? (
            <Card style={{ padding: "24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {/* Note Header */}
              <Box sx={{ pb: 2, borderBottom: "1px solid rgba(44,44,44,0.4)", mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                  {editMode ? (
                    <InputBase
                      value={activeNote.title}
                      onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                      sx={{ fontSize: "16px", fontWeight: "bold", color: "text.primary", backgroundColor: "background.card", border: "1px solid", borderColor: "divider", borderRadius: "4px", px: 1.25, py: 0.5, width: "100%", maxWidth: 320 }}
                    />
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>{activeNote.title}</Typography>
                      {activeNote.pinned && <Pin size={12} style={{ color: "#D4AF37", transform: "rotate(45deg)" }} />}
                    </Box>
                  )}
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25, fontSize: "9px" }}>Folder: {activeNote.folder}</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <ButtonBase onClick={() => setEditMode(!editMode)}
                    title={editMode ? "Preview Mode" : "Edit Mode"}
                    sx={{ p: 0.75, borderRadius: "8px", border: "1px solid", borderColor: "divider", backgroundColor: "background.card", color: "text.secondary", "&:hover": { color: "text.primary" } }}>
                    {editMode ? <Eye size={14} /> : <FileEdit size={14} />}
                  </ButtonBase>
                  <ButtonBase
                    onClick={() => { deleteNote(activeNote.id); const remaining = notes.filter(n => n.id !== activeNote.id); if (remaining.length > 0) setActiveNoteId(remaining[0].id); }}
                    title="Delete Note"
                    sx={{ p: 0.75, borderRadius: "8px", border: "1px solid", borderColor: "divider", backgroundColor: "background.card", color: "#D32F2F", "&:hover": { backgroundColor: "rgba(211,47,47,0.1)" } }}>
                    <Trash2 size={14} />
                  </ButtonBase>
                </Box>
              </Box>

              {/* Note Body editor */}
              <Box sx={{ flex: 1, my: 2, fontSize: { xs: "12px", sm: "14px" }, color: "text.secondary", lineHeight: 1.6 }}>
                {editMode ? (
                  <InputBase
                    component="textarea" multiline
                    value={activeNote.content}
                    onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                    rows={12}
                    sx={{ width: "100%", minHeight: "300px", backgroundColor: "background.card", border: "1px solid", borderColor: "divider", color: "text.primary", borderRadius: "12px", p: 2, fontFamily: "monospace", fontSize: "12px", resize: "none" }}
                  />
                ) : (
                  <Box sx={{ textAlign: "left", userSelect: "text", fontWeight: "light", p: 1, maxWidth: "none" }}>
                    {renderMarkdown(activeNote.content)}
                  </Box>
                )}
              </Box>

              {/* Bottom status bar */}
              <Box sx={{ borderTop: "1px solid rgba(44,44,44,0.3)", pt: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "10px", color: "text.secondary" }}>
                <span>Auto-saved locally</span>
                <span style={{ fontFamily: "monospace" }}>{activeNote.content?.length || 0} characters</span>
              </Box>
            </Card>
          ) : (
            <Box className="glass" sx={{ p: 10, textAlign: "center", fontSize: "12px", color: "text.secondary", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              Create a note using the 'Add Note' button to begin writing
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Notes;
