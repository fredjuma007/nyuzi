"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDashboard } from "../../../context";
import { AuthorsTab } from "../../../components/AuthorsTab";
import { AuthorEntry } from "../../../components/types";

export default function PublicationAuthorsPage() {
  const params = useParams<{ teamSlug: string; siteId: string }>();
  const teamSlug = params?.teamSlug || "freds-projects";
  const siteId = params?.siteId || "trc254";

  const {
    authors,
    selectedSite,
    setSelectedSite,
    activeTeamSlug,
    setActiveTeamSlug,
    handleAddAuthor: addAuthorToDb,
    handleUpdateAuthor: updateAuthorInDb,
    handleDeleteAuthor: deleteAuthorFromDb,
  } = useDashboard();

  useEffect(() => {
    if (siteId && siteId !== selectedSite) {
      setSelectedSite(siteId);
    }
    if (teamSlug && teamSlug !== activeTeamSlug) {
      setActiveTeamSlug(teamSlug);
    }
  }, [siteId, teamSlug, selectedSite, activeTeamSlug, setSelectedSite, setActiveTeamSlug]);

  // Local Author Modal & Form State
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [editingAuthor, setEditingAuthor] = useState<AuthorEntry | null>(null);
  const [editAuthorName, setEditAuthorName] = useState("");
  const [editAuthorEmail, setEditAuthorEmail] = useState("");

  const handleToggleAuthor = async (id: string) => {
    const author = authors.find((a) => a.id === id);
    if (!author) return;
    const nextStatus = author.status === "active" ? "muted" : "active";
    await updateAuthorInDb(id, { status: nextStatus });
  };

  const handleOpenEditAuthor = (author: AuthorEntry) => {
    setEditingAuthor(author);
    setEditAuthorName(author.name);
    setEditAuthorEmail(author.email || "");
  };

  const handleSaveEditAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAuthor || !editAuthorName.trim() || !editAuthorEmail.trim()) return;

    await updateAuthorInDb(editingAuthor.id, {
      name: editAuthorName.trim(),
      email: editAuthorEmail.trim(),
      status: editingAuthor.status === "discovered" ? "active" : editingAuthor.status,
    });
    setEditingAuthor(null);
  };

  const handleAddAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthorName.trim() || !newAuthorEmail.trim()) return;

    await addAuthorToDb(newAuthorName.trim(), newAuthorEmail.trim(), "active");
    setNewAuthorName("");
    setNewAuthorEmail("");
    setShowAddAuthor(false);
  };

  const handleQuickAssignDefault = async (author: AuthorEntry) => {
    const defaultEmail =
      siteId === "trc254" ? "readingcircle254@gmail.com" : "admin@nyuzi.dev";
    await updateAuthorInDb(author.id, {
      email: defaultEmail,
      status: "active",
    });
  };

  return (
    <div className="space-y-6">
      <AuthorsTab
        authors={authors}
        selectedSite={siteId}
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
        handleDeleteAuthor={deleteAuthorFromDb}
        handleQuickAssignDefault={handleQuickAssignDefault}
      />
    </div>
  );
}
