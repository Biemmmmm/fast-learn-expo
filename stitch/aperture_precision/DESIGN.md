# Design System Strategy: Precision Editorial

## 1. Overview & Creative North Star: "The Analytical Lens"
This design system is built to facilitate deep cognitive work. The Creative North Star is **The Analytical Lens**—a visual metaphor for clarity, precision, and surgical focus. 

To move beyond the "SaaS template" look, we reject the standard rigid grid in favor of **Intentional Asymmetry**. We prioritize high-density information layouts that feel breathable through rigorous white space management rather than decorative elements. The aesthetic is "Technical Sophistication": it borrows from architectural blueprints and high-end Swiss editorial design to create an environment where the user’s problems are the only thing in focus.

---

## 2. Colors: Tonal Architecture
The palette is rooted in a monochromatic slate foundation to minimize cognitive load, using a singular technical accent to signal "Insight" or "Action."

### The "No-Line" Rule
**Explicit Instruction:** Junior designers are prohibited from using `1px solid` borders for sectioning or layout containment. Boundaries must be defined solely through background color shifts. Use `surface-container-low` sections sitting on a `surface` background to denote structure. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create depth through "Tonal Stacking":
*   **Base:** `surface` (#f7f9fb)
*   **Sectioning:** `surface-container-low` (#f2f4f6)
*   **Secondary Content:** `surface-container` (#eceef0)
*   **High-Priority Workspace:** `surface-container-highest` (#e0e3e5)

### The Glass & Gradient Rule
For floating panels (AI suggestions, command palettes), use **Glassmorphism**. Apply a semi-transparent `surface_container_lowest` with a `backdrop-blur` of 12px. 
*   **Signature Texture:** Main CTAs should not be flat. Use a subtle linear gradient transitioning from `secondary` (#006c4a) to `secondary_fixed` (#68dba9) at a 135° angle to provide a "machined" metallic finish.

---

## 3. Typography: The Hierarchy of Logic
We utilize **Inter** to maintain a neutral, highly legible tone. The goal is to move the eye through complex data with zero friction.

*   **Display (lg/md):** Reserved for high-level analytical summaries. Use `-0.02em` letter spacing to feel "tight" and professional.
*   **Headline (sm/md):** Defines problem spaces. These are the anchors of the page.
*   **Title (sm/md/lg):** Used for card headings and section titles.
*   **Body (md/lg):** The workhorse. Always ensure `body-md` (#191c1e) is used for primary AI-generated insights to ensure maximum contrast.
*   **Label (sm/md):** Used for technical metadata. Use `on_surface_variant` (#474747) to differentiate from active content.

**Editorial Tip:** Use `display-sm` next to `body-sm` metadata to create a "Big/Small" typographic tension that feels premium and intentional.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-standard." We define depth through light and material properties.

*   **The Layering Principle:** Avoid shadows for static cards. A `surface-container-lowest` (#ffffff) card placed on a `surface-container-low` (#f2f4f6) background provides a sharp, clean lift.
*   **Ambient Shadows:** If a floating element (like a modal) is required, use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(25, 28, 30, 0.06)`. This mimics soft, natural ambient light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-contrast mode), use `outline_variant` at **20% opacity**. Never use 100% opaque borders.

---

## 5. Components: Precision Primitives

### Buttons & Inputs
*   **Primary Button:** Uses the Emerald gradient (`secondary` to `secondary_fixed`). Radius: `md` (0.375rem). No shadow; the color carries the weight.
*   **Secondary/Tertiary:** Strictly `surface-container-high` backgrounds with `on_surface` text. They should feel like part of the UI chrome, not a distraction.
*   **Input Fields:** Ghost-styled. Use `surface-container-low` for the fill. On focus, transition the background to `surface-container-lowest` and apply a `secondary` 1px bottom-stroke only.

### Data Density & Content
*   **Cards:** Forbid divider lines. Use `Spacing 8` (1.75rem) to separate content blocks.
*   **Chips:** High-density. Use `label-sm` typography. Background: `surface-container-highest` for inactive, `secondary_container` for active states.
*   **AI Insight Panels:** Use a subtle "frosted" effect (Glassmorphism) with an `outline-variant` 10% ghost border to signify that the content is dynamically generated and "floating" above the base logic.

### Contextual Components
*   **Logic Threader:** A vertical hairline (using `outline_variant` at 20%) to connect nested AI reasoning steps, keeping the "problem definition" visually linked.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Intentional Asymmetry:** Align primary content to a 60/40 split rather than a centered 50/50.
*   **Embrace High Density:** Keep padding tight (`Spacing 4` or `5`) in data-heavy areas to maintain a "professional tool" feel.
*   **Use Tonal Shifts:** Define the "Active" state of a sidebar item by shifting the background from `surface` to `surface-container-high` rather than adding an icon or a line.

### Don't:
*   **No "Cute" Icons:** Use only sharp, geometric, 2px stroke icons. No rounded terminals or filled "playful" shapes.
*   **No Heavy Shadows:** If the UI looks like it's floating high above the table, it’s too heavy. It should feel like sheets of paper on a desk.
*   **No Large Radii:** Never use the `full` or `xl` roundedness tokens for structural elements. Stick to `sm` and `md` to maintain a "sharp" professional edge.