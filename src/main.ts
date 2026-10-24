/**
 * main.ts — Nishka Birthday Website
 * ============================================================
 * Orchestrates all modules. Edit content in src/content/*.ts
 * ============================================================
 */

import "./style.css";

// ── Content ───────────────────────────────────────────────
import { birthdayConfig } from "./content/birthdayConfig";
import { letterContent } from "./content/letterContent";
import { proposalContent } from "./content/proposalContent";
import { notes as notesData } from "./content/notes";
import { memories as memoriesData } from "./content/memories";
import { usPhotos, nishkaPhotos } from "./content/photoManifest";
import { surpriseContent } from "./content/surpriseContent";

// ── Modules ───────────────────────────────────────────────
import { startCountdown, getBirthdayState } from "./countdown";
import { createStars } from "./stars";
import { launchConfetti } from "./confetti";
import { buildGallery, initLightbox } from "./gallery";
import { buildTimeline } from "./timeline";
import { buildNotes } from "./notes";
import { initEnvelope, setEnvelopeUnlocked } from "./envelope";
import { initMusic } from "./music";

// ── Helpers ───────────────────────────────────────────────
function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}

// ═══════════════════════════════════════════════════════════
// PHASE 1: Opening scene
// ═══════════════════════════════════════════════════════════
function initOpeningScene() {
  createStars($("opening-stars")!, { count: 120 });

  const btnEnter = $("btn-enter");
  btnEnter?.addEventListener("click", enterApp);
  btnEnter?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enterApp();
    }
  });

  // Allow scrolling past opening to trigger entry too
  const opening = $("opening");
  if (opening) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) enterApp();
      },
      { threshold: 0 }
    );
    observer.observe(opening);
  }
}

function enterApp() {
  const opening = $("opening");
  const mainApp = $("main-app");

  if (!mainApp || mainApp.getAttribute("aria-hidden") === "false") return;

  if (opening) {
    opening.style.transition = "opacity 0.7s ease";
    opening.style.opacity = "0";
    setTimeout(() => {
      opening.style.display = "none";
    }, 700);
  }

  mainApp.classList.remove("hidden");
  mainApp.setAttribute("aria-hidden", "false");
  mainApp.classList.add("entering");

  setTimeout(() => mainApp.classList.remove("entering"), 1000);
}

// ═══════════════════════════════════════════════════════════
// PHASE 2: Countdown
// ═══════════════════════════════════════════════════════════
function initCountdown() {
  createStars($("countdown-stars")!, { count: 160, maxSize: 2.5 });

  const cdDays = $("cd-days")!;
  const cdHours = $("cd-hours")!;
  const cdMinutes = $("cd-minutes")!;
  const cdSeconds = $("cd-seconds")!;

  // If already birthday at page load:
  const state = getBirthdayState();
  if (state === "birthday") {
    triggerBirthday();
  }

  startCountdown(
    { days: cdDays, hours: cdHours, minutes: cdMinutes, seconds: cdSeconds },
    () => triggerBirthday()
  );
}

function triggerBirthday() {
  // Swap countdown for birthday reveal
  const timer = $("countdown-timer");
  if (timer) {
    timer.style.transition = "opacity 0.5s";
    timer.style.opacity = "0";
    setTimeout(() => (timer.style.display = "none"), 500);
  }

  const msg = $("countdown-message");
  if (msg) msg.style.display = "none";

  const reveal = $("birthday-reveal");
  if (reveal) {
    reveal.classList.remove("hidden");
    launchConfetti(180, 5000);
  }

  // Unlock envelope
  setEnvelopeUnlocked();
}

// ═══════════════════════════════════════════════════════════
// PHASE 3: Letter & Proposal
// ═══════════════════════════════════════════════════════════
function initLetter() {
  // Populate letter date
  const dateEl = $("letter-date");
  if (dateEl) dateEl.textContent = letterContent.date;

  // Salutation
  const salutEl = $("letter-salutation");
  if (salutEl) salutEl.textContent = letterContent.salutation;

  // Body paragraphs
  const bodyEl = $("letter-body");
  if (bodyEl) {
    bodyEl.innerHTML = letterContent.paragraphs
      .map((p) => `<p>${p}</p>`)
      .join("");
  }

  // Signature
  const sigEl = $("letter-signature");
  if (sigEl) {
    sigEl.innerHTML = `
      <p class="letter__signature-closing">${letterContent.signatureClosing}</p>
      <p class="letter__signature-name">${letterContent.signatureName}</p>
    `;
  }

  // Proposal
  initProposal();
}

function initProposal() {
  // Confession paragraphs
  const confessionEl = $("proposal-confession");
  if (confessionEl) {
    confessionEl.innerHTML = proposalContent.confession
      .map((p) => `<p>${p}</p>`)
      .join("");
  }

  // Question
  const questionEl = $("proposal-question");
  if (questionEl) questionEl.textContent = proposalContent.question;

  // Floating hearts
  spawnProposalHearts();

  // Buttons
  $("btn-yes")?.addEventListener("click", () => handleProposalResponse("yes"));
  $("btn-maybe")?.addEventListener("click", () =>
    handleProposalResponse("maybe")
  );
}

