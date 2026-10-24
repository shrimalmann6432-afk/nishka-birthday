/**
 * envelope.ts
 * Handles the locked/unlocked envelope states and letter reveal.
 */

import { getBirthdayState } from "./countdown";

export type EnvelopeState = "locked" | "unlocked" | "open";

let currentState: EnvelopeState = "locked";
let onLetterOpen: (() => void) | null = null;

function $(id: string): HTMLElement | null {
  return document.getElementById(id);
}

/**
 * Initialise the envelope component.
 * @param openCallback - Called when the letter should be revealed.
 */
export function initEnvelope(openCallback: () => void): void {
  onLetterOpen = openCallback;

  const birthdayState = getBirthdayState();
  if (birthdayState === "birthday") {
    setEnvelopeUnlocked();
  } else {
    setEnvelopeLocked();
  }

  // Click / keyboard on the envelope itself
  const envelope = $("envelope");
  if (envelope) {
    envelope.addEventListener("click", handleEnvelopeClick);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleEnvelopeClick();
      }
    });
  }

  // The explicit "Open the Letter" button
  $("btn-open-envelope")?.addEventListener("click", () => {
    if (currentState === "unlocked") triggerOpen();
  });

  // Hero "Open Your Letter" button in birthday reveal
  $("btn-open-letter-hero")?.addEventListener("click", () => {
    scrollToLetter();
    if (currentState === "unlocked") triggerOpen();
  });
}

function handleEnvelopeClick(): void {
  if (currentState === "locked") {
    showLockedMessage();
  } else if (currentState === "unlocked") {
    triggerOpen();
  }
  // If already open, do nothing (letter is visible below)
}

function showLockedMessage(): void {
  const msg = $("envelope-locked-msg");
  if (!msg) return;
  msg.animate(
    [
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 400, easing: "ease-in-out" }
  );
}

export function setEnvelopeLocked(): void {
  currentState = "locked";
  const envelope = $("envelope");
  if (envelope) {
    envelope.classList.remove("open");
    envelope.setAttribute("aria-label", "Sealed birthday letter — locked until midnight on 31 October");
  }
  const openBtn = $("btn-open-envelope");
  if (openBtn) openBtn.classList.add("hidden");
}

export function setEnvelopeUnlocked(): void {
  currentState = "unlocked";
  const envelope = $("envelope");
  if (envelope) {
    envelope.setAttribute("aria-label", "Birthday letter — click to open");
  }
  const openBtn = $("btn-open-envelope");
  if (openBtn) openBtn.classList.remove("hidden");

  const lockedMsg = $("envelope-locked-msg");
  if (lockedMsg) lockedMsg.textContent = "Click the envelope to open your letter.";

  const capText = $("envelope-caption");
  if (capText) capText.textContent = "A letter, written just for you.";
}

function triggerOpen(): void {
  if (currentState === "open") return;
  currentState = "open";

  const envelope = $("envelope");
  if (envelope) {
    envelope.classList.add("open");
    envelope.setAttribute("aria-label", "Opening birthday letter...");
  }

  // After animation, reveal letter
  setTimeout(() => {
    if (onLetterOpen) onLetterOpen();
    const openBtn = $("btn-open-envelope");
    if (openBtn) openBtn.classList.add("hidden");
  }, 700);
}

function scrollToLetter(): void {
  $("letter")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
