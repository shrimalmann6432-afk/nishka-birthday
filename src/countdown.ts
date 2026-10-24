/**
 * countdown.ts
 * Live countdown to Nishka's birthday (31 Oct 2026 00:00:00 IST)
 *
 * Uses explicit UTC milliseconds derived from the IST target so the
 * countdown is timezone-independent on the client device.
 *
 * NOTE: Client-side time can be manipulated by the visitor. This is a
 * visual restriction only. For true pre-birthday confidentiality, add
 * a server-side time endpoint (see README §13).
 */

import { birthdayConfig } from "./content/birthdayConfig";

// Derive target epoch from ISO string (includes +05:30 offset)
const TARGET_MS = new Date(birthdayConfig.birthdayISO).getTime();

export type BirthdayState = "before" | "birthday";

/**
 * Returns the current birthday state based on the device clock.
 * Replace `Date.now()` with a server-fetched timestamp for hardened gating.
 */
export function getBirthdayState(): BirthdayState {
  return Date.now() >= TARGET_MS ? "birthday" : "before";
}

/** Returns remaining milliseconds. Never negative. */
export function getRemainingMs(): number {
  return Math.max(0, TARGET_MS - Date.now());
}

interface CountdownElements {
  days: HTMLElement;
  hours: HTMLElement;
  minutes: HTMLElement;
  seconds: HTMLElement;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function tick(el: HTMLElement, newVal: string) {
  if (el.textContent === newVal) return;
  el.textContent = newVal;
  el.classList.remove("tick");
  // Force reflow so animation retriggers
  void (el as HTMLElement).offsetWidth;
  el.classList.add("tick");
}

/**
 * Starts the countdown interval. Calls `onBirthday` when the target
 * time is reached for the first time in this session.
 */
export function startCountdown(
  els: CountdownElements,
  onBirthday: () => void
): void {
  let birthdayFired = false;

  function update() {
    const remaining = getRemainingMs();

    if (remaining <= 0) {
      tick(els.days, "00");
      tick(els.hours, "00");
      tick(els.minutes, "00");
      tick(els.seconds, "00");
      if (!birthdayFired) {
        birthdayFired = true;
        onBirthday();
      }
      return;
    }

    const totalSecs = Math.floor(remaining / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    tick(els.days, pad(days));
    tick(els.hours, pad(hours));
    tick(els.minutes, pad(mins));
    tick(els.seconds, pad(secs));
  }

  update(); // Immediate first render (no delay on load)
  setInterval(update, 1000);
}
