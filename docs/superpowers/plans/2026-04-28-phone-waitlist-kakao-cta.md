# Phone Waitlist + Kakao Channel CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace email collection with auto-formatted Korean phone number collection, add a PIPA-compliant privacy disclaimer, and simplify the thank you page to a single Kakao Channel CTA.

**Architecture:** All changes are in three static HTML files and one Google Apps Script file. No build step. The phone formatter and validation are vanilla JS event listeners added to the existing script block in index.html.

**Tech Stack:** Vanilla HTML/CSS/JS, Tailwind (inline compiled), Google Apps Script

---

## Files Modified

- `index.html` — hero form, CTA form, JS block
- `apps-script.gs` — backend: swap email → phone, update doGet to save phone
- `thankyou.html` — remove discount + share cards, add Kakao Channel CTA card

---

## Task 1: Update hero form HTML

**Files:**
- Modify: `index.html:253-273`

- [ ] **Step 1: Replace the hero form block**

Find this block (lines 253–273):
```html
        <!-- Email capture card -->
        <div class="bg-card px-7 py-4 md:p-7 rounded-xl sticker-border space-y-3 md:space-y-4 shadow-[0_8px_32px_rgba(56,56,49,0.08)]">
          <label for="hero-email" class="block font-headline font-bold text-on-surface text-lg text-center md:text-left">
            파파야 놀이터 가장 먼저 입장하기
          </label>
          <form id="hero-form" class="flex flex-col sm:flex-row gap-3" onsubmit="handleHeroSubmit(event)">
            <input
              id="hero-email"
              type="email"
              required
              placeholder="이메일을 입력해 주세요"
              class="flex-1 bg-[#f1ede3] px-5 py-4 rounded-xl border-0 focus:ring-4 focus:ring-primary/30 focus:outline-none text-on-surface placeholder:text-on-surface-muted/60 font-body text-center md:text-left"
            />
            <button type="submit" class="btn-primary px-7 py-4 font-headline whitespace-nowrap">
              사전 예약하기
            </button>
          </form>
          <p id="hero-status" class="text-sm text-on-surface-muted italic text-center md:text-left">
            선착순 1,000명 10% 할인
          </p>
        </div>
```

Replace with:
```html
        <!-- Phone capture card -->
        <div class="bg-card px-7 py-4 md:p-7 rounded-xl sticker-border space-y-3 md:space-y-4 shadow-[0_8px_32px_rgba(56,56,49,0.08)]">
          <label for="hero-phone" class="block font-headline font-bold text-on-surface text-lg text-center md:text-left">
            파파야 놀이터 가장 먼저 입장하기
          </label>
          <form id="hero-form" class="flex flex-col sm:flex-row gap-3" onsubmit="handleHeroSubmit(event)">
            <input
              id="hero-phone"
              type="tel"
              inputmode="numeric"
              required
              placeholder="010-0000-0000"
              class="flex-1 bg-[#f1ede3] px-5 py-4 rounded-xl border-0 focus:ring-4 focus:ring-primary/30 focus:outline-none text-on-surface placeholder:text-on-surface-muted/60 font-body text-center md:text-left"
            />
            <button type="submit" class="btn-primary px-7 py-4 font-headline whitespace-nowrap">
              사전 예약하기
            </button>
          </form>
          <p id="hero-status" class="text-sm text-on-surface-muted italic text-center md:text-left hidden"></p>
          <p class="text-xs text-on-surface-muted/70 text-center md:text-left font-body">전화번호는 출시 알림 전송에만 사용되며, 발송 후 즉시 삭제돼요 🍀</p>
        </div>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update hero form to phone input with privacy disclaimer"
```

---

## Task 2: Update CTA form HTML

**Files:**
- Modify: `index.html:574-598`

- [ ] **Step 1: Replace the CTA section text and form**

Find this block (lines 573–595):
```html
          <h2 class="relative z-10 text-4xl md:text-5xl font-headline font-black">파파야와 놀 준비 됐나요?</h2>
          <p class="relative z-10 text-lg text-white/90 mx-auto font-body whitespace-nowrap">
            곧 만나요. 사전 예약하면 10% 할인.
          </p>

          <form id="cta-form" class="relative z-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="handleCtaSubmit(event)">
            <label for="cta-email" class="sr-only">Email address</label>
            <input
              id="cta-email"
              type="email"
              required
              placeholder="이메일을 입력해 주세요"
              class="flex-1 bg-white/15 backdrop-blur-sm px-5 py-4 rounded-xl border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white font-body"
            />
            <button
              type="submit"
              class="bg-white text-primary font-headline font-extrabold px-8 py-4 rounded-full hover:bg-surface-low transition-colors whitespace-nowrap shadow-[0_8px_0_0_#4e0008]"
            >
              나도 참여할래요!
            </button>
          </form>

          <p id="cta-status" class="relative z-10 text-white/80 text-sm font-body hidden"></p>
```

Replace with:
```html
          <h2 class="relative z-10 text-4xl md:text-5xl font-headline font-black">파파야와 놀 준비 됐나요?</h2>
          <p class="relative z-10 text-lg text-white/90 mx-auto font-body whitespace-nowrap">
            곧 만나요. 출시 소식 가장 먼저 받아보세요.
          </p>

          <form id="cta-form" class="relative z-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onsubmit="handleCtaSubmit(event)">
            <label for="cta-phone" class="sr-only">전화번호</label>
            <input
              id="cta-phone"
              type="tel"
              inputmode="numeric"
              required
              placeholder="010-0000-0000"
              class="flex-1 bg-white/15 backdrop-blur-sm px-5 py-4 rounded-xl border-2 border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white font-body"
            />
            <button
              type="submit"
              class="bg-white text-primary font-headline font-extrabold px-8 py-4 rounded-full hover:bg-surface-low transition-colors whitespace-nowrap shadow-[0_8px_0_0_#4e0008]"
            >
              나도 참여할래요!
            </button>
          </form>

          <p id="cta-status" class="relative z-10 text-white/80 text-sm font-body hidden"></p>
          <p class="relative z-10 text-white/60 text-xs font-body">전화번호는 출시 알림 전송에만 사용되며, 발송 후 즉시 삭제돼요 🍀</p>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update CTA form to phone input with privacy disclaimer"
```

---

## Task 3: Update JavaScript in index.html

**Files:**
- Modify: `index.html:725-787`

- [ ] **Step 1: Replace the entire script block**

Find this block (lines 725–787):
```html
  <script>
    /*
     * ============================================================
     *  SETUP: Connect to Google Sheets (do this once before launch)
     * ============================================================
     *  1. Open apps-script.gs in this folder and follow the
     *     instructions at the top of that file.
     *  2. After deploying, paste your Web App URL below:
     */
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwR7sVodnN6HJPOdT2aFgmTszs4OIcTQ3tTD9HMPKUA-CJ1YH7MjW3Sy4E_NvWcGvGyyA/exec';
    /*
     *  That's it! Signups will flow into your Google Sheet.
     * ============================================================
     */


    async function submitWaitlist(email, statusEl, formEl) {
      statusEl.classList.remove('hidden');

      // Disable submit button to prevent double submission
      const submitBtn = formEl ? formEl.querySelector('[type="submit"]') : null;
      if (submitBtn) submitBtn.disabled = true;

      // If offline, show error immediately
      if (!navigator.onLine) {
        statusEl.classList.remove('hidden');
        statusEl.innerHTML = '오류가 발생했습니다. 불편을 드려 죄송합니다. <a href="mailto:tommy@papaya.toys?subject=웨이팅 리스트" style="text-decoration:underline;">tommy@papaya.toys</a>로 이메일 주소를 본문에 적어 보내주시면 등록해 드리겠습니다.';
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      // Fire submission in background — browser CORS blocks reading the response
      // but the request goes through when online
      fetch(SCRIPT_URL + '?email=' + encodeURIComponent(email), { mode: 'no-cors', keepalive: true }).catch(function() {});

      // Fire Meta Pixel Lead event
      if (typeof fbq === 'function') fbq('track', 'Lead');

      // Redirect to thank you page
      const position = Math.floor(Math.random() * 100) + 501;
      try {
        window.location.href = 'thankyou.html?position=' + position;
      } catch (_) {
        window.location.assign('thankyou.html?position=' + position);
      }
    }

    function handleHeroSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('hero-email').value.trim();
      const statusEl = document.getElementById('hero-status');
      const formEl = document.getElementById('hero-form');
      submitWaitlist(email, statusEl, formEl);
    }

    function handleCtaSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('cta-email').value.trim();
      const statusEl = document.getElementById('cta-status');
      const formEl = document.getElementById('cta-form');
      submitWaitlist(email, statusEl, formEl);
    }
  </script>
```

