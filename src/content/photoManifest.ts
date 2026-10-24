/**
 * ============================================================
 * PHOTO MANIFEST
 * ============================================================
 * Add your photographs here.
 *
 * WHERE TO PUT PHOTOS:
 *   public/images/us/       → photos of you and Nishka together
 *   public/images/nishka/   → Nishka's solo photographs
 *   public/images/deco/     → decorative assets (optional)
 *
 * HOW TO ADD A PHOTO:
 *   1. Copy your image file into the correct folder above.
 *   2. Add a new object to the `us` or `nishka` array below.
 *   3. Fill in `src`, `caption`, `date`, and `alt`.
 *   4. The `layout` field is optional:
 *        "portrait"  → taller card (good for vertical photos)
 *        "landscape" → wider card (good for horizontal photos)
 *        "square"    → square card (default)
 *
 * EXAMPLE:
 *   {
 *     src: "/images/us/birthday-cafe.jpg",
 *     caption: "Our favourite café, the day we got caught in the rain.",
 *     date: "March 2025",
 *     alt: "Two friends laughing in a cosy café",
 *     layout: "landscape",
 *   }
 * ============================================================
 */

export interface Photo {
  src: string;
  caption: string;
  date: string;
  alt: string;
  layout?: "portrait" | "landscape" | "square";
  category: "us" | "nishka";
}

export const photos: Photo[] = [
  // ── Photos of us together ─────────────────────────────────
  {
    src: "/images/us/us-holding-hands-laugh.jpg",
    caption: "Her laughing her heart out while I stand there blushing, holding her hand like my whole world depends on it.",
    date: "That Unstoppable Laugh 🙈",
    alt: "Nishka laughing brightly while we hold hands",
    layout: "portrait",
    category: "us",
  },
  {
    src: "/images/us/us-hug-together.jpg",
    caption: "My absolute favourite place in the world — right next to her, claiming her side for lifetime.",
    date: "Right Next To You ❤️",
    alt: "With arm around her shoulder, smiling together",
    layout: "portrait",
    category: "us",
  },
  {
    src: "/images/us/us-fest-smile.jpg",
    caption: "Look at us pretending to be completely calm, decent, and civilized for five seconds straight.",
    date: "Traditional Night ✨",
    alt: "Us smiling together at the college fest",
    layout: "portrait",
    category: "us",
  },
  {
    src: "/images/us/us-traditional-duo.jpg",
    caption: "Hands down the most iconic duo of the night — 10/10 outfits, 100/10 chemistry.",
    date: "Iconic Duo 🪔",
    alt: "Us standing together in festive attire",
    layout: "portrait",
    category: "us",
  },

  // ── Nishka's solo photographs ─────────────────────────────
  // Nishka's photos with personalized captions
  {
    src: "/images/nishka/nishka-saree-night.jpg",
    caption: "Stealing the night effortlessly — glowing brighter than every fairy light around.",
    date: "Festive Radiance ✨",
    alt: "Nishka looking gorgeous in a pink saree with fairy lights",
    layout: "portrait",
    category: "nishka",
  },
  {
    src: "/images/nishka/nishka-traditional.jpg",
    caption: "Grace, sunshine, and the gentlest smile that makes the whole world feel peaceful.",
    date: "Sunlit Elegance 🌿",
    alt: "Nishka in white and orange traditional attire standing gracefully outdoors",
    layout: "portrait",
    category: "nishka",
  },
  {
    src: "/images/nishka/nishka-hearts.jpg",
    caption: "That playful spark and candid warmth that never fails to make my heart smile.",
    date: "Pure Joy & Sweetness 💖",
    alt: "Nishka's cute selfie with heart filter and traditional jhumkas",
    layout: "portrait",
    category: "nishka",
  },
];

export const usPhotos = photos.filter((p) => p.category === "us");
export const nishkaPhotos = photos.filter((p) => p.category === "nishka");
