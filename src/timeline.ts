/**
 * timeline.ts
 * Builds the memory timeline from the memories content file.
 */

import type { Memory } from "./content/memories";

export function buildTimeline(
  container: HTMLElement,
  memories: Memory[]
): void {
  if (memories.length === 0) {
    container.innerHTML = `<p style="text-align:center;color:var(--text-pale);font-family:var(--font-sans);">No memories added yet.</p>`;
    return;
  }

  memories.forEach((mem) => {
    const entry = document.createElement("div");
    entry.classList.add("timeline-entry");
    entry.setAttribute("role", "listitem");

    entry.innerHTML = `
      ${mem.icon ? `<div class="timeline-entry__icon">${mem.icon}</div>` : ""}
      ${mem.date ? `<p class="timeline-entry__date">${mem.date}</p>` : ""}
      <h3 class="timeline-entry__title">${mem.title}</h3>
      <p class="timeline-entry__body">${mem.body}</p>
      ${mem.location ? `<p class="timeline-entry__location">📍 ${mem.location}</p>` : ""}
    `;

    container.appendChild(entry);
  });

  // Animate entries on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  container.querySelectorAll(".timeline-entry").forEach((el) => {
    observer.observe(el);
  });
}