Replace with:
```html
  <script>
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwR7sVodnN6HJPOdT2aFgmTszs4OIcTQ3tTD9HMPKUA-CJ1YH7MjW3Sy4E_NvWcGvGyyA/exec';

    function formatPhone(value) {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      if (digits.length <= 3) return digits;
      if (digits.length <= 7) return digits.slice(0, 3) + '-' + digits.slice(3);
      return digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
    }

    document.addEventListener('DOMContentLoaded', function() {
      ['hero-phone', 'cta-phone'].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', function() {
          var pos = el.selectionStart;
          var oldLen = el.value.length;
          el.value = formatPhone(el.value);
          var newLen = el.value.length;
          el.setSelectionRange(pos + (newLen - oldLen), pos + (newLen - oldLen));
        });
      });
    });

    async function submitWaitlist(phone, statusEl, formEl) {
      if (!/^010-\d{4}-\d{4}$/.test(phone)) {
        statusEl.classList.remove('hidden');
        statusEl.textContent = '올바른 전화번호를 입력해 주세요 (예: 010-1234-5678)';
        return;
      }

      statusEl.classList.remove('hidden');

      const submitBtn = formEl ? formEl.querySelector('[type="submit"]') : null;
      if (submitBtn) submitBtn.disabled = true;

      if (!navigator.onLine) {
        statusEl.innerHTML = '오류가 발생했습니다. 불편을 드려 죄송합니다. <a href="mailto:tommy@papaya.toys?subject=웨이팅 리스트" style="text-decoration:underline;">tommy@papaya.toys</a>로 전화번호를 본문에 적어 보내주시면 등록해 드리겠습니다.';
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      fetch(SCRIPT_URL + '?phone=' + encodeURIComponent(phone), { mode: 'no-cors', keepalive: true }).catch(function() {});

      if (typeof fbq === 'function') fbq('track', 'Lead');

      const position = Math.floor(Math.random() * 100) + 501;
      try {
        window.location.href = 'thankyou.html?position=' + position;
      } catch (_) {
        window.location.assign('thankyou.html?position=' + position);
      }
    }

    function handleHeroSubmit(e) {
      e.preventDefault();
      const phone = document.getElementById('hero-phone').value.trim();
      const statusEl = document.getElementById('hero-status');
      const formEl = document.getElementById('hero-form');
      submitWaitlist(phone, statusEl, formEl);
    }

    function handleCtaSubmit(e) {
      e.preventDefault();
      const phone = document.getElementById('cta-phone').value.trim();
      const statusEl = document.getElementById('cta-status');
      const formEl = document.getElementById('cta-form');
      submitWaitlist(phone, statusEl, formEl);
    }
  </script>
```

- [ ] **Step 2: Open in browser and verify**

```bash
cd "/Users/tommypark/Desktop/Code Stuff/Papaya" && python3 -m http.server 8765
```

