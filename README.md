# Institute of Conversations · MNIT Jaipur
Official Club Website — *"Where Ideas Meet."*

---

## 🏛️ Executive Overview
The **Institute of Conversations (IoC · MNIT Jaipur)** is a student-led institutional platform for research-driven interviews, long-form conversation, storytelling, and an enduring archive of the voices of MNIT Jaipur.

This production web platform is engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Three.js / React Three Fiber**, **GSAP ScrollTrigger**, **Lenis**, and **Framer Motion**.

---

## 📂 Content Management Guide
All content is completely decoupled from the codebase and lives in `/content/*.json`. No database or CMS is needed.

### 1. Revealing Sponsors
Edit `content/sponsors.json`:
- Each sponsor item has `{ tier, name, logo, tag, url, revealed }`.
- To reveal an announced partner:
  1. Add their official brand name to `"name"`.
  2. Put their logo in `/public/assets/` and reference it in `"logo"` (e.g. `"/assets/partner-logo.png"`).
  3. Change `"revealed": false` to `"revealed": true`.
  4. The placard automatically transitions from the velvet wax-seal to the partner card.

### 2. Revealing Green Room Guests
Edit `content/guests.json`:
- Each guest entry has `{ id, name, designation, organisation, photo, tag, revealed }`.
- When an episode or guest interview is formally announced:
  1. Set `"name"`, `"designation"`, and `"organisation"`.
  2. Drop their portrait into `/public/assets/` and point `"photo"`.
  3. Change `"revealed": false` to `"revealed": true`.

### 3. Adding Team Members & Photos
Edit `content/team.json`:
- The org chart follows the handwritten founding charter (`WhatsApp Image 2026-11-07 at 4.01.52 PM.jpeg`):
  - **Leadership**: Faculty Advisor, Student Advisor
  - **Mentors (3rd Year)**: Social Media & Tech, Content, Publicity & Logistics
  - **Executives**: President, Vice President
  - **5 Operational Teams**: Social Media & Editing (11), Content, Research & Hosting (8), Publicity & Guest Outreach (5), Logistics & Decor (5), Tech Team (7)
- To update an individual:
  1. Replace `"name": "Name TBA"` with their real name.
  2. Drop their photo in `/public/assets/avatars/` and point `"photo"`.
  3. Fill `"bio"` with their individual bio or focus statement.

### 4. Filling the Director's Address
Edit `content/director.json`:
- To publish the Director's inaugural message:
  1. Add paragraphs to the `"message": []` array:
     ```json
     "message": [
       "Welcome to the Institute of Conversations at MNIT Jaipur...",
       "As our institute expands its horizon..."
     ]
     ```
  2. Drop the official photo of Prof. N. P. Padhy into `/public/assets/director.jpg`.

### 5. Adding Gallery Captures
Edit `content/gallery.json`:
- Place high-resolution photos into `/public/gallery/`.
- Add an item to `"items": []`:
  ```json
  {
    "id": "reel-1",
    "albumId": "voice-of-mnit",
    "title": "Inaugural Stage Setup",
    "caption": "Soundcheck and multi-camera angle alignment in Studio 1.",
    "image": "/gallery/stage-setup.jpg"
  }
  ```

### 6. Changing the Secretariat Contact Email
Edit `content/site.json`:
- Update `"contactEmail": "namitshastry@gmail.com"` to any university address.
- All footer links, mailto actions, and click-to-copy handlers update instantly.

---

## 🚀 Deployment Instructions

### Static Build & SSG Export
Run the standard build command:
```bash
npm run build
```
The production-optimized static site is generated into the `out/` folder, ready for deployment to **Vercel**, **GitHub Pages**, **Cloudflare Pages**, or **MNIT university servers**.

### Local Development
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

