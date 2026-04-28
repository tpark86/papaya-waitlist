# Phone Waitlist + Kakao Channel CTA — Design Spec
Date: 2026-04-28

## Overview

Replace email collection with Korean phone number collection on the landing page, add a PIPA-compliant privacy disclosure, simplify the thank you page to a single Kakao Channel CTA.

---

## 1. index.html — Phone Input

### Input changes (both hero form and CTA form)
- Change `type="email"` → `type="tel"`
- Change `id="hero-email"` → `id="hero-phone"` and `id="cta-email"` → `id="cta-phone"`
- Placeholder: `010-0000-0000`
- Update `aria-label` / `label` text to reference phone number

### Auto-formatter
Attach an `input` event listener to each phone field:
- Strip all non-digit characters
- Cap at 11 digits (Korean mobile: 01X + 4 + 4)
- Format as `010-XXXX-XXXX` by inserting dashes after position 3 and 7
- Write formatted value back to the input

Pattern: digits `d` → `d[0..2] + '-' + d[3..6] + '-' + d[7..10]`

### Validation
Before submitting, validate with `/^010-\d{4}-\d{4}$/`. If invalid, show an inline error and abort submission.

### Privacy disclaimer
Display directly below each submit button, small muted text:

> 전화번호는 출시 알림 전송에만 사용되며, 발송 후 즉시 삭제돼요 🍀

This satisfies PIPA requirements for purpose disclosure and retention period at the point of collection. No checkbox required since data is used solely for the single stated purpose (launch notification).

### Submit logic
- Change query param from `email=` → `phone=`
- Update `submitWaitlist(email, ...)` → `submitWaitlist(phone, ...)`
- All references to `hero-email` / `cta-email` element IDs updated to `hero-phone` / `cta-phone`

---

## 2. apps-script.gs — Backend

- Column B stores phone number instead of email
- Duplicate detection compares phone number (normalized, already formatted by frontend)
- Validation: check that value matches `^010-\d{4}-\d{4}$` instead of email format check
- Parameter name changes from `data.email` → `data.phone`
- Sheet columns remain: A = Timestamp, B = Phone, C = Queue position

---

## 3. thankyou.html — Simplified Thank You Page

### Remove
- Discount code card (PAPAYA10 section)
- Share / friend referral section (KakaoTalk share, Instagram share, copy link)

### Keep
- Celebration header (🎉 + 파파야 놀이터에 입장했어요!)
- Queue position card (#N)
- Back link (← 파파야로 돌아가기)

### Add — Kakao Channel CTA card
A single prominent card placed between the queue position card and the back link.

**Visual:** Yellow background (`#FEE500`), dark text (`#3C1E1E`), Kakao K icon, full-width button.

**Content:**
- Eyebrow: `카카오 채널`
- Headline: `카카오 채널 추가하고 소식 받기`
- Body: `출시 소식, 이벤트, 할인 혜택을 가장 먼저 받아보세요`
- Button: `채널 추가하기` → links to `http://pf.kakao.com/_jrVTX` (opens in new tab)

**Note:** Adding the Kakao Channel constitutes user consent for channel announcements under Kakao's own consent framework — no additional legal disclaimer needed here.

---

## 4. Out of scope
- No changes to analytics (Meta Pixel, GA) — existing events still fire
- No changes to page layout, fonts, or color palette
- No changes to the queue position numbering logic