Open http://localhost:8765 and test:
- Type `01012345678` → should auto-format to `010-1234-5678`
- Type `010-1234-5678` with dashes manually → should stay correctly formatted
- Submit with empty field → should show validation error
- Submit with `010-1234-5678` → should redirect to thankyou.html

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add phone formatter, validation, and update submit logic"
```

---

## Task 4: Update apps-script.gs

**Files:**
- Modify: `apps-script.gs`

- [ ] **Step 1: Replace the entire file**

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
 * 8. Open index.html, find SCRIPT_URL and replace with the URL you copied.
 *
 * Your Google Sheet will be automatically populated with:
 *   Column A: Timestamp
 *   Column B: Phone number (010-XXXX-XXXX)
 *   Column C: Queue position
 *
 * HOW POSITION IS CALCULATED:
 *   Position = number of rows already in the sheet + 501
 *   So the very first signup gets position 501, second gets 502, etc.
 *   Duplicate phone numbers get their original position back (no new row added).
 */

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const phone = e && e.parameter && e.parameter.phone ? e.parameter.phone.trim() : '';

    if (phone) {
      if (!/^010-\d{4}-\d{4}$/.test(phone)) {
        return respond({ error: 'Invalid phone number' });
      }

      const existing = sheet.getDataRange().getValues();

      for (let i = 0; i < existing.length; i++) {
        if (existing[i][1] === phone) {
          return respond({ position: existing[i][2] });
        }
      }

      const dataRows = existing.filter(function(r) { return r[1] !== ''; }).length;
      const position = dataRows + 501;
      sheet.appendRow([new Date().toISOString(), phone, position]);
      return respond({ position: position });
    }

    const existing = sheet.getDataRange().getValues();
    const dataRows = existing.filter(function(r) { return r[1] !== ''; }).length;
    return respond({ count: dataRows, nextPosition: dataRows + 501 });

  } catch (err) {
    return respond({ error: err.message });
  }
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (!e || !e.postData || !e.postData.contents) {
      return respond({ error: 'Missing request body' });
    }
    const data = JSON.parse(e.postData.contents);
    const phone = (data.phone || '').trim();

    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
      return respond({ error: 'Invalid phone number' });
    }

    const existing = sheet.getDataRange().getValues();
    for (let i = 0; i < existing.length; i++) {
      if (existing[i][1] === phone) {
        return respond({ position: existing[i][2] });
      }
    }

    const dataRows = existing.filter(function(r) { return r[1] !== ''; }).length;
    const position = dataRows + 501;
    sheet.appendRow([new Date().toISOString(), phone, position]);
    return respond({ position: position });

  } catch (err) {
    Logger.log('Error: ' + err.message);
    return respond({ error: 'Server error', message: err.message });
  }
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- [ ] **Step 2: Redeploy in Google Apps Script**

After saving the file locally, manually update the Google Apps Script:
1. Go to https://script.google.com
2. Open the Papaya Waitlist project
3. Replace the code with the contents of `apps-script.gs`
4. Click "Deploy" → "Manage deployments" → select the existing deployment → "Edit" → increment version → "Deploy"

- [ ] **Step 3: Commit**

```bash
git add apps-script.gs
git commit -m "feat: update apps-script to record phone number instead of email"
```

---

## Task 5: Update thankyou.html

**Files:**
- Modify: `thankyou.html:124-207`

- [ ] **Step 1: Remove discount code card and share section, add Kakao CTA**

Find this block (lines 124–207, from the discount code card through the end of the share section):
```html
    <!-- ============================================================ -->
    <!-- 4. DISCOUNT CODE CARD                                        -->
    <!-- ============================================================ -->
    <div
      class="pop-in pop-in-delay-2 w-full rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.15)] -rotate-[1deg] p-8 text-center space-y-4"
      style="background: #00743c; transform-origin: center;"
    >
      ...entire discount code card...
    </div>

    <!-- ============================================================ -->
    <!-- 5. SHARE SECTION                                             -->
    <!-- ============================================================ -->
    <div
      class="pop-in pop-in-delay-3 w-full bg-surface-low rounded-xl sticker-border p-8 space-y-5"
      style="transform-origin: center;"
    >
      ...entire share section...
    </div>