function spawnProposalHearts() {
  const heartsEl = $("proposal-hearts");
  if (!heartsEl) return;

  const positions = [
    { left: "5%", top: "10%" },
    { left: "15%", top: "70%" },
    { left: "80%", top: "20%" },
    { left: "90%", top: "60%" },
    { left: "50%", top: "5%" },
  ];

  positions.forEach((pos, i) => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♥";
    heart.style.cssText = `left:${pos.left};top:${pos.top};--dur:${3 + i * 0.7}s;--delay:-${i * 1.2}s;`;
    heartsEl.appendChild(heart);
  });
}

function handleProposalResponse(response: "yes" | "maybe") {
  const responseEl = $("proposal-response");
  if (!responseEl) return;

  responseEl.classList.remove("hidden");
  responseEl.classList.remove("proposal__response--yes", "proposal__response--maybe");

  if (response === "yes") {
    responseEl.classList.add("proposal__response--yes");
    responseEl.textContent = proposalContent.yesResponse;
    launchConfetti(120, 4000);
  } else {
    responseEl.classList.add("proposal__response--maybe");
    responseEl.textContent = proposalContent.maybeResponse;
  }

  responseEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ═══════════════════════════════════════════════════════════
// PHASE 4: Envelope
// ═══════════════════════════════════════════════════════════
function initEnvelopeSection() {
  initEnvelope(() => {
    // Callback when letter opens
    const letterEl = $("birthday-letter");
    if (letterEl) {
      letterEl.classList.remove("hidden");
      setTimeout(() => {
        letterEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  });
}

// ═══════════════════════════════════════════════════════════
// PHASE 5: Galleries
// ═══════════════════════════════════════════════════════════
function initGalleries() {
  const usGrid = $("gallery-us-grid");
  if (usGrid) buildGallery(usGrid, usPhotos, "us");

  const nishkaGrid = $("gallery-nishka-grid");
  if (nishkaGrid) buildGallery(nishkaGrid, nishkaPhotos, "nishka");

  initLightbox();
}

// ═══════════════════════════════════════════════════════════
// PHASE 6: Timeline
// ═══════════════════════════════════════════════════════════
function initTimeline() {
  const tl = $("timeline-list");
  if (tl) buildTimeline(tl, memoriesData);
}

// ═══════════════════════════════════════════════════════════
// PHASE 7: Notes
// ═══════════════════════════════════════════════════════════
function initNotes() {
  const grid = $("notes-grid");
  if (grid) buildNotes(grid, notesData);
}

// ═══════════════════════════════════════════════════════════
// PHASE 8: Surprise box
// ═══════════════════════════════════════════════════════════
function initSurprise() {
  const boxEl = $("surprise-box");
  const contentEl = $("surprise-content");
  const messageEl = $("surprise-message");

  if (!boxEl || !contentEl || !messageEl) return;

  // Cast to non-null after guard so TypeScript is happy inside the closure
  const box = boxEl as HTMLElement;
  const content = contentEl as HTMLElement;

  // Populate content
  messageEl.innerHTML = `
    <div style="font-size:2.4rem;margin-bottom:0.8rem;text-align:center;">${surpriseContent.emoji}</div>
    <h3 style="font-family:var(--font-serif);font-size:1.7rem;font-weight:600;color:var(--burgundy);margin-bottom:1.5rem;text-align:center;">${surpriseContent.heading}</h3>
    <div style="white-space:pre-line;line-height:1.85;font-size:1.02rem;">${surpriseContent.message}</div>
  `;

  function openSurprise() {
    if (box.classList.contains("opened")) return;
    box.classList.add("opened");
    box.setAttribute("aria-expanded", "true");
    const hint = box.querySelector(".surprise-box__hint");
    if (hint) hint.textContent = "✦";

    setTimeout(() => {
      content.classList.remove("hidden");
      content.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
  }

  box.addEventListener("click", openSurprise);
  box.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSurprise();
    }
  });
}

// ═══════════════════════════════════════════════════════════
// PHASE 9: Closing scene
// ═══════════════════════════════════════════════════════════
function initClosingScene() {
  createStars($("closing-stars")!, { count: 100 });

  const msgEl = $("closing-message");
  if (msgEl) msgEl.textContent = birthdayConfig.closingMessage;

  const sigEl = $("closing-signature");
  if (sigEl) sigEl.textContent = birthdayConfig.closingSignature;

  const heartsEl = $("closing-hearts");
  if (heartsEl) heartsEl.textContent = "♥ ♥ ♥";
}

// ═══════════════════════════════════════════════════════════
// PHASE 10: Navigation
// ═══════════════════════════════════════════════════════════
function initNav() {
  const toggle = $("nav-toggle");
  const links = $("nav-links");

  toggle?.addEventListener("click", () => {
    const isOpen = links?.classList.contains("open");
    links?.classList.toggle("open", !isOpen);
    toggle.classList.toggle("active", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close nav on link click (mobile)
  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.classList.remove("active");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

// ═══════════════════════════════════════════════════════════
// PHASE 11: Scroll reveal
// ═══════════════════════════════════════════════════════════
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// ═══════════════════════════════════════════════════════════
// BOOTSTRAP
// ═══════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Opening scene always runs
  initOpeningScene();

  // Everything inside main-app
  initCountdown();
  initLetter();
  initEnvelopeSection();
  initGalleries();
  initTimeline();
  initNotes();
  initSurprise();
  initClosingScene();
  initNav();
  initScrollReveal();
  initMusic();
});
