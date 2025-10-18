/*
  Tippani - Simple Note-Taking Web App
  Author: Prithivi Pemi Magar
  Description: Allows users to write notes and display them in a list.
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const titleInput = document.getElementById("note-title");
  const contentInput = document.getElementById("note-content");
  const notesContainer = document.querySelector(".note__cards");
  const searchInput = document.querySelector(".note__search input");
  const submitButtonText = document.querySelector(".submit__button button p");

  let notes = JSON.parse(localStorage.getItem("tippaniNotes") || "[]");
  let editingId = null;

  function saveNotes() {
    localStorage.setItem("tippaniNotes", JSON.stringify(notes));
  }

  function createNoteCard(note) {
    const card = document.createElement("div");
    card.className = "note__card";
    const h3 = document.createElement("h3");
    h3.textContent = note.title;
    const p = document.createElement("p");
    p.textContent = note.content;
    const actions = document.createElement("div");
    actions.className = "note__actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit__button";
    editBtn.title = "Edit";
    const editImg = document.createElement("img");
    editImg.src = "./svg/edit.svg";
    editImg.alt = "Edit Icon";
    editBtn.appendChild(editImg);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete__button";
    deleteBtn.title = "Delete";
    const delImg = document.createElement("img");
    delImg.src = "./svg/delete.svg";
    delImg.alt = "Delete Icon";
    deleteBtn.appendChild(delImg);

    editBtn.addEventListener("click", () => startEdit(note.id));
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(actions);

    return card;
  }

  function renderNotes(filter = "") {
    notesContainer.innerHTML = "";
    const normalizedFilter = filter.trim().toLowerCase();
    const filtered = notes.filter((n) => {
      if (!normalizedFilter) return true;
      return (
        (n.title || "").toLowerCase().includes(normalizedFilter) ||
        (n.content || "").toLowerCase().includes(normalizedFilter)
      );
    });

    if (filtered.length === 0) {
      const empty = document.createElement("p");
      empty.style.color = "var(--note-content-color)";
      empty.textContent = "No notes yet.";
      notesContainer.appendChild(empty);
      return;
    }

    filtered.forEach((note) => {
      notesContainer.appendChild(createNoteCard(note));
    });
  }

  function addNote(title, content) {
    const note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    notes.unshift(note); 
    saveNotes();
    renderNotes(searchInput.value);
  }

  function startEdit(id) {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    editingId = id;
    titleInput.value = note.title;
    contentInput.value = note.content;
    submitButtonText.textContent = "Update Note";
    titleInput.focus();
  }

  function updateNote(id, title, content) {
    const idx = notes.findIndex((n) => n.id === id);
    if (idx === -1) return;
    notes[idx].title = title;
    notes[idx].content = content;
    notes[idx].updatedAt = new Date().toISOString();
    saveNotes();
    renderNotes(searchInput.value);
  }

  function deleteNote(id) {
    if (!confirm("Delete this note?")) return;
    notes = notes.filter((n) => n.id !== id);
    saveNotes();
    renderNotes(searchInput.value);
    if (editingId === id) resetForm();
  }

  function resetForm() {
    editingId = null;
    form.reset();
    submitButtonText.textContent = "Add Notes";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title && !content) return;
    if (editingId) {
      updateNote(editingId, title, content);
    } else {
      addNote(title, content);
    }
    resetForm();
  });

  searchInput.addEventListener("input", (e) => {
    renderNotes(e.target.value);
  });

  // initial render
  renderNotes();
});