```

Replace both cards with a single Kakao Channel CTA card:
```html
    <!-- ============================================================ -->
    <!-- 4. KAKAO CHANNEL CTA                                         -->
    <!-- ============================================================ -->
    <div
      class="pop-in pop-in-delay-2 w-full rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.15)] rotate-[1deg] p-8 text-center space-y-4"
      style="background: #FEE500; transform-origin: center;"
    >
      <p class="text-xs font-headline font-bold uppercase tracking-widest" style="color: #3C1E1E; opacity: 0.6;">카카오 채널</p>
      <div>
        <h2 class="text-2xl font-headline font-black leading-tight" style="color: #3C1E1E;">카카오 채널 추가하고<br>소식 받기</h2>
        <p class="text-sm font-body mt-2" style="color: #3C1E1E; opacity: 0.7;">출시 소식, 이벤트, 할인 혜택을 가장 먼저 받아보세요</p>
      </div>
      <a
        href="http://pf.kakao.com/_jrVTX"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 font-headline font-extrabold text-base px-8 py-3 rounded-full shadow-sm transition-opacity hover:opacity-90 active:scale-95"
        style="background: #3C1E1E; color: #FEE500;"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <ellipse cx="12" cy="11" rx="10" ry="8.5" fill="#FEE500"/>
          <path d="M6.5 14.5 C6.5 14.5 5.5 17.5 5 18.5 C5 18.5 8 16.5 9 16 L6.5 14.5Z" fill="#3C1E1E"/>
          <text x="12" y="15" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="9" fill="#3C1E1E">K</text>
        </svg>
        채널 추가하기
      </a>
    </div>
```

- [ ] **Step 2: Update the pop-in delay class on the back link**

The back link (line 212) currently has no pop-in delay. Since we removed pop-in-delay-3 (the share card), add it to the back link so the sequence still flows:

Find:
```html
    <a
      href="index.html"
      class="text-sm text-on-surface-muted font-body hover:text-primary transition-colors"
    >
      ← 파파야로 돌아가기
    </a>
```

Replace with:
```html
    <a
      href="index.html"
      class="pop-in pop-in-delay-3 text-sm text-on-surface-muted font-body hover:text-primary transition-colors"
    >
      ← 파파야로 돌아가기
    </a>
```

- [ ] **Step 3: Open in browser and verify**

```bash
open "http://localhost:8765/thankyou.html?position=523"
```

Check:
- Discount code card is gone
- Share section is gone
- Kakao card appears with correct yellow background, dark K icon, and "채널 추가하기" button
- Button opens `http://pf.kakao.com/_jrVTX` in a new tab
- Back link still works

- [ ] **Step 4: Commit**

```bash
git add thankyou.html
git commit -m "feat: replace discount/share cards with Kakao Channel CTA on thank you page"
```

---

## Task 6: End-to-end test and push

- [ ] **Step 1: Full flow test**

With the local server running on http://localhost:8765:

1. Load homepage → hero form shows phone input with `010-0000-0000` placeholder
2. Type `01012345678` → auto-formats to `010-1234-5678`
3. Submit → redirects to thankyou.html with a position number
4. Thank you page shows: 🎉 header, queue position card, Kakao CTA card, back link
5. Click "채널 추가하기" → opens Kakao Channel in new tab
6. Scroll to bottom of homepage → CTA section shows phone input with disclaimer
7. Repeat submit from CTA form → same thank you page

- [ ] **Step 2: Push to GitHub**

```bash
git push
```

Site deploys automatically to papaya.toys via GitHub Pages (~1 min). Purge Cloudflare cache after push.
