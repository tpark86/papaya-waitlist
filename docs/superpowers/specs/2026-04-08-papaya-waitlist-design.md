# Papaya Waitlist Landing Page — Design Spec
**Date:** 2026-04-08  
**Project:** Papaya — Korean Kids' AI Sticker Printer  
**Audience:** Korean parents of young children  
**Goal:** Build pre-launch hype, collect emails, reward signups with exclusive discounts

---

## 1. Output Files

| File | Purpose |
|---|---|
| `index.html` | Main waitlist landing page |
| `thankyou.html` | Post-signup confirmation page |

Both files are self-contained HTML using Tailwind CDN (no build step). Fonts loaded from Google Fonts.

---

## 2. Design System

Follows `Papaya Design/DESIGN.md` — "The Tactile Playroom" system.

**Colors:**
- Background/surface: `#fcf5e5` (cream)
- Primary / CTA: `#e4002b` (bright red) — buttons use white text
- Secondary: `#00743c` (forest green)
- Card surface: `#ffffff`
- Text: `#383831` (warm near-black, never pure black)
- Accent pink: `#ff8eb2`
- Accent green: `#71f69d`

**Typography:**
- Headlines: Plus Jakarta Sans (Bold/Black)
- Body: Be Vietnam Pro
- No 1px borders for layout — use background shifts instead

**Component rules:**
- Sticker border: `outline: 4px solid #bbb9b0`
- Cards: white background, slight random rotation (-3° to +3°), hover straightens
- CTA buttons: red `#e4002b`, white text, pill shape (`border-radius: 9999px`), chunky bottom shadow `0 8px 0 0 #4e0008` for 3D pressable feel
- Decorative elements: slight rotations (2°–4°) for organic placement
- No pure black; no 1px grey lines

---

## 3. index.html — Section Breakdown

### 3.1 Sticky Navigation
- Left: "papaya" wordmark — red, italic, bold (Plus Jakarta Sans)
- Center: nav links — How it Works, Features, Safety, Community
- Right: "Join Waitlist" red pill CTA button
- Background: cream at 80% opacity with `backdrop-blur` (frosted plastic look)

### 3.2 Hero Section (two-column)
- **Left column:** Placeholder product image (square aspect ratio), slight +2° rotation, hover straightens. Green "AI Powered!" sticker badge overlapping bottom-right corner at +12° rotation.
- **Right column:**
  - Headline: "Stickers Born from Imagination." (Display LG, 6–8rem)
  - Subtext: "The first AI-powered sticker printer designed for Korean kids. Turn any drawing, word, or dream into a tactile sticker in seconds."
  - Email capture card (sticker border, cream surface):
    - Label: "Reserve your spot in the playground"
    - Email input field (rounded-xl, no border, focus ring = 3px red)
    - "Join Waitlist" red CTA button
    - Fine print: "Join 500+ parents already in line!"

### 3.3 Queue Tracker
- Cream card, slight -1° rotation, sticker border
- Green top-bar accent strip
- Left: ticket icon + "You are #501 in line" + "Early bird discount secured!"
- Right: avatar stack (4 placeholder circles) + "+8k" overflow bubble
- Note: this is a static pre-signup display — the actual personalized number appears on thankyou.html

### 3.4 Features Grid
- Full-width dark green (`#037f59`) background
- Section title: "Why Papaya?" — white, centered
- 3 white cards with icon, title, description, slight rotation:
  1. **AI Magic** — pink icon circle — "Simply describe what you want, and our kid-friendly AI generates a unique sticker in seconds."
  2. **Instant Fun** — green icon circle — "No ink, no mess. Thermal printing makes stickers pop out instantly, ready to peel and stick."
  3. **Kid-Safe** — red icon circle — "BPA-free materials and a moderated AI environment keep your child's safety our #1 priority."

### 3.5 Product Video
- Still on dark green background
- Placeholder thumbnail image (16:9 aspect ratio)
- Centered play button (white circle, green icon)
- Caption overlay: "Watch Papaya in Action!"
- Video src: placeholder for now, user will replace later

### 3.6 Parent Approved
- Cream background, two-column layout
- **Left:** Headline "Safety first, playtime always." + 3 bullet points:
  1. BPA-Free, Non-toxic sticker rolls tested for heavy metal safety.
  2. Curated AI engine with strict safety filters for age-appropriate content.
  3. Built-in parental controls via the Papaya Companion App.
- **Right:** KC Certification badge — white card, slight +6° rotation, sticker border. Blue circle with "KC" text, "KC Certified / Safety Standard" label.

### 3.7 Social Proof (IG Grid)
- Section label: "#MadeWithPapaya" in red uppercase
- Section title: "What Parents are Saying"
- 2×2 grid (4 items) on mobile, 4-column on desktop
- Each card: square aspect ratio, placeholder image, slight rotation, hover straightens, sticker border
- Overlay at bottom: IG handle (bold white) + short quote (smaller white)
- Handles/quotes:
  - @sunny_mom — "My kid is obsessed!"
  - @min_jun_dad — "Zero mess art time."
  - @playtime_korea — "Best birthday gift ever."
  - @art_with_jisu — "Endless creative joy!"

### 3.8 Bottom CTA Banner
- Red (`#e4002b`) full-width banner, sticker border
- Headline: "Ready to play?"
- Subtext: "We're launching soon. Join the waitlist now to get 10% off your first Papaya Starter Pack."
- Same email form as hero (white ghost input, white "Count Me In!" button with red text)

### 3.9 Footer
- Cream background (`#fcf9ef`)
- Left: "papaya" wordmark + nav links (INSTAGRAM, TIKTOK, SAFETY SPECS, PRIVACY) in small bold uppercase
- Right: "© 2026 PAPAYA. MADE FOR LITTLE CREATORS."

---

## 4. thankyou.html — Section Breakdown

Single centered page on cream background.

### 4.1 Header
- Papaya wordmark (links back to index.html)
- Large sticker-style celebratory illustration or emoji (placeholder)

### 4.2 Queue Position Card
- Sticker border, white card, slight rotation
- Large bold text: "You're #[N] in line!" — N pulled from URL param `?position=N`
- Subtext: "You've secured your early bird spot. We'll email you when it's your turn!"

### 4.3 Discount Code Card
- Green accent card
- Label: "Your exclusive discount"
- Code: "PAPAYA30" — large, monospaced, copyable
- Fine print: "10% off your first Papaya Starter Pack at launch"

### 4.4 Share Section
- Headline: "Move up the line — share with friends!"
- Subtext: "Every friend who joins pushes you closer to #1"
- 3 share buttons:
  - KakaoTalk (yellow)
  - Instagram (gradient purple-pink)
  - Copy Link (cream/outline)

### 4.5 Back Link
- Small text link: "← Back to papaya" linking to index.html

---

## 5. Google Sheets Integration

**How it works:**
1. User creates a Google Apps Script web app that accepts POST requests with an `email` field
2. Script appends `[timestamp, email, position]` to a Google Sheet
3. Script returns `{ "position": N }` where N = current row count + 500 (starting offset)
4. On success, the page JS reads position from response and redirects to `thankyou.html?position=N`
5. thankyou.html reads `position` from URL params and displays it

**Setup instructions for user** (included as a comment in index.html):
1. Go to script.google.com, create a new project
2. Paste the provided Apps Script code
3. Deploy as web app (anyone can access, run as me)
4. Copy the web app URL and paste it into index.html where indicated

**Fallback:** If the fetch fails, show an inline "Thanks! We'll be in touch." message instead of redirecting, so no signup is lost silently.

---

## 6. Out of Scope

- Real product photos/video (user will replace placeholders)
- Korean language copy (English for now, can be localized later)
- Actual KakaoTalk/Instagram share API integration (buttons copy/open share URL)
- Backend queue position tracking between sessions (position is calculated at signup time and stored in the URL)
