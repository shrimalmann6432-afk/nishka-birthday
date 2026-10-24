# Nishka's Birthday Website 🎂❤️

A cinematic, personalised birthday experience built with Vite + TypeScript + vanilla CSS.

---

## Table of Contents
1. [Running the project](#1-running-the-project)
2. [Building for production](#2-building-for-production)
3. [Changing the birthday configuration](#3-changing-the-birthday-configuration)
4. [Editing the birthday letter](#4-editing-the-birthday-letter)
5. [Editing the proposal](#5-editing-the-proposal)
6. [Adding photographs of us](#6-adding-photographs-of-us)
7. [Adding Nishka's solo photographs](#7-adding-nishkas-solo-photographs)
8. [Adding captions](#8-adding-captions)
9. [Adding personal notes](#9-adding-personal-notes)
10. [Adding memories](#10-adding-memories)
11. [Adding optional music](#11-adding-optional-music)
12. [Deploying the website](#12-deploying-the-website)
13. [About the midnight lock](#13-about-the-midnight-lock)
14. [Adding the future digital book](#14-adding-the-future-digital-book)

---

## 1. Running the project

```bash
# From the project directory:
npm install     # Only needed once
npm run dev     # Starts the dev server (usually at http://localhost:5173)
```

Open the URL shown in your terminal.

---

## 2. Building for production

```bash
npm run build
```

The finished website will be in the `dist/` folder. You can deploy that folder to any static host.

---

## 3. Changing the birthday configuration

Open **`src/content/birthdayConfig.ts`** in any text editor.

Every important piece of text — the recipient's name, the countdown target date, opening messages, headline, and closing text — is in this single file. Edit the values in quotes and save.

> **Do not change `birthdayISO`** unless you want to change the target date/time. The format must stay as an ISO 8601 string with the `+05:30` offset.

---

## 4. Editing the birthday letter

Open **`src/content/letterContent.ts`**.

- Replace each placeholder string in the `paragraphs` array with your own words.
- Update `salutation` to your personal greeting.
- Update `signatureClosing` and `signatureName` to your signature.

Each paragraph becomes a separate block of text in the letter. Add as many paragraphs as you like by adding more strings to the array.

---

## 5. Editing the proposal

Open **`src/content/proposalContent.ts`**.

- Replace each paragraph in the `confession` array with your honest words.
- The `question` field shows the final romantic question — edit it if you want different wording.
- `yesResponse` and `maybeResponse` are the messages shown after Nishka responds.

---

## 6. Adding photographs of us

1. Copy your photo files into **`public/images/us/`**
2. Open **`src/content/photoManifest.ts`**
3. Find the section labelled `Photos of us together`
4. Add or edit entries:

```typescript
{
  src: "/images/us/your-photo-filename.jpg",
  caption: "Write a caption here",
  date: "March 2025",
  alt: "Brief description for screen readers",
  layout: "landscape",   // "landscape", "portrait", or "square"
  category: "us",
}
```

5. Save the file. The gallery updates automatically.

**Supported formats:** JPG, PNG, WebP, AVIF

---

## 7. Adding Nishka's solo photographs

Same as above, but:
- Place files in **`public/images/nishka/`**
- Add entries with `category: "nishka"` in `photoManifest.ts`

---

## 8. Adding captions

In `photoManifest.ts`, the `caption` field on each photo entry is the caption shown beneath the photo and inside the lightbox. The `date` field shows a small date label.

---

## 9. Adding personal notes

Open **`src/content/notes.ts`**.

Each note has:
- `label` — the visible hint on the front of the card
- `content` — the message revealed when opened
- `color` — card colour: `"rose"`, `"champagne"`, `"sage"`, `"plum"`, or `"ivory"`

Add as many entries as you like.

---

## 10. Adding memories

Open **`src/content/memories.ts`**.

Each entry has:
- `date` — when it happened (e.g. `"Summer 2025"`)
- `title` — the short heading
- `body` — the longer description
- `icon` — an optional emoji
- `location` — an optional place name
- `photo` — an optional path to a photo

Memories appear in the order you write them.

---

## 11. Adding optional music

1. Place your music file at **`public/audio/background.mp3`**
2. The music player appears automatically. It is **muted by default** — Nishka must press play.
3. The website works perfectly with no audio file present.

> Only use music you have permission to use.

---

## 12. Deploying the website

### GitHub Pages (automatic deployment)

This project includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.
It builds the site and publishes the `dist/` folder to GitHub Pages whenever
you push to `main`.

#### Upload this project to an existing repository (Windows PowerShell)

Replace `USERNAME` and `REPOSITORY` with the values in your GitHub repository
URL. These commands clone the repository first, so its Git history is retained.
Review the cloned folder before copying if it already contains files you need
to keep; matching filenames are replaced by this project.

```powershell
cd "$HOME\OneDrive\Desktop"
git clone https://github.com/USERNAME/REPOSITORY.git nishka-birthday-publish
$source = "$HOME\OneDrive\Desktop\nishka bday"
$destination = "$HOME\OneDrive\Desktop\nishka-birthday-publish"
Get-ChildItem -LiteralPath $source -Force |
  Where-Object { $_.Name -notin @("node_modules", "dist", ".git") } |
  Copy-Item -Destination $destination -Recurse -Force
Set-Location $destination
git switch -C main
git add .
git commit -m "Add Nishka birthday website"
git push origin main
```

The copy includes the hidden `.github` workflow folder and `.gitignore`, but
does not upload `node_modules` or the generated `dist` output.

1. Push the project files, including `.github/workflows/deploy.yml`, to the
   `main` branch of your GitHub repository.
2. In GitHub, open **Settings → Pages** and set **Build and deployment → Source**
   to **GitHub Actions**.
3. Open the repository's **Actions** tab and wait for **Deploy to GitHub Pages**
   to complete successfully.
4. Open **Settings → Pages** to find the published URL. For a project repository,
   it is usually `https://USERNAME.github.io/REPOSITORY/`.

The Vite build uses relative asset paths, so the page and photos also load under
the repository subpath used by GitHub Pages.

### Other static hosts

Run `npm run build`, then deploy the generated `dist/` folder to Netlify,
Vercel, or Cloudflare Pages. For a private URL that only Nishka can access,
use a host that provides password protection.

---

## 13. About the midnight lock

The envelope and letter section are **visually locked** before midnight on 31 October 2026 (IST).

**How it works:**  
The lock uses the visitor's device clock. When the device time passes the birthday target, the envelope unlocks automatically.

**Security limitation:**  
This is a *visual restriction only*. Anyone who opens the browser DevTools, edits their device clock, or views the page source can read the letter content before the birthday, because all text is embedded in the JavaScript bundle.

**If you need genuine pre-birthday secrecy:**  
You would need to store the letter content on a server and only send it after a server-side time check. This requires a backend and is beyond the scope of the current static site. The code is structured so you can add a `/api/unlock` endpoint later without rewriting the frontend — simply replace the `getBirthdayState()` call in `src/countdown.ts` with a fetch to your server endpoint.

---

## 14. Adding the future digital book

The project architecture is ready for a future `/book` route.

**What to do:**

1. Create a new file: `src/book/BookPage.ts`
2. Add a new route entry in `vite.config.ts` (or use a client-side router like `wouter` or `navaid`)
3. Add a link in the navigation pointing to `/book`

**Suggested book structure:**

```
src/
  book/
    BookPage.ts       ← book component
    chapters.ts       ← content config (like letterContent.ts)
    BookStyles.css    ← book-specific styles
```

**Features to build:**
- An elegant cover with Nishka's name
- A table of contents
- Page-turning animation (CSS 3D or a library like `turn.js`)
- Full-page photographs with captions
- Personal letter chapters
- A final dedication page

All photo content from `photoManifest.ts` and letter content from `letterContent.ts` can be re-used directly.

---

*Built with love, for Nishka. 🌸*
