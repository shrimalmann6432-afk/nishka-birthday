/**
 * notes.ts
 * Builds the personal notes grid and handles the open/close modal.
 */

import type { Note } from "./content/notes";

let activeModal: HTMLElement | null = null;

export function buildNotes(container: HTMLElement, notes: Note[]): void {
  if (notes.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:var(--text-pale);font-family:var(--font-sans);">No notes added yet.</p>`;
    return;
  }

  notes.forEach((note, idx) => {
    const card = document.createElement("div");
    card.classList.add(
      "note-card",
      `note-card--${note.color || "ivory"}`
    );
    card.setAttribute("role", "listitem");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Note: ${note.label}`);
    card.dataset.noteIdx = String(idx);

    card.innerHTML = `
      <div class="note-card__label">${note.label}</div>
      <p class="note-card__hint">Tap to open</p>
    `;

    card.addEventListener("click", () => openNote(note));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openNote(note);
      }
    });

    container.appendChild(card);
  });
}

function openNote(note: Note): void {
  // Remove any existing modal
  closeNote();

  const modal = document.createElement("div");
  modal.classList.add("note-modal");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", note.label);

  modal.innerHTML = `
    <div class="note-modal__paper">
      <button class="note-modal__close" aria-label="Close note">✕</button>
      <p class="note-modal__label">${note.label}</p>
      <div class="note-modal__content">${note.content}</div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
  activeModal = modal;

  const closeBtn = modal.querySelector(".note-modal__close") as HTMLButtonElement;
  closeBtn?.focus();
  closeBtn?.addEventListener("click", closeNote);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeNote();
  });

  // Close on Escape
  document.addEventListener("keydown", onEscNote);
}

function onEscNote(e: KeyboardEvent) {
  if (e.key === "Escape") closeNote();
}

function closeNote(): void {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onEscNote);
  }
}
