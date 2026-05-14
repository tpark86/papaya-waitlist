# Design System Strategy: The Tactile Playroom

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Sticker Book"**
This design system moves away from the sterile, flat-world of modern SaaS and retreats into the tactile, joyous realm of 1990s toy packaging and physical scrapbooking. We are not building a utility; we are building a toy. The goal is to make the screen feel "pinchable" and "peelable."

We break the "template" look through **Intentional Imperfection**. In nature and play, nothing is perfectly aligned to a 90-degree axis. By utilizing subtle rotations (2° to 4°) on decorative elements and "sticker" components, we create a sense of organic placement. High-contrast typography scales and chunky, exaggerated radii ensure the interface feels safe, friendly, and premium.

## 2. Colors & Surface Logic
The palette is rooted in a warm, nostalgic cream (`background: #feffd7`), providing a sophisticated alternative to stark white. This "paper" base allows our toy-inspired primaries to pop with high-end intensity.

*   **Primary Action (`#cb0025`):** A confident, cherry red used for core interactions.
*   **Secondary Logic (`#00743c`):** A lush, forest green for "success" and secondary tactile paths.
*   **The "No-Line" Rule:** Standard 1px borders are strictly prohibited for structural sectioning. To separate content blocks, use background shifts. A `surface-container-low` section should sit on a `surface` background to create a "recessed" or "raised" area. 
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of stacked cardstock. 
    *   **Level 0 (Base):** `surface` (#feffd7)
    *   **Level 1 (Sections):** `surface-container-low` (#fcf9ef)
    *   **Level 2 (Cards):** `surface-container-lowest` (#ffffff)
*   **Signature Textures:** For primary buttons and hero sections, do not use flat fills. Use a subtle linear gradient from `primary` to `primary_container` at a 145-degree angle to simulate the sheen of a vinyl sticker.

## 3. Typography: Bold & Friendly Editorial
We pair **Plus Jakarta Sans** (Display/Headlines) for its geometric cheerfulness with **Be Vietnam Pro** (Body) for its modern readability.

*   **Display LG (3.5rem):** Use for hero moments. Tighten letter-spacing (-0.02em) to make it feel like a bold toy logo.
*   **Headline MD (1.75rem):** The "Voice" of the brand. Always set in `on_surface`.
*   **Body LG (1rem):** High-readability for parents and kids. Ensure line-height is generous (1.6) to maintain a breezy, playful feel.
*   **Hierarchy Note:** Use dramatic scale shifts. A Display LG headline should sit near Body MD text to create an editorial, high-end "poster" aesthetic.

## 4. Elevation & Depth: The Tactile Stack
We eschew traditional "material" shadows in favor of **Tonal Layering** and **Chunky Offsets**.

*   **The Layering Principle:** Depth is achieved by nesting. A white `surface-container-lowest` card placed on the cream `surface` creates an immediate, soft-touch lift.
*   **Ambient Shadows:** For floating "stickers" or modals, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(56, 56, 49, 0.08)`. The tint is derived from `on_surface` to keep it feeling natural, never muddy.
*   **The "Sticker Border":** While 1px lines are banned for layout, we use **Chunky Borders** (3px to 4px) for interactive cards. Use `outline` at 100% opacity for these specific elements to mimic the die-cut edge of a physical sticker.
*   **Glassmorphism:** For top navigation bars or floating toolbars, use `surface` at 80% opacity with a `blur(12px)`. This creates a "frosted plastic" look reminiscent of vintage iMacs or translucent toys.

## 5. Components

### Stickers & Buttons
*   **Primary "Sticker" Button:** Rounded `full`, background `primary`, with a 3px solid `on_primary_container` bottom-offset border to create a "pressable" 3D effect.
*   **Rotated Chips:** Selection chips should have a random rotation between -2deg and +2deg. Use `secondary_container` for active states.

### Cards
*   **The Card Rule:** Forbid divider lines within cards. Use `title-sm` typography and `spacing-md` (vertical white space) to separate header from body. 
*   **Visual Style:** Cards use `surface-container-lowest` with a 4px border of `outline_variant`.

### Inputs & Selection
*   **Checkboxes/Radios:** Exaggerated size (24px+). When selected, use `primary`. The "unselected" state should be a chunky `surface-dim` well.
*   **Input Fields:** `surface-container-highest` background, no border, `xl` (3rem) rounded corners. The focus state shouldn't be a glow, but a 3px solid `primary` border.

### Contextual Components: "The Peel"
*   **Peel-Off Modals:** When a modal appears, it should animate in with a "fold" or "peel" transition from the corner, reinforcing the sticker-printer theme.

## 6. Do’s and Don’ts

**Do:**
*   **Do** use asymmetrical layouts. Let images bleed off the edge of containers.
*   **Do** overlap elements. A sticker (button) should slightly overlap the edge of a card to create depth.
*   **Do** use `primary_container` (#ff7572) for large-scale soft backgrounds to keep the energy high.

**Don't:**
*   **Don't** use 1px grey lines. They kill the "toy" magic. Use background color shifts instead.
*   **Don't** use pure black (#000000). Always use `on_surface` (#383831) for text to maintain the vintage cream-paper warmth.
*   **Don't** align everything to a rigid center. Use the "Sticker-Style" rotations to break the grid and add "soul."