/**
 * stars.ts
 * Generates tiny animated star particles inside a given container element.
 */

interface StarOptions {
  count?: number;
  maxSize?: number;
  color?: string;
}

export function createStars(
  container: HTMLElement,
  options: StarOptions = {}
): void {
  const { count = 80, maxSize = 2, color = "rgba(255,248,220,0.9)" } = options;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * maxSize + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = (Math.random() * 4 + 2).toFixed(1);
    const delay = -(Math.random() * 5).toFixed(1);

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      background: ${color};
      --dur: ${dur}s;
      --delay: ${delay}s;
    `;

    container.appendChild(star);
  }
}
