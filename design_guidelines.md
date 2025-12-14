# Viral Tweet Generator - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Twitter's native design language combined with Linear's refined interface aesthetics and Stripe's elegant simplicity. The design should feel like a premium social media tool with polished interactions.

## Core Design Principles
1. **Twitter DNA**: Embrace Twitter's familiar visual language to create instant recognition and trust
2. **Minimal Friction**: Every interaction should feel effortless from landing to generated tweet
3. **Delight in Details**: Micro-interactions and smooth transitions that make the experience memorable

---

## Typography
- **Primary Font**: Inter or DM Sans (via Google Fonts CDN)
- **Headings**: 700 weight, tight tracking (-0.02em)
  - Hero H1: text-5xl to text-6xl
  - Section H2: text-3xl to text-4xl
  - Tweet Text: text-lg, 500 weight
- **Body**: 400-500 weight, relaxed line-height (1.6)
- **Captions/Labels**: text-sm, 500 weight, subtle uppercase with tracking

---

## Layout System
**Spacing Units**: Tailwind units of 4, 8, 12, 16, 20, 24, 32 (p-4, m-8, gap-12, etc.)
- Consistent section padding: py-20 to py-32 desktop, py-12 to py-16 mobile
- Container max-widths: max-w-6xl for main content, max-w-4xl for generator interface
- Card padding: p-6 to p-8
- Grid gaps: gap-6 to gap-8

---

## Page Structure

### Landing Page
1. **Hero Section** (80vh)
   - Bold headline: "Generate Viral Tweets in Seconds"
   - Subheadline explaining AI-powered tweet generation
   - Primary CTA: "Start Generating" button (prominent, with subtle blur backdrop if on image)
   - Background: Gradient mesh or abstract Twitter-themed imagery (floating tweet cards, social icons)
   - Include trust indicator: "Powered by Lyzr AI"

2. **How It Works** (3-column grid on desktop, stack on mobile)
   - Step 1: Enter your topic/idea
   - Step 2: AI generates viral-worthy tweets
   - Step 3: Copy and share on Twitter
   - Each step with icon, title, description

3. **Features Showcase** (2-column alternating layout)
   - AI-powered creativity with examples
   - Instant generation with real tweet preview mock
   - Multiple variations feature
   - Visual: Include example tweet cards with Twitter-style design

4. **CTA Section**
   - "Ready to Go Viral?" headline
   - Large CTA button to generator
   - Supporting text about ease of use

5. **Footer**
   - Simple links (About, Privacy, Terms)
   - Social media icons
   - "Built with Lyzr AI" badge

### Generator Interface Page
**Single-Page App Layout**:
- Header: Logo + minimalist nav (back to home link)
- Main Generator Section (centered, max-w-4xl):
  - Input area: Large textarea for topic/prompt (rounded-2xl, p-6)
  - Generate button: Prominent, centered below input
  - Loading state: Elegant spinner with "Crafting your viral tweet..." text
  - Results area: Tweet preview cards in Twitter's native card style
    - Twitter blue accent, profile-like layout
    - Character count indicator
    - Copy button with success state animation
    - "Generate Another" option
- Sidebar (optional on larger screens): Recent generations history

---

## Component Library

### Buttons
- Primary: Bold, rounded-full, px-8 py-4, font-medium
- Secondary: Outlined variant with border-2
- Icon buttons: Circular, p-3, hover scale effect
- States: Hover lift (translate-y-[-2px]), active press, disabled opacity-50

### Cards
- Tweet Preview Card:
  - White background with subtle shadow
  - Rounded-2xl borders
  - Twitter-style layout: Avatar (placeholder), name, handle, timestamp
  - Tweet text: 18px, line-height relaxed
  - Bottom actions: Like, Retweet, Copy icons
  - Border accent in Twitter blue on hover

### Input Fields
- Textarea: Large, rounded-xl, border-2 on focus
- Placeholder text: Friendly prompt like "Enter your topic or idea..."
- Character counter if applicable
- Focus state: Border color shift, subtle glow

### Loading States
- Skeleton screens for tweet cards
- Pulsing animation during generation
- Spinner: Custom Twitter-blue spinner

---

## Animations
**Use Sparingly**:
- Hero: Gentle fade-in on load
- Buttons: Subtle hover lift (2-3px)
- Tweet cards: Fade-in when generated
- Copy success: Brief checkmark animation
- Page transitions: Smooth fade (no complex animations)

---

## Images
**Hero Section Image**: 
- Abstract, vibrant illustration of social media engagement (floating tweets, viral icons, growth charts)
- Style: Modern gradient mesh or 3D render
- Placement: Full-width background with overlay gradient for text readability
- Alternative: Animated grid of example tweets with blur effect

**Features Section Images**:
- Screenshot/mockup of tweet preview interface
- Example viral tweets in Twitter card format
- Placement: Alternating left/right in 2-column layout

---

## Color Strategy Note
Colors will be defined separately. Focus on hierarchy through spacing, typography weight, and component structure. Maintain Twitter-blue as accent where platform recognition is important.

---

## Accessibility
- Focus indicators on all interactive elements
- ARIA labels for icon buttons
- Semantic HTML structure
- Keyboard navigation support for entire flow
- Loading announcements for screen readers