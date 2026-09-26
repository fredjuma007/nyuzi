"use client";

import React, { useState } from "react";
import { useDashboard } from "../context";
import { AuthorsTab } from "../components/AuthorsTab";
import { AuthorEntry } from "../components/types";

export default function AuthorsPage() {
  const { authors, setAuthors, selectedSite, showToast } = useDashboard();

  // Local Author Modal & Form State
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [editingAuthor, setEditingAuthor] = useState<AuthorEntry | null>(null);
  const [editAuthorName, setEditAuthorName] = useState("");
  const [editAuthorEmail, setEditAuthorEmail] = useState("");

  const handleToggleAuthor = (id: string) => {
    const updated = authors.map((a) =>
      a.id === id
        ? { ...a, status: (a.status === "active" ? "muted" : "active") as "active" | "muted" }
        : a
    );
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    showToast("Author notification preferences updated.");
  };

  const handleOpenEditAuthor = (author: AuthorEntry) => {
    setEditingAuthor(author);
    setEditAuthorName(author.name);
    setEditAuthorEmail(author.email);
  };

  const handleSaveEditAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAuthor || !editAuthorName.trim() || !editAuthorEmail.trim()) return;

    const updated = authors.map((a) =>
      a.id === editingAuthor.id
        ? { ...a, name: editAuthorName.trim(), email: editAuthorEmail.trim() }
        : a
    );
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    setEditingAuthor(null);
    showToast(`Saved author details for ${editAuthorName.trim()}`);
  };

  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorName.trim() || !newAuthorEmail.trim()) return;

    const newEntry: AuthorEntry = {
      id: `author_${Date.now()}`,
      name: newAuthorName.trim(),
      email: newAuthorEmail.trim(),
      status: "active",
      discussionsCount: 0,
    };

    const updated = [...authors, newEntry];
    setAuthors(updated);
    localStorage.setItem(`nyuzi_authors_${selectedSite}`, JSON.stringify(updated));
    setNewAuthorName("");
    setNewAuthorEmail("");
    setShowAddAuthor(false);
    showToast(`Added ${newEntry.name} to author roster`);
  };

  return (
    <div className="space-y-6">
      <AuthorsTab
        authors={authors}
        showAddAuthor={showAddAuthor}
        setShowAddAuthor={setShowAddAuthor}
        newAuthorName={newAuthorName}
        setNewAuthorName={setNewAuthorName}
        newAuthorEmail={newAuthorEmail}
        setNewAuthorEmail={setNewAuthorEmail}
        handleAddAuthor={handleAddAuthor}
        editingAuthor={editingAuthor}
        setEditingAuthor={setEditingAuthor}
        editAuthorName={editAuthorName}
        setEditAuthorName={setEditAuthorName}
        editAuthorEmail={editAuthorEmail}
        setEditAuthorEmail={setEditAuthorEmail}
        handleOpenEditAuthor={handleOpenEditAuthor}
        handleSaveEditAuthor={handleSaveEditAuthor}
        handleToggleAuthor={handleToggleAuthor}
      />
    </div>
  );
}
