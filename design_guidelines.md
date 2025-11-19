# SlimeVR Shop - Design Guidelines

## Design Approach
**Utility-Focused E-commerce** with branded animations and interactive product selection. Dark mode theme with sky blue accents creating a tech-forward, gaming aesthetic appropriate for VR tracking equipment.

## Color Palette
- **Primary Background:** Black (#000000)
- **Accent Color:** Sky Blue (#38bdf8 / Tailwind sky-400)
- **Text Primary:** White/Sky Blue
- **Card Backgrounds:** Dark gray (#1a1a1a to #2a2a2a)
- **Default Mode:** Dark theme

## Typography
- **Headers:** Bold, modern sans-serif (Inter or DM Sans)
- **Product Titles:** 1.5rem - 2rem, semi-bold
- **Body Text:** 0.875rem - 1rem, regular weight
- **Labels/Tags:** 0.75rem - 0.875rem, uppercase for emphasis

## Layout System
**Spacing Units:** Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm (p-4, gap-8, mb-12, etc.)

### Page Structure
1. **Intro Animation Section** (full viewport, centered)
2. **Header** (sticky, ~64px height)
3. **Product Slider Section** (~80vh)
4. **Gallery Section** (below slider, minimal scroll)
5. **Accessories Section** (compact, organized grid)

## Component Specifications

### Animated Intro Sequence
- Centered Y-logo with fade-in (1s duration)
- Text line fade-in below logo (0.5s delay)
- Logo moves horizontally to connect with text forming "YSlime" (0.8s animation)
- "Slime" portion transitions to top header position (1s transform + translate)
- Product section fades in from below (0.6s delay)
- **Total sequence:** ~4-5 seconds before user interaction

### Header (Post-Animation)
- Fixed position, dark background with subtle blur
- "YSlime" branding on left
- Navigation minimal/clean
- Sky blue accent on hover states

### Horizontal Product Slider
- **Container:** Full-width with centered content area (max-w-6xl)
- **Card Design:** 
  - Rounded corners (rounded-2xl)
  - Dark gradient backgrounds
  - Sky blue border for "Recommended" (6-tracker)
  - Elevation with subtle shadow
- **Card Content:**
  - Tracker count (large, bold number)
  - Label badge ("Recommended", "Advanced", "Dancer")
  - Body placement list with icons
  - Price in MYR (large, prominent)
  - Gyroscope dropdown above card
  - Pre-Order button (sky blue, prominent)
- **Slider Controls:** Arrow buttons on sides, dot indicators below
- **Responsive:** 1 card on mobile, 2-3 visible on desktop with peek of next card

### Gyroscope Dropdown
- Positioned above each product card
- Clean select styling with sky blue focus states
- Options: ICM-45686, LSM6DSR, LSM6DSV
- Real-time price update on selection

### Pre-Order Popup
- **Animation:** Fade-in overlay with slide-up modal
- **Backdrop:** Semi-transparent black (bg-black/80)
- **Modal:** Centered, rounded, dark card with sky blue accents
- **Options Layout:** 3 vertical buttons/cards:
  1. Discord Direct Contact (with Discord icon)
  2. Join Discord Server (with invite icon)
  3. Shopee/Carousell (with shopping icon)
- Close button (X) top-right
- Each option as clickable card with hover states

### Gallery Section
- Grid layout: 3-4 columns on desktop, 2 on tablet, 1 on mobile
- Square or 16:9 aspect ratio images
- Rounded corners, subtle hover zoom
- Dark borders between images
- Lightbox on click (optional enhancement)

### Accessories Section
- **Title:** "Recommended Accessories"
- **Grid:** 2 columns (Straps | Chargers)
- Each item: Image thumbnail, title, Shopee link button
- Compact, clean card design
- Sky blue external link icons

## Interactions & Animations
- **Intro:** Orchestrated sequence as specified
- **Slider:** Smooth horizontal scroll with momentum
- **Dropdown:** Smooth expand/collapse
- **Price Update:** Number fade/slide transition
- **Popup:** Fade overlay + scale/slide modal
- **Buttons:** Sky blue glow on hover, slight scale
- **Cards:** Subtle lift on hover (transform translateY(-4px))

## Icons
Use **Heroicons** via CDN for consistency:
- Tracker placement icons
- Navigation arrows
- External links
- Discord logo
- Close (X) button

## Images
- **Gallery:** Product photos showing tracker hardware, straps, setup examples (6-8 images)
- **Accessories:** Thumbnail images for straps and chargers
- No large hero image (intro animation serves this purpose)

## Accessibility
- Keyboard navigation for slider
- Focus states on all interactive elements (sky blue outline)
- ARIA labels for icon buttons
- Proper heading hierarchy (skip intro animation section)