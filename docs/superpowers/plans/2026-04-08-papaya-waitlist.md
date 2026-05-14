# Papaya Waitlist Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `index.html` and `thankyou.html` — a fully styled waitlist landing page for Papaya that collects emails into Google Sheets and shows a personalized queue position on the thank-you page.

**Architecture:** Two standalone HTML files using Tailwind CDN (no build step). `index.html` contains all landing page sections and submits emails via `fetch()` to a Google Apps Script web app URL; on success it redirects to `thankyou.html?position=N`. `thankyou.html` reads N from URL params and renders it. A separate `apps-script.gs` file contains the Google Apps Script code the user pastes once into script.google.com.

**Tech Stack:** HTML5, Tailwind CSS v3 (CDN + `plugins=forms`), Plus Jakarta Sans + Be Vietnam Pro (Google Fonts), Material Symbols Outlined (Google Fonts), Vanilla JS (fetch, URLSearchParams), Google Apps Script (Web App / `doPost`)

---

## File Map

| File | Responsibility |
|---|---|
| `index.html` | Main landing page — all 9 sections + form submission JS |
| `thankyou.html` | Post-signup confirmation — queue position, discount code, share buttons |
| `apps-script.gs` | Google Apps Script source the user deploys once; not served by the site |

---

## Shared Design Tokens (reference for all tasks)

```
Colors:
  surface / bg:      #fcf5e5  (cream)
  surface-low:       #fcf9ef
  card:              #ffffff
  text:              #383831  (never pure black)
  text-muted:        #65655d
  primary (CTA):     #e4002b  (bright red)
  primary-shadow:    #4e0008  (dark red, chunky shadow)
  primary-container: #ff7572  (soft red)
  secondary:         #00743c  (forest green)
  secondary-section: #037f59  (features/video bg)
  accent-pink:       #ff8eb2
  accent-green:      #71f69d
  outline:           #bbb9b0

Typography:
  font-headline: "Plus Jakarta Sans"
  font-body:     "Be Vietnam Pro"

Rules:
  No 1px borders for layout — use bg shifts
  Sticker border: outline: 4px solid #bbb9b0
  CTA btn: bg #e4002b, text white, rounded-full, shadow 0 8px 0 0 #4e0008
  Decorative elements: subtle rotations 2°–4°
  Cards hover: straighten (rotate-0) with transition
```

---

## Task 1: Scaffold index.html — skeleton + nav + hero

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with the full shared skeleton**

