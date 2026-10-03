"use client";

import { useEffect, useState } from "react";
import NoteItem from "./component/noteItem";

export type Note = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [duplicate, setDuplicate] = useState(false);

  // ==========================================
  // BONUS: USE EFFECT
  // CHECK IF NOTE ALREADY EXISTS
  // ==========================================
  useEffect(() => {
    if (title.trim() === "" || editingId !== null) {
      setDuplicate(false);
      return;
    }

    const exists = notes.some(
      (note) =>
        note.title.toLowerCase().trim() ===
        title.toLowerCase().trim()
    );

    setDuplicate(exists);
  }, [title, notes, editingId]);

  // ==========================================
  // ADD / UPDATE NOTE
  // ==========================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter a title and description.");
      return;
    }

    // UPDATE
    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
              }
            : note
        )
      );

      setEditingId(null);
      setTitle("");
      setDescription("");

      return;
    }

    // CHECK DUPLICATE
    const exists = notes.some(
      (note) =>
        note.title.toLowerCase().trim() ===
        title.toLowerCase().trim()
    );

    if (exists) {
      alert("A note with this title already exists.");
      return;
    }

    // CREATE NEW NOTE
    const newNote: Note = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toLocaleString(),
    };

    setNotes((currentNotes) => [
      newNote,
      ...currentNotes,
    ]);

    setTitle("");
    setDescription("");
  };

  // ==========================================
  // DELETE
  // ==========================================
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    );
  };

  // ==========================================
  // EDIT
  // ==========================================
  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setDuplicate(false);
  };

  // ==========================================
  // SCROLL TO FORM
  // ==========================================
  const scrollToForm = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      document.getElementById("note-title")?.focus();
    }, 500);
  };

  return (
    <main className="app">

      {/* ======================================
          NAVBAR
      ====================================== */}
      <nav className="navbar">

        <div className="brand">
          <div className="brand-icon">
            ✎
          </div>

          <span>PERSONAL / NOTES</span>
        </div>

        <div className="nav-links">
          <button className="nav-link active">
            ▣ &nbsp; Notes
          </button>

          <button className="nav-link">
            ▤ &nbsp; Archive
          </button>

          <button className="nav-link">
            ⚙ &nbsp; Settings
          </button>
        </div>

      </nav>

      {/* ======================================
          MAIN
      ====================================== */}
      <div className="container">

        {/* ====================================
            HERO + FORM
        ==================================== */}
        <section className="top-grid">

          {/* HERO */}
          <div className="hero">

            <div className="hero-content">

              <div className="eyebrow">
                WELCOME BACK
                <span></span>
              </div>

              <h1>
                Your notes.
                <br />
                <strong>Organized.</strong>
              </h1>

              <p>
                Capture your ideas, tasks, and thoughts
                in one place.
                <br />
                Keep track of what matters most.
              </p>

              <button
                className="hero-button"
                onClick={scrollToForm}
              >
                <span>＋</span>
                Add Note
              </button>

            </div>

            <div className="hero-lines"></div>

          </div>

          {/* FORM */}
          <div className="form-card">

            <div className="form-heading">

              <div className="form-icon">
                ▣
              </div>

              <div>
                <h2>
                  {editingId !== null
                    ? "Update Note"
                    : "Create Note"}
                </h2>

                <p>
                  {editingId !== null
                    ? "Update your existing note."
                    : "Add a new note to your collection."}
                </p>
              </div>

            </div>

            <form onSubmit={handleSubmit}>

              <label htmlFor="note-title">
                Title
              </label>

              <input
                id="note-title"
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              {duplicate && (
                <div className="duplicate-warning">
                  ⚠ This note already exists.
                </div>
              )}

              <label htmlFor="note-description">
                Description
              </label>

              <textarea
                id="note-description"
                placeholder="Write your note here..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <div className="form-actions">

                {editingId !== null && (
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="submit-button"
                >
                  ＋{" "}
                  {editingId !== null
                    ? "Update Note"
                    : "Add Note"}
                </button>

              </div>

            </form>

          </div>

        </section>

        {/* ====================================
            NOTES
        ==================================== */}
        <section className="notes-container">

          <div className="notes-heading">

            <div className="notes-title">

              <div className="notes-icon">
                ▤
              </div>

              <div>
                <h2>My Notes</h2>
                <p>
                  Here are all your saved notes.
                </p>
              </div>

            </div>

            <div className="notes-count">
              ▣ &nbsp; {notes.length}{" "}
              {notes.length === 1 ? "Note" : "Notes"}
            </div>

          </div>

          {notes.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ▤
              </div>

              <h3>No notes yet</h3>

              <p>
                Create your first note using the
                form above.
              </p>

            </div>

          ) : (

            <div className="notes-grid">

              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}

            </div>

          )}

        </section>

      </div>

      {/* ======================================
          FOOTER
      ====================================== */}
      <footer className="footer">

        <span></span>

        <p>
          Built with Next.js
        </p>

        <span></span>

      </footer>

    </main>
  );
}
