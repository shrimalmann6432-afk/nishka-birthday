/**
 * music.ts
 * Optional background music player.
 * Muted by default — visitor must press play.
 * Handles missing audio file gracefully.
 */

export function initMusic(): void {
  const audio = document.getElementById("bg-audio") as HTMLAudioElement | null;
  const toggleBtn = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  const bars = document.getElementById("music-bars");

  if (!audio || !toggleBtn) return;

  // If the audio source fails to load, hide the player gracefully
  audio.addEventListener("error", () => {
    const player = document.getElementById("music-player");
    if (player) player.style.display = "none";
  });

  let isPlaying = false;

  function setPlaying(state: boolean) {
    isPlaying = state;
    toggleBtn!.setAttribute("aria-pressed", String(state));
    toggleBtn!.setAttribute("aria-label", state ? "Pause music" : "Play background music");
    if (icon) icon.textContent = state ? "♫" : "♪";
    if (bars) bars.classList.toggle("playing", state);
  }

  toggleBtn.addEventListener("click", async () => {
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Autoplay blocked or file missing — hide player
        const player = document.getElementById("music-player");
        if (player) player.style.display = "none";
      }
    }
  });

  audio.addEventListener("ended", () => setPlaying(false));
}
