# Mobile Responsiveness Audit

**Date:** 2026-03-13
**Scope:** Full codebase review of all components, sections, global CSS, and layout patterns.

---

## Executive Summary

The project has a **solid responsive foundation** — viewport meta is correctly configured with `viewport-fit=cover`, Tailwind breakpoints are standard, and most sections use mobile-first patterns (`flex-col sm:flex-row`, responsive grids, `clamp()` typography). However, there are **specific issues** across several components that would degrade the experience on small screens (320px–480px).

**Severity scale:** Critical (broken layout) | High (poor UX) | Medium (suboptimal) | Low (minor polish)

---

## Global / Foundation

| Status | Detail |
|--------|--------|
| OK | Viewport meta: `width=device-width, initial-scale=1.0, viewport-fit=cover` |
| OK | Tailwind default breakpoints (sm:640, md:768, lg:1024, xl:1280) |
| OK | `overflow-x-hidden` on `Index.tsx` page wrapper prevents horizontal scroll |
| OK | `prefers-reduced-motion` support in `index.css` |
| OK | RTL support for Arabic language |
| OK | `svh` (small viewport height) support for mobile address bar handling |

---

## Issues by Component

### 1. PricingSection.tsx — Comparison Table (Critical)

**File:** `src/components/sections/PricingSection.tsx`
**Lines:** 264–275

```tsx
<div className="overflow-x-auto -mx-6 px-6">
  <table className="w-full min-w-[600px]">
    <th className="... w-[40%]">
```

**Problem:** The comparison table has `min-w-[600px]`, forcing horizontal scroll on any screen narrower than 600px. Combined with fixed `w-[40%]` column width, this creates a poor experience on mobile — users must horizontally scroll a data table, which is unintuitive.

**Recommendation:**
- On mobile (`< sm`), transform the table into a stacked card layout where each plan's features are shown vertically.
- Alternatively, use a "swipeable columns" approach where the feature column is sticky and plan columns scroll.

---

### 2. PricingSection.tsx — Price Typography (High)

**File:** `src/components/sections/PricingSection.tsx`
**Lines:** 205, 208

```tsx
<div className="text-4xl font-bold text-white">{plan.priceLabel}</div>
<span className="text-5xl font-bold text-white">${isAnnual ? ... }</span>
```

**Problem:** `text-5xl` (3rem/48px) and `text-4xl` (2.25rem/36px) are used without responsive breakpoints. On narrow screens (320px), especially with longer price labels or currency symbols, this can cause overflow.

**Recommendation:**
```tsx
className="text-3xl sm:text-5xl font-bold text-white"
className="text-2xl sm:text-4xl font-bold text-white"
```

---

### 3. PricingSection.tsx — Card Padding (Medium)

**File:** `src/components/sections/PricingSection.tsx`
**Line:** 175

```tsx
className="glass-panel p-8 ..."
```

**Problem:** `p-8` (32px) is generous padding that on a 320px screen leaves only 256px for content (after factoring in parent px-6). This compresses feature text and price layout.

**Recommendation:**
```tsx
className="glass-panel p-5 sm:p-8 ..."
```

---

### 4. ExperienceSection.tsx — Hardcoded Left Margins (High)

**File:** `src/components/sections/ExperienceSection.tsx`
**Lines:** 40, 73

```tsx
<div className="ml-14 space-y-3">
```

**Problem:** `ml-14` (3.5rem/56px) is applied unconditionally. On a 320px mobile screen, this pushes content 56px to the right, leaving only ~220px for text after padding. The conversational UI pattern (indented response under a question) breaks on small screens.

**Recommendation:**
```tsx
className="ml-6 sm:ml-14 space-y-3"
```

---

### 5. WaitlistModal.tsx — Close Button Touch Target (High)

**File:** `src/components/WaitlistModal.tsx`
**Lines:** 47–55

```tsx
<button className="absolute top-4 right-4 p-2 ...">
  <svg className="w-5 h-5" ...>
```

**Problem:** The close button has a `w-5 h-5` (20px) icon with `p-2` (8px) padding, creating a ~36px touch target. Apple's HIG recommends minimum 44x44px touch targets. This is especially critical for a modal close button on mobile.

**Recommendation:**
```tsx
className="absolute top-3 right-3 p-3 ..."
// or add min-w-[44px] min-h-[44px]
```

---

### 6. ExperienceSection.tsx — Sticky Punchline Box Padding (Medium)

**File:** `src/components/sections/ExperienceSection.tsx`
**Line:** 90

```tsx
className="... rounded-2xl p-10 backdrop-blur-sm"
```

**Problem:** `p-10` (40px) on the punchline card is very generous. On mobile where this card takes full width, 80px of total horizontal padding significantly reduces content space.

**Recommendation:**
```tsx
className="... rounded-2xl p-6 sm:p-10 backdrop-blur-sm"
```

---

### 7. OrbToGraphsAnimation.tsx — Chart Sizing on Small Screens (Medium)

**File:** `src/components/OrbToGraphsAnimation.tsx`
**Lines:** 335, 356, 362, 371, 448

```tsx
<div className="... px-2">                           // Line 335: very tight padding
<div className="... h-[140px] sm:h-[170px]">         // Line 356: bar chart height
<div className="w-[18px] sm:w-[28px] rounded-t-sm">  // Line 362, 371: bar widths
<span className="text-[9px] sm:text-[10px] ...">     // Line 448: legend text
```

