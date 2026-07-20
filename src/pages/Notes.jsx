import React, { useState } from "react";
import { Folder, FileText, Plus, Pin, Trash2, Edit3, Eye, FileEdit, FolderPlus } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const Notes = () => {
  const {
    notes,
    folders,
    addNote,
    updateNote,
    deleteNote,
    createFolder,
    addNotification
  } = useApp();

  // Active workspace note & folder navigation
  const [selectedFolder, setSelectedFolder] = useState("Dynamic Programming");
  const [activeNoteId, setActiveNoteId] = useState(1);
  const [editMode, setEditMode] = useState(false); // false = preview, true = edit

  // Input states for note additions
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [newFolderOpen, setNewFolderOpen] = useState(false);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  // Helper to compile filtered notes
  const filteredNotes = notes.filter((n) => n.folder === selectedFolder);

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

  // Simple Markdown-to-HTML parser function using regex
  const renderMarkdown = (text) => {
    if (!text) return "";
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Headings
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-lg font-bold text-text-primary mt-4 mb-2 pb-1 border-b border-border/30">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-base font-bold text-text-primary mt-3 mb-1.5">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-sm font-bold text-text-primary mt-2 mb-1">$1</h3>');
    
    // Codeblocks
    html = html.replace(/```([\s\S]*?)```/gm, '<pre class="bg-zinc-950/60 p-3 rounded-lg border border-border/80 text-xs font-mono my-3 overflow-x-auto text-primary">$1</pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-zinc-800 text-text-primary px-1.5 py-0.5 rounded text-[11px] font-mono">$1</code>');
    
    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-text-primary">$1</strong>');
    
    // Linebreaks
    html = html.replace(/\n/g, "<br />");
    
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12 flex flex-col gap-6 text-left h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary">Notes Workspace</h2>
          <p className="text-xs text-text-secondary mt-1">Create study sheets, syntax bookmarks, and algorithmic templates.</p>
        </div>

        <Button size="sm" className="font-semibold gap-1.5" onClick={handleCreateNote}>
          <Plus size={14} /> Add Note
        </Button>
      </div>

      {/* Main Splitscreen workspace */}
      <div className="grid lg:grid-cols-4 gap-6 flex-1 min-h-[500px] items-stretch">
        {/* Leftmost Folder sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary uppercase">
              <span>Folders</span>
              <button
                onClick={() => setNewFolderOpen(!newFolderOpen)}
                className="text-primary hover:text-primary-dark cursor-pointer"
              >
                <FolderPlus size={14} />
              </button>
            </div>

            {newFolderOpen && (
              <form onSubmit={handleCreateFolder} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Folder name..."
                  value={newFolderTitle}
                  onChange={(e) => setNewFolderTitle(e.target.value)}
                  className="bg-surface border border-border rounded text-[10px] px-2 py-1 flex-1 focus:outline-none text-text-primary"
                  required
                />
                <Button type="submit" size="sm" className="text-[10px] px-2 py-1 h-fit">Add</Button>
              </form>
            )}

            <div className="flex flex-col gap-1 text-xs">
              {folders.map((fold) => (
                <button
                  key={fold}
                  onClick={() => {
                    setSelectedFolder(fold);
                    // Select first note in folder if exists
                    const firstNote = notes.find((n) => n.folder === fold);
                    if (firstNote) setActiveNoteId(firstNote.id);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${
                    selectedFolder === fold
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-text-secondary hover:text-text-primary hover:bg-card/40"
                  }`}
                >
                  <Folder size={14} />
                  <span className="truncate">{fold}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Files inside selected folder list */}
          <Card className="p-4 flex flex-col gap-2 flex-1">
            <span className="text-[10px] font-bold text-text-secondary uppercase mb-2">Files</span>
            {filteredNotes.length === 0 ? (
              <div className="text-[10px] text-text-secondary text-center py-6">No files in folder</div>
            ) : (
              filteredNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    setEditMode(false);
                  }}
                  className={`w-full text-left px-2 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2 text-xs border ${
                    activeNoteId === note.id
                      ? "bg-surface border-primary text-text-primary"
                      : "bg-card border-transparent text-text-secondary hover:bg-card/60 hover:text-text-primary"
                  }`}
                >
                  <FileText size={14} className="shrink-0" />
                  <span className="truncate flex-1">{note.title}</span>
                  {note.pinned && <Pin size={10} className="text-primary shrink-0 rotate-45" />}
                </button>
              ))
            )}
          </Card>
        </div>

        {/* Center / Right editor workspace */}
        <div className="lg:col-span-3">
          {activeNote ? (
            <Card className="p-6 h-full flex flex-col justify-between">
              {/* Note Header */}
              <div className="pb-4 border-b border-border/40 mb-4 flex justify-between items-center">
                <div className="flex-1 mr-4">
                  {editMode ? (
                    <input
                      type="text"
                      value={activeNote.title}
                      onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                      className="text-base font-extrabold text-text-primary bg-card border border-border rounded px-2.5 py-1 focus:outline-none w-full max-w-sm"
                    />
                  ) : (
                    <h3 className="text-base font-extrabold text-text-primary flex items-center gap-2">
                      {activeNote.title}
                      {activeNote.pinned && <Pin size={12} className="text-primary rotate-45" />}
                    </h3>
                  )}
                  <span className="text-[9px] text-text-secondary mt-1 block">Folder: {activeNote.folder}</span>
                </div>

                {/* Edit / Preview tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="p-1.5 rounded-lg border border-border bg-card text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                    title={editMode ? "Preview Mode" : "Edit Mode"}
                  >
                    {editMode ? <Eye size={14} /> : <FileEdit size={14} />}
                  </button>

                  <button
                    onClick={() => {
                      deleteNote(activeNote.id);
                      // Select another remaining note
                      const remaining = notes.filter((n) => n.id !== activeNote.id);
                      if (remaining.length > 0) setActiveNoteId(remaining[0].id);
                    }}
                    className="p-1.5 rounded-lg border border-border bg-card text-danger hover:bg-danger/10 cursor-pointer transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Note Body editor */}
              <div className="flex-1 my-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
                {editMode ? (
                  <textarea
                    value={activeNote.content}
                    onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                    rows={12}
                    className="w-full h-full min-h-[300px] bg-card border border-border text-text-primary rounded-xl p-4 font-mono text-xs focus:outline-none resize-none"
                  />
                ) : (
                  <div className="text-left select-text font-light p-2 max-w-none">
                    {renderMarkdown(activeNote.content)}
                  </div>
                )}
              </div>

              {/* Bottom status bar */}
              <div className="border-t border-border/30 pt-3 flex justify-between items-center text-[10px] text-text-secondary">
                <span>Auto-saved locally</span>
                <span className="font-mono">{activeNote.content?.length || 0} characters</span>
              </div>
            </Card>
          ) : (
            <div className="glass p-20 text-center text-xs text-text-secondary rounded-xl flex items-center justify-center h-full">
              Create a note using the 'Add Note' button to begin writing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Notes;