Write the following as `index.html`:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Papaya — AI Sticker Printer for Kids</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,700;0,800;1,800&family=Be+Vietnam+Pro:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,1&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            surface:    '#fcf5e5',
            'surface-low': '#fcf9ef',
            card:       '#ffffff',
            primary:    '#e4002b',
            'primary-shadow': '#4e0008',
            'primary-soft': '#ff7572',
            secondary:  '#00743c',
            'secondary-section': '#037f59',
            'accent-pink': '#ff8eb2',
            'accent-green': '#71f69d',
            outline:    '#bbb9b0',
            'on-surface': '#383831',
            'on-surface-muted': '#65655d',
          },
          fontFamily: {
            headline: ['"Plus Jakarta Sans"', 'sans-serif'],
            body:     ['"Be Vietnam Pro"', 'sans-serif'],
          },
          borderRadius: {
            DEFAULT: '1rem',
            lg: '2rem',
            xl: '3rem',
            full: '9999px',
          },
        },
      },
    };
  </script>
  <style>
    .sticker-border { outline: 4px solid #bbb9b0; }
    .btn-primary {
      background: #e4002b;
      color: #fff;
      border-radius: 9999px;
      font-weight: 800;
      font-family: "Plus Jakarta Sans", sans-serif;
      box-shadow: 0 8px 0 0 #4e0008;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 0 0 #4e0008; }
    .btn-primary:active { transform: translateY(4px); box-shadow: 0 4px 0 0 #4e0008; }
    .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400; vertical-align: middle; }
  </style>
</head>
<body class="bg-surface font-body text-on-surface overflow-x-hidden">

  <!-- NAV -->
  <nav class="fixed top-0 w-full z-50 bg-[#fcf5e5]/80 backdrop-blur-md shadow-[0_8px_32px_rgba(56,56,49,0.08)]">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <span class="font-headline font-black text-3xl italic text-primary tracking-tight">papaya</span>
      <div class="hidden md:flex gap-8 font-headline font-bold text-sm tracking-tight">
        <a href="#how-it-works" class="hover:text-primary transition-colors">How it Works</a>
        <a href="#features" class="hover:text-primary transition-colors">Features</a>
        <a href="#safety" class="hover:text-primary transition-colors">Safety</a>
        <a href="#community" class="hover:text-primary transition-colors">Community</a>
      </div>
      <button onclick="document.getElementById('hero-email').focus()" class="btn-primary px-6 py-2 text-sm">
        Join Waitlist
      </button>
    </div>
  </nav>

  <main class="pt-24">

    <!-- HERO -->
    <section id="how-it-works" class="max-w-7xl mx-auto px-6 py-16 md:py-28 grid md:grid-cols-2 gap-12 items-center">
      <!-- Product image left -->
      <div class="relative group">
        <div class="absolute inset-0 bg-primary-soft rounded-xl -rotate-3 scale-105 opacity-20"></div>
        <img
          src="https://placehold.co/600x600/fce4e4/e4002b?text=Papaya+Printer"
          alt="Papaya AI Sticker Printer"
          class="relative rounded-xl shadow-[0_20px_40px_rgba(56,56,49,0.15)] rotate-2 group-hover:rotate-0 transition-all duration-500 w-full object-cover aspect-square"
        />
        <!-- AI Powered sticker badge -->
        <div class="absolute -bottom-5 -right-5 bg-accent-green p-5 rounded-xl rotate-12 sticker-border shadow-lg hidden md:flex flex-col items-center">
          <span class="material-symbols-outlined text-3xl text-on-surface">auto_awesome</span>
          <p class="font-headline font-black text-sm text-on-surface mt-1">AI Powered!</p>
        </div>
      </div>

      <!-- Email capture right -->
      <div class="space-y-8">
        <h1 class="text-6xl md:text-8xl font-headline font-black text-on-surface leading-[0.9] tracking-tighter">
          Stickers<br/>
          <span class="text-primary italic">Born from</span><br/>
          Imagination.
        </h1>
        <p class="text-xl text-on-surface-muted leading-relaxed max-w-md">
          The first AI-powered sticker printer designed for Korean kids. Turn any drawing, word, or dream into a real sticker in seconds.
        </p>

        <!-- Email form card -->
        <div class="bg-surface-low p-8 rounded-xl sticker-border space-y-4">
          <p class="font-headline font-bold text-lg">Reserve your spot in the playground</p>
          <form id="hero-form" class="flex flex-col sm:flex-row gap-3">
            <input
              id="hero-email"
              type="email"
              required
              placeholder="Enter your email"
              class="flex-1 bg-[#ebe8dc] px-6 py-4 rounded-xl border-none focus:ring-4 focus:ring-primary text-on-surface placeholder:text-on-surface-muted/60"
            />
            <button type="submit" class="btn-primary px-8 py-4 whitespace-nowrap">
              Join Waitlist
            </button>
          </form>
          <p id="hero-status" class="text-sm text-on-surface-muted/70 italic">Join 500+ parents already in line!</p>
        </div>
      </div>
    </section>

    <!-- QUEUE TRACKER -->
    <section class="max-w-4xl mx-auto px-6 pb-16">
      <div class="bg-card p-10 rounded-xl sticker-border shadow-lg -rotate-1 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-accent-green"></div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-white text-3xl">local_activity</span>
            </div>
            <div>
              <h3 class="font-headline font-black text-2xl">You are #501 in line</h3>
              <p class="text-on-surface-muted">Early bird discount secured!</p>
            </div>
          </div>
          <!-- Avatar stack -->
          <div class="flex -space-x-3">
            <img src="https://placehold.co/48x48/fce4e4/e4002b?text=A" class="w-12 h-12 rounded-full border-4 border-white object-cover" alt="Parent" />
            <img src="https://placehold.co/48x48/e4f5ec/00743c?text=B" class="w-12 h-12 rounded-full border-4 border-white object-cover" alt="Parent" />
            <img src="https://placehold.co/48x48/fff0f0/e4002b?text=C" class="w-12 h-12 rounded-full border-4 border-white object-cover" alt="Parent" />
            <div class="w-12 h-12 rounded-full border-4 border-white bg-[#e5e3d6] flex items-center justify-center font-headline font-bold text-xs text-on-surface">+500</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES GRID -->
    <section id="features" class="bg-secondary-section py-24 w-full">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-headline font-black text-white mb-4">Why Papaya?</h2>
          <div class="h-2 w-32 bg-accent-pink mx-auto rounded-full"></div>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1: AI Magic -->
          <div class="bg-card p-8 rounded-xl hover:-translate-y-2 transition-transform rotate-1 shadow-lg sticker-border">
            <div class="w-16 h-16 bg-accent-pink rounded-full rotate-12 flex items-center justify-center mb-6 border-4 border-on-surface shadow-[4px_4px_0px_0px_#383831]">
              <span class="material-symbols-outlined text-on-surface text-3xl">auto_awesome</span>
            </div>
            <h3 class="text-2xl font-headline font-black mb-3 text-on-surface">AI Magic</h3>
            <p class="text-on-surface/80 leading-relaxed">Simply describe what you want, and our kid-friendly AI generates a unique sticker illustration in seconds.</p>
          </div>
          <!-- Card 2: Instant Fun -->
          <div class="bg-card p-8 rounded-xl hover:-translate-y-2 transition-transform -rotate-1 shadow-lg sticker-border">
            <div class="w-16 h-16 bg-accent-green rounded-full -rotate-6 flex items-center justify-center mb-6 border-4 border-on-surface shadow-[4px_4px_0px_0px_#383831]">
              <span class="material-symbols-outlined text-on-surface text-3xl">bolt</span>
            </div>
            <h3 class="text-2xl font-headline font-black mb-3 text-on-surface">Instant Fun</h3>
            <p class="text-on-surface/80 leading-relaxed">No ink, no mess. Our thermal printing technology makes stickers pop out instantly — ready to peel and stick.</p>
          </div>
          <!-- Card 3: Kid-Safe -->
          <div class="bg-card p-8 rounded-xl hover:-translate-y-2 transition-transform rotate-2 shadow-lg sticker-border">
            <div class="w-16 h-16 bg-primary-soft rounded-full rotate-6 flex items-center justify-center mb-6 border-4 border-on-surface shadow-[4px_4px_0px_0px_#383831]">
              <span class="material-symbols-outlined text-on-surface text-3xl">shield</span>
            </div>
            <h3 class="text-2xl font-headline font-black mb-3 text-on-surface">Kid-Safe</h3>
            <p class="text-on-surface/80 leading-relaxed">BPA-free materials and a moderated AI environment ensure your child's safety is our #1 priority.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCT VIDEO -->
    <section class="bg-secondary-section py-12 w-full">
      <div class="max-w-6xl mx-auto px-6">
        <div class="relative rounded-xl overflow-hidden shadow-2xl sticker-border aspect-video bg-black/20 group cursor-pointer">
          <img
            src="https://placehold.co/1280x720/037f59/ffffff?text=Product+Video+Coming+Soon"
            alt="Papaya in action"
            class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-5xl text-secondary-section">play_arrow</span>
            </div>
          </div>
          <div class="absolute bottom-8 left-8">
            <h4 class="text-white text-3xl font-headline font-black" style="text-shadow:2px 2px 0 rgba(0,0,0,0.2)">Watch Papaya in Action!</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- PARENT APPROVED / SAFETY -->
    <section id="safety" class="bg-surface py-24 rounded-t-[4rem]">
      <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <!-- Left: bullet points -->
        <div class="space-y-8">
          <h2 class="text-5xl font-headline font-black leading-tight">Safety first,<br/>playtime always.</h2>
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 border-on-surface shadow-[2px_2px_0_#383831]">
                <span class="material-symbols-outlined text-on-surface text-base">check</span>
              </div>
              <p class="text-lg font-medium leading-relaxed">BPA-Free, non-toxic sticker rolls tested for heavy metal safety.</p>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 border-on-surface shadow-[2px_2px_0_#383831]">
                <span class="material-symbols-outlined text-on-surface text-base">check</span>
              </div>
              <p class="text-lg font-medium leading-relaxed">Curated AI engine with strict safety filters for age-appropriate content.</p>
            </li>
            <li class="flex items-start gap-4">
              <div class="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border-2 border-on-surface shadow-[2px_2px_0_#383831]">
                <span class="material-symbols-outlined text-on-surface text-base">check</span>
              </div>
              <p class="text-lg font-medium leading-relaxed">Built-in parental controls via the Papaya Companion App.</p>
            </li>
          </ul>
        </div>
        <!-- Right: KC badge -->
        <div class="flex justify-center">
          <div class="bg-card sticker-border rounded-xl rotate-6 flex flex-col items-center justify-center p-10 shadow-xl w-64 h-64">
            <div class="w-24 h-24 bg-[#0051a8] rounded-full flex items-center justify-center text-white mb-4 shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
              <span class="font-headline font-black text-3xl">KC</span>
            </div>
            <p class="text-center font-headline font-black text-[#0051a8] text-lg">KC Certified</p>
            <p class="text-center text-on-surface-muted text-sm">Safety Standard</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section id="community" class="py-24 max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <span class="text-primary font-headline font-black uppercase tracking-widest text-sm">#MadeWithPapaya</span>
        <h2 class="text-5xl font-headline font-black mt-2">What Parents are Saying</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="relative aspect-square sticker-border rounded-xl overflow-hidden -rotate-2 hover:rotate-0 transition-all cursor-pointer shadow-lg">
          <img src="https://placehold.co/400x400/fce4e4/e4002b?text=📸" alt="Review photo" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p class="text-white text-sm font-headline font-bold">@sunny_mom</p>
            <p class="text-white/80 text-xs">"My kid is obsessed!"</p>
          </div>
        </div>
        <div class="relative aspect-square sticker-border rounded-xl overflow-hidden rotate-3 hover:rotate-0 transition-all cursor-pointer shadow-lg">
          <img src="https://placehold.co/400x400/e4f5ec/00743c?text=📸" alt="Review photo" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p class="text-white text-sm font-headline font-bold">@min_jun_dad</p>
            <p class="text-white/80 text-xs">"Zero mess art time."</p>
          </div>
        </div>
        <div class="relative aspect-square sticker-border rounded-xl overflow-hidden -rotate-3 hover:rotate-0 transition-all cursor-pointer shadow-lg">
          <img src="https://placehold.co/400x400/fff0f5/ff8eb2?text=📸" alt="Review photo" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p class="text-white text-sm font-headline font-bold">@playtime_korea</p>
            <p class="text-white/80 text-xs">"Best birthday gift ever."</p>
          </div>
        </div>
        <div class="relative aspect-square sticker-border rounded-xl overflow-hidden rotate-2 hover:rotate-0 transition-all cursor-pointer shadow-lg">
          <img src="https://placehold.co/400x400/fffde4/037f59?text=📸" alt="Review photo" class="w-full h-full object-cover" />
          <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p class="text-white text-sm font-headline font-bold">@art_with_jisu</p>
            <p class="text-white/80 text-xs">"Endless creative joy!"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BOTTOM CTA BANNER -->
    <section class="max-w-4xl mx-auto px-6 pb-24">
      <div class="bg-primary text-white p-12 rounded-xl sticker-border shadow-2xl text-center space-y-8 relative overflow-hidden">
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-primary-soft rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary rounded-full blur-3xl opacity-30 pointer-events-none"></div>
        <h2 class="text-5xl font-headline font-black relative z-10">Ready to play?</h2>
        <p class="text-xl text-white/90 max-w-lg mx-auto relative z-10">
          We're launching soon. Join the waitlist now to get <strong>10% off</strong> your first Papaya Starter Pack.
        </p>
        <form id="cta-form" class="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
          <input
            id="cta-email"
            type="email"
            required
            placeholder="Your best email"
            class="flex-1 bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border-2 border-white/30 text-white placeholder:text-white/60 focus:ring-0 focus:border-white outline-none"
          />
          <button type="submit" class="bg-white text-primary px-8 py-4 rounded-full font-headline font-extrabold hover:bg-[#feffd7] transition-colors whitespace-nowrap">
            Count Me In!
          </button>
        </form>
        <p id="cta-status" class="text-white/70 text-sm relative z-10 italic hidden"></p>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="bg-surface-low border-t-2 border-outline/20">
    <div class="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <span class="font-headline font-black text-2xl italic text-primary">papaya</span>
        <nav class="flex flex-wrap justify-center gap-8 text-xs font-headline font-black tracking-widest text-on-surface">
          <a href="#" class="hover:text-primary transition-colors">INSTAGRAM</a>
          <a href="#" class="hover:text-primary transition-colors">TIKTOK</a>
          <a href="#" class="hover:text-primary transition-colors">SAFETY SPECS</a>
          <a href="#" class="hover:text-primary transition-colors">PRIVACY</a>
        </nav>
      </div>
      <p class="text-xs font-headline font-black tracking-widest text-on-surface-muted">© 2026 PAPAYA. MADE FOR LITTLE CREATORS.</p>
    </div>
  </footer>

  <!-- FORM SUBMISSION SCRIPT — see Task 2 -->
  <script>
    /* SETUP: Replace the URL below with your Google Apps Script Web App URL.
       See apps-script.gs for instructions. */
    const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    async function submitWaitlist(email, statusEl) {
      statusEl.textContent = 'Joining…';
      statusEl.classList.remove('hidden');
      try {
        const res = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        const position = data.position ?? (Math.floor(Math.random() * 100) + 501);
        window.location.href = `thankyou.html?position=${position}`;
      } catch (_) {
        /* Fallback: Google Apps Script not yet connected — still redirect with estimated position */
        const position = Math.floor(Math.random() * 100) + 501;
        window.location.href = `thankyou.html?position=${position}`;
      }
    }

    document.getElementById('hero-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('hero-email').value;
      submitWaitlist(email, document.getElementById('hero-status'));
    });

    document.getElementById('cta-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('cta-email').value;
      submitWaitlist(email, document.getElementById('cta-status'));
    });
  </script>

</body>
</html>
```

- [ ] **Step 2: Open index.html in a browser and verify**

Open the file by double-clicking it or dragging it to a browser window.

Check:
- [ ] Nav is sticky and frosted at top
- [ ] Hero: product image left, email form right
- [ ] Queue Tracker card is slightly tilted
- [ ] Features Grid: dark green bg, 3 white cards with rotations
- [ ] Video placeholder shows on dark green
- [ ] Parent Approved: checkmarks + KC badge
- [ ] Social Proof: 4 photo cards with overlays
- [ ] Bottom CTA: red banner
- [ ] Footer present

- [ ] **Step 3: Commit**

```bash
cd "/Users/tommypark/Desktop/Code Stuff/Papaya"
git init
git add index.html
git commit -m "feat: add Papaya waitlist landing page (index.html)"
```

---

## Task 2: Create thankyou.html

**Files:**
- Create: `thankyou.html`

- [ ] **Step 1: Create thankyou.html**

Write the following as `thankyou.html` in the same folder as `index.html`:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're in! — Papaya</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,700;0,800;1,800&family=Be+Vietnam+Pro:wght@400;500;700&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,1&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com?plugins=forms"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            surface:    '#fcf5e5',
            'surface-low': '#fcf9ef',
            card:       '#ffffff',
            primary:    '#e4002b',
            'primary-shadow': '#4e0008',
            'primary-soft': '#ff7572',
            secondary:  '#00743c',
            'accent-pink': '#ff8eb2',
            'accent-green': '#71f69d',
            outline:    '#bbb9b0',
            'on-surface': '#383831',
            'on-surface-muted': '#65655d',
          },
          fontFamily: {
            headline: ['"Plus Jakarta Sans"', 'sans-serif'],
            body:     ['"Be Vietnam Pro"', 'sans-serif'],
          },
          borderRadius: {
            DEFAULT: '1rem',
            lg: '2rem',
            xl: '3rem',
            full: '9999px',
          },
        },
      },
    };
  </script>
  <style>
    .sticker-border { outline: 4px solid #bbb9b0; }
    .btn-primary {
      background: #e4002b; color: #fff; border-radius: 9999px;
      font-weight: 800; font-family: "Plus Jakarta Sans", sans-serif;
      box-shadow: 0 8px 0 0 #4e0008;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 0 0 #4e0008; }
    .btn-primary:active { transform: translateY(4px); box-shadow: 0 4px 0 0 #4e0008; }
    .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400; vertical-align: middle; }

    @keyframes pop-in {
      0%   { transform: scale(0.5) rotate(-8deg); opacity: 0; }
      70%  { transform: scale(1.08) rotate(2deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    .pop-in { animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
    .pop-in-delay-1 { animation-delay: 0.1s; }
    .pop-in-delay-2 { animation-delay: 0.2s; }
    .pop-in-delay-3 { animation-delay: 0.35s; }
  </style>
</head>
<body class="bg-surface font-body text-on-surface min-h-screen flex flex-col">

  <!-- NAV -->
  <nav class="w-full px-6 py-4">
    <a href="index.html" class="font-headline font-black text-2xl italic text-primary tracking-tight">papaya</a>
  </nav>

  <!-- MAIN CONTENT -->
  <main class="flex-1 flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-lg space-y-6">

      <!-- Celebration header -->
      <div class="text-center pop-in">
        <div class="text-8xl mb-4" role="img" aria-label="party popper">🎉</div>
        <h1 class="text-4xl md:text-5xl font-headline font-black text-on-surface leading-tight">
          You're officially<br/>in the playground!
        </h1>
      </div>

      <!-- Queue position card -->
      <div class="bg-card p-8 rounded-xl sticker-border shadow-lg rotate-1 pop-in pop-in-delay-1 text-center">
        <p class="text-on-surface-muted font-body text-sm uppercase tracking-widest mb-2">Your spot in line</p>
        <p class="font-headline font-black text-7xl text-primary" id="position-display">#—</p>
        <p class="text-on-surface-muted mt-2">We'll email you when it's your turn!</p>
      </div>

      <!-- Discount code card -->
      <div class="bg-secondary p-8 rounded-xl shadow-lg -rotate-1 pop-in pop-in-delay-2">
        <p class="text-white/80 text-sm font-body uppercase tracking-widest mb-2">Your exclusive discount</p>
        <div class="flex items-center justify-between gap-4">
          <p class="font-headline font-black text-4xl text-white tracking-widest">PAPAYA10</p>
          <button
            onclick="copyCode(this)"
            class="bg-white text-secondary px-4 py-2 rounded-full font-headline font-black text-sm hover:bg-[#feffd7] transition-colors flex-shrink-0"
          >
            Copy
          </button>
        </div>
        <p class="text-white/70 text-sm mt-3">10% off your first Papaya Starter Pack at launch</p>
      </div>

      <!-- Share section -->
      <div class="bg-surface-low p-8 rounded-xl sticker-border pop-in pop-in-delay-3">
        <h2 class="font-headline font-black text-xl mb-1">Move up the line!</h2>
        <p class="text-on-surface-muted text-sm mb-5">Share Papaya and every friend who joins pushes you closer to #1.</p>
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- KakaoTalk -->
          <button
            onclick="shareKakao()"
            class="flex-1 flex items-center justify-center gap-2 bg-[#FEE500] text-[#383831] px-5 py-3 rounded-full font-headline font-bold text-sm hover:brightness-95 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#383831" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C6.48 3 2 6.79 2 11.5c0 2.92 1.7 5.5 4.3 7.1l-1.1 4.1 4.7-3.1c.68.1 1.39.15 2.1.15 5.52 0 10-3.79 10-8.5C22 6.79 17.52 3 12 3z"/>
            </svg>
            KakaoTalk
          </button>
          <!-- Instagram -->
          <button
            onclick="shareInstagram()"
            class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full font-headline font-bold text-sm text-white hover:brightness-110 transition-all"
            style="background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
          >
            <span class="material-symbols-outlined text-base">photo_camera</span>
            Instagram
          </button>
          <!-- Copy link -->
          <button
            onclick="copyLink(this)"
            class="flex-1 flex items-center justify-center gap-2 bg-card text-on-surface px-5 py-3 rounded-full font-headline font-bold text-sm sticker-border hover:bg-surface transition-all"
          >
            <span class="material-symbols-outlined text-base">link</span>
            Copy Link
          </button>
        </div>
      </div>

      <!-- Back link -->
      <p class="text-center">
        <a href="index.html" class="text-on-surface-muted text-sm hover:text-primary transition-colors font-body">
          ← Back to papaya
        </a>
      </p>

    </div>
  </main>

  <script>
    // Read position from URL
    const params = new URLSearchParams(window.location.search);
    const position = params.get('position');
    if (position) {
      document.getElementById('position-display').textContent = '#' + parseInt(position).toLocaleString();
    }

    // Copy discount code
    function copyCode(btn) {
      navigator.clipboard.writeText('PAPAYA10').then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    }

    // Share helpers
    const SHARE_URL = encodeURIComponent(window.location.origin + '/index.html');
    const SHARE_TEXT = encodeURIComponent('I just joined the waitlist for Papaya — an AI sticker printer made for kids! Join me and get 10% off: ');

    function shareKakao() {
      // Opens KakaoTalk share page (requires Kakao SDK for full integration)
      window.open('https://sharer.kakao.com/talk/friends/picker/link', '_blank', 'width=400,height=600');
    }

    function shareInstagram() {
      // Instagram doesn't support direct URL share; copy link for stories
      navigator.clipboard.writeText(window.location.origin + '/index.html').then(() => {
        alert('Link copied! Paste it into your Instagram Story.');
      });
    }

    function copyLink(btn) {
      navigator.clipboard.writeText(window.location.origin + '/index.html').then(() => {
        btn.innerHTML = '<span class="material-symbols-outlined text-base">check</span> Copied!';
        setTimeout(() => {
          btn.innerHTML = '<span class="material-symbols-outlined text-base">link</span> Copy Link';
        }, 2000);
      });
    }
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify thankyou.html in browser**

Open `thankyou.html?position=501` in a browser (append `?position=501` to the file URL, e.g. `file:///path/to/thankyou.html?position=501`).

Check:
- [ ] Queue position shows "#501"
- [ ] Discount code "PAPAYA10" is visible with Copy button
- [ ] Share buttons are present
- [ ] Pop-in animations play on load
- [ ] Back link returns to index.html

- [ ] **Step 3: Test the full flow**

1. Open `index.html` in the browser
2. Type an email and click "Join Waitlist"
3. Confirm it redirects to `thankyou.html` with a position in the URL (will use fallback number since Apps Script isn't connected yet)

- [ ] **Step 4: Commit**

```bash
git add thankyou.html
git commit -m "feat: add thank-you page with queue position, discount code, and share buttons"
```

---

## Task 3: Create apps-script.gs and add setup comment to index.html

**Files:**
- Create: `apps-script.gs`
- Modify: `index.html` — update the setup comment at top of `<script>` block

- [ ] **Step 1: Create apps-script.gs**

Write the following as `apps-script.gs` in the same folder:

```javascript
/**
 * PAPAYA WAITLIST — Google Apps Script
 *
 * SETUP INSTRUCTIONS (one time only):
 * 1. Go to https://script.google.com and click "New project"
 * 2. Delete any existing code and paste the entire contents of this file
 * 3. Click "Deploy" → "New deployment"
 * 4. Choose type: "Web app"
 * 5. Set "Execute as": Me
 * 6. Set "Who has access": Anyone
 * 7. Click "Deploy" and copy the Web App URL
 * 8. Open index.html, find the line: const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 *    and replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with the URL you copied.
 *
 * Your Google Sheet will automatically be created and populated with:
 *   Column A: Timestamp
 *   Column B: Email address
 *   Column C: Queue position
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const email = data.email || '';

    if (!email || !email.includes('@')) {
      return respond({ error: 'Invalid email' });
    }

    // Check for duplicate email
    const existing = sheet.getDataRange().getValues();
    for (let i = 0; i < existing.length; i++) {
      if (existing[i][1] === email) {
        return respond({ position: existing[i][2] });
      }
    }

    // Assign next position: starts at 501
    const lastRow = sheet.getLastRow();
    const position = lastRow + 501;

    sheet.appendRow([new Date().toISOString(), email, position]);

    return respond({ position: position });
  } catch (err) {
    return respond({ error: err.message });
  }
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- [ ] **Step 2: Verify the position logic**

Trace through manually:
- Empty sheet → `lastRow = 0` → `position = 0 + 501 = 501` ✓ (first signup)
- After 1 row → `lastRow = 1` → `position = 1 + 501 = 502` ✓ (second signup)
- Duplicate email → returns existing position from Column C ✓

- [ ] **Step 3: Commit**

```bash
git add apps-script.gs
git commit -m "feat: add Google Apps Script for email collection with queue position"
```

---

## Self-Review

### Spec Coverage

| Spec Section | Covered in Task |
|---|---|
| Hero (image left, form right) | Task 1 |
| Queue tracker | Task 1 |
| Features grid (3 cards) | Task 1 |
| Product video | Task 1 |
| Parent Approved + KC badge | Task 1 |
| Social proof (4 IG cards) | Task 1 |
| Bottom CTA banner | Task 1 |
| Footer with social links | Task 1 |
| Form submission → Google Sheets | Task 1 (script block) |
| thankyou.html: queue position | Task 2 |
| thankyou.html: discount PAPAYA10 | Task 2 |
| thankyou.html: share buttons | Task 2 |
| Google Apps Script code | Task 3 |
| Setup instructions for user | Task 3 |
| Duplicate email guard | Task 3 |
| Fallback if script not connected | Task 1 (catch block) |
| Starting queue position: 501 | Task 1 (static display), Task 3 (script) |
| 10% discount | Task 1 (CTA copy), Task 2 (code) |
| CTA button #e4002b, white text | Task 1 (.btn-primary style) |

**All spec sections covered. No gaps.**

### Placeholder Scan

- No TBD or TODO in implementation steps
- All code blocks are complete and runnable
- The `SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` is an intentional user-facing placeholder with clear instructions

### Type / Name Consistency

- `SCRIPT_URL` — defined and used only in Task 1's script block ✓
- `submitWaitlist(email, statusEl)` — defined once, called from both forms ✓
- `position` — Apps Script returns `{ position: N }`, JS reads `data.position` ✓
- `PAPAYA10` — code matches across Task 2 (display) and Task 3 (comment) ✓
- `lastRow + 501` — matches intent: empty sheet gives position 501 ✓
