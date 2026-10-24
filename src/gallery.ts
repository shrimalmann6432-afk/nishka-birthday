/**
 * gallery.ts
 * Photo gallery builder with lightbox support.
 */

import type { Photo } from "./content/photoManifest";

let lightboxPhotos: Photo[] = [];
let lightboxIndex = 0;

function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}

function resolvePublicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

// ── Placeholder gradient colours ──────────────────────────
const PLACEHOLDER_BG = [
  "linear-gradient(135deg, #e8c5c0, #d4a0a0)",
  "linear-gradient(135deg, #f0e2c8, #dcc4a0)",
  "linear-gradient(135deg, #d4a0a0, #c48b8b)",
  "linear-gradient(135deg, #c8a880, #a87c5c)",
];

/**
 * Builds photo cards in the given grid element.
 * Handles missing images gracefully with a placeholder.
 */
export function buildGallery(
  gridEl: HTMLElement,
  photos: Photo[],
  galleryId: string
): void {
  lightboxPhotos = photos; // expose to lightbox

  if (photos.length === 0) {
    gridEl.innerHTML = `<p style="text-align:center;color:var(--text-pale);font-family:var(--font-sans);font-size:0.9rem;grid-column:1/-1;padding:2rem;">
      No photos added yet — see README for instructions.
    </p>`;
    return;
  }

  photos.forEach((photo, idx) => {
    const card = document.createElement("div");
    card.classList.add("photo-card", `photo-card--${photo.layout || "square"}`);
    card.setAttribute("role", "listitem");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Photo ${idx + 1}: ${photo.alt}`);
    card.dataset.galleryId = galleryId;
    card.dataset.idx = String(idx);

    const placeholder = PLACEHOLDER_BG[idx % PLACEHOLDER_BG.length];

    card.innerHTML = `
      <div class="photo-card__inner">
        <div class="photo-card__img-wrap" style="background:${placeholder};">
          <img
            loading="lazy"
            src="${resolvePublicAsset(photo.src)}"
            alt="${photo.alt}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
          />
          <div class="photo-card__placeholder" style="display:none;">
            <span class="photo-card__placeholder-icon">🖼️</span>
            <span>Add your photo here</span>
          </div>
        </div>
        ${
          photo.caption || photo.date
            ? `<div class="photo-card__footer">
                ${photo.caption ? `<p class="photo-card__caption">${photo.caption}</p>` : ""}
                ${photo.date ? `<p class="photo-card__date">${photo.date}</p>` : ""}
              </div>`
            : ""
        }
      </div>
    `;

    card.addEventListener("click", () => openLightbox(idx, photos));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(idx, photos);
      }
    });

    gridEl.appendChild(card);
  });
}

// ── Lightbox ──────────────────────────────────────────────

function openLightbox(idx: number, photos: Photo[]): void {
  lightboxPhotos = photos;
  lightboxIndex = idx;

  const lb = $("lightbox");
  if (!lb) return;

  lb.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  renderLightbox();

  // Focus close button for keyboard accessibility
  setTimeout(() => ($("lightbox-close") as HTMLButtonElement)?.focus(), 50);
}

function closeLightbox(): void {
  const lb = $("lightbox");
  if (!lb) return;
  lb.classList.add("closing");
  setTimeout(() => {
    lb.classList.add("hidden");
    lb.classList.remove("closing");
    document.body.style.overflow = "";
  }, 250);
}

function renderLightbox(): void {
  const photo = lightboxPhotos[lightboxIndex];
  if (!photo) return;

  const img = $("lightbox-img") as HTMLImageElement | null;
  const cap = $("lightbox-caption");
  const date = $("lightbox-date");
  const prev = $("lightbox-prev");
  const next = $("lightbox-next");

  if (img) { img.src = resolvePublicAsset(photo.src); img.alt = photo.alt; }
  if (cap) cap.textContent = photo.caption || "";
  if (date) date.textContent = photo.date || "";

  // Show/hide nav buttons
  if (prev) prev.style.display = lightboxPhotos.length > 1 ? "flex" : "none";
  if (next) next.style.display = lightboxPhotos.length > 1 ? "flex" : "none";
}

export function initLightbox(): void {
  $("lightbox-close")?.addEventListener("click", closeLightbox);

  $("lightbox-prev")?.addEventListener("click", () => {
    lightboxIndex =
      (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length;
    renderLightbox();
  });

  $("lightbox-next")?.addEventListener("click", () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxPhotos.length;
    renderLightbox();
  });

  $("lightbox")?.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).id === "lightbox") closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    const lb = $("lightbox");
    if (!lb || lb.classList.contains("hidden")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      lightboxIndex =
        (lightboxIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length;
      renderLightbox();
    }
    if (e.key === "ArrowRight") {
      lightboxIndex = (lightboxIndex + 1) % lightboxPhotos.length;
      renderLightbox();
    }
  });
}
