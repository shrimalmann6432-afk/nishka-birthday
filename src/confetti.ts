/**
 * confetti.ts
 * Lightweight confetti animation on the HTML canvas.
 * Respects prefers-reduced-motion.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  rot: number;
  rotSpeed: number;
  shape: "rect" | "circle" | "heart";
  alpha: number;
}

const COLORS = [
  "#e8c5c0", // rose
  "#c9a96e", // gold
  "#8b3a3a", // burgundy
  "#f0e2c8", // champagne
  "#d4a0a0", // blush
  "#f8f4ef", // ivory
];

let particles: Particle[] = [];
let animId: number | null = null;
let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

function resize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createParticle(): Particle {
  const shapes: Particle["shape"][] = ["rect", "circle", "heart"];
  return {
    x: rand(0, window.innerWidth),
    y: rand(-120, -10),
    vx: rand(-1.5, 1.5),
    vy: rand(2, 5),
    r: rand(4, 10),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rot: rand(0, Math.PI * 2),
    rotSpeed: rand(-0.06, 0.06),
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    alpha: 1,
  };
}

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.beginPath();
  ctx.moveTo(x, y + size / 4);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
  ctx.bezierCurveTo(
    x - size / 2,
    y + size / 2,
    x,
    y + (size * 3) / 4,
    x,
    y + size
  );
  ctx.bezierCurveTo(
    x,
    y + (size * 3) / 4,
    x + size / 2,
    y + size / 2,
    x + size / 2,
    y + size / 4
  );
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
  ctx.closePath();
}

function animate() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.rotSpeed;
    p.vy += 0.03; // gravity

    if (p.y > canvas!.height + 20) {
      p.alpha -= 0.02;
    }

    ctx!.save();
    ctx!.globalAlpha = Math.max(0, p.alpha);
    ctx!.fillStyle = p.color;
    ctx!.translate(p.x, p.y);
    ctx!.rotate(p.rot);

    if (p.shape === "rect") {
      ctx!.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
    } else if (p.shape === "circle") {
      ctx!.beginPath();
      ctx!.arc(0, 0, p.r / 2, 0, Math.PI * 2);
      ctx!.fill();
    } else {
      drawHeart(ctx!, -p.r / 2, -p.r / 2, p.r);
      ctx!.fill();
    }

    ctx!.restore();
  });

  // Remove fully faded particles
  particles = particles.filter((p) => p.alpha > 0);

  if (particles.length > 0) {
    animId = requestAnimationFrame(animate);
  } else {
    animId = null;
  }
}

export function launchConfetti(particleCount = 200, duration = 4000): void {
  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  resize();

  // Spawn particles over time
  const batchSize = Math.ceil(particleCount / 8);
  let spawned = 0;

  function spawnBatch() {
    const toSpawn = Math.min(batchSize, particleCount - spawned);
    for (let i = 0; i < toSpawn; i++) {
      particles.push(createParticle());
    }
    spawned += toSpawn;
  }

  const interval = setInterval(() => {
    spawnBatch();
    if (spawned >= particleCount) clearInterval(interval);
  }, duration / 8);

  // Start animation loop if not already running
  if (!animId) {
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });
}

export function stopConfetti(): void {
  particles = [];
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