**Problem:** On screens < 360px, the dashboard layout with 4 bar groups (each with 2x 18px bars + gap) can exceed available width. The legend text at 9px is below accessibility minimum (12px recommended). The `px-2` padding is very tight.

**Recommendation:**
- Add a `min-w-0` to the flex container to allow proper shrinking.
- Consider `w-[14px] sm:w-[18px] md:w-[28px]` for bars on very small screens.
- Increase legend text to `text-[10px] sm:text-[11px]`.

---

### 8. OrbToGraphsAnimation.tsx — Burst Animation Overflow (Medium)

**File:** `src/components/OrbToGraphsAnimation.tsx`
**Line:** ~264

```tsx
min(500px, 130vw)
```

**Problem:** The burst animation uses `130vw` which is 30% wider than the viewport. While this is intentional for visual effect, on some mobile browsers without `overflow-x-hidden` on the parent, it can cause a brief horizontal scrollbar flash.

**Recommendation:**
Ensure the animation container or a parent has `overflow: hidden`. Verify that `Index.tsx`'s `overflow-x-hidden` covers this during the animation lifecycle.

---

### 9. TestimonialsSection.tsx — Card Padding (Medium)

**File:** `src/components/sections/TestimonialsSection.tsx`
**Lines:** 38–42

```tsx
className="... p-7 ..."
```

**Problem:** `p-7` (28px) on testimonial cards is large for mobile. On 320px screens with parent padding, content area becomes narrow.

**Recommendation:**
```tsx
className="... p-5 sm:p-7 ..."
```

---

### 10. WhoItsForSection.tsx — Card Padding and Icon Size (Medium)

**File:** `src/components/sections/WhoItsForSection.tsx`
**Lines:** 97, 100

```tsx
className="... p-8"    // Card padding
className="w-16 h-16"  // Icon container
```

**Problem:** Same padding concern as above. The 64px icon dominates on small cards.

**Recommendation:**
```tsx
className="... p-5 sm:p-8"
className="w-12 h-12 sm:w-16 sm:h-16"
```

---

### 11. UnderTheHoodSection.tsx — Heading Size (Low)

**File:** `src/components/sections/UnderTheHoodSection.tsx`
**Line:** 41

```tsx
className="text-3xl md:text-4xl lg:text-5xl ..."
```

**Problem:** `text-3xl` (30px) on screens < 768px may be too large for narrow viewports with long translated headings (especially in German or Arabic).

**Recommendation:**
```tsx
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl ..."
```

---

### 12. FounderSection.tsx — Avatar Size (Low)

**File:** `src/components/sections/FounderSection.tsx`
**Line:** 31

```tsx
className="w-32 h-32"
```

**Problem:** A 128px avatar takes 40% of a 320px screen width. While this might be acceptable in a centered column layout, it's large for mobile.

**Recommendation:**
```tsx
className="w-24 h-24 sm:w-32 sm:h-32"
```

---

### 13. Footer.tsx — Social Link Touch Targets (Low)

**File:** `src/components/sections/Footer.tsx`
**Lines:** 55, 66

```tsx
className="w-8 h-8 rounded-lg ..."
```

**Problem:** Social link buttons are 32x32px, below the 44px recommended minimum touch target.

**Recommendation:**
```tsx
className="w-10 h-10 rounded-lg ..."
// or add p-1 to make the tappable area larger
```

---

### 14. SocialProofSection.tsx — Large Stat Numbers (Low)

**File:** `src/components/sections/SocialProofSection.tsx`
**Line:** 22

```tsx
className="text-3xl sm:text-4xl lg:text-5xl ..."
```

**Problem:** `text-3xl` (30px) on mobile could overflow if stat values are long. Minor risk.

**Recommendation:** Add `text-balance` or `whitespace-nowrap` if values are known to be short. Otherwise, consider `text-2xl sm:text-3xl`.

---

## What's Already Done Well

- **HeroSection**: Excellent use of `clamp()` for heading, `flex-col sm:flex-row` for CTA buttons, `min-h-[100svh]` with landscape fallback.
- **Header**: Proper mobile hamburger menu with 44px+ touch targets, smooth transitions.
- **FeaturesSection**: Responsive grid (`sm:grid-cols-2 lg:grid-cols-3`), `aspect-video` for demo iframe.
- **Footer**: Stacks with `flex-col md:flex-row`, proper link sizing.
- **PricingSection grid**: `sm:grid-cols-2 lg:grid-cols-3` with responsive gaps.
- **Glass panel system**: CSS-based, works at any width.
- **Global CSS**: Comprehensive light/dark mode, RTL support, reduced motion.

---

## Priority Fix Order

1. **Critical:** PricingSection comparison table — needs mobile-friendly alternative
2. **High:** ExperienceSection `ml-14` hardcoded margins — easy fix, big impact
3. **High:** WaitlistModal close button touch target — accessibility requirement
4. **High:** PricingSection price text sizing — overflow risk
5. **Medium:** Card padding across multiple sections (Pricing, Testimonials, WhoItsFor, Experience)
6. **Medium:** OrbToGraphsAnimation chart sizing on very small screens
7. **Low:** Touch targets (Footer social links), heading sizes, avatar sizing
