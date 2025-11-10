# Animation Classes Quick Reference

## 🎬 Entrance Animations

### Fade In Up

```tsx
<div className="animate-fade-in-up">// Fades in with upward motion (30px)</div>
```

### Fade In

```tsx
<div className="animate-fade-in">// Simple fade in</div>
```

### Scale In

```tsx
<div className="animate-scale-in">// Scales from 90% to 100%</div>
```

### Slide In Right

```tsx
<div className="animate-slide-in-right">// Slides from left to right</div>
```

### Slide In Left

```tsx
<div className="animate-slide-in-left">// Slides from right to left</div>
```

## 🔄 Continuous Animations

### Pulse

```tsx
<div className="animate-pulse">// Pulsing opacity effect</div>
```

### Bounce

```tsx
<div className="animate-bounce">// Vertical bouncing motion</div>
```

### Rotate

```tsx
<div className="animate-rotate">// Continuous 360° rotation</div>
```

### Shimmer (Loading)

```tsx
<div className="animate-shimmer h-20 w-full rounded">
  // Shimmer loading effect
</div>
```

### Gradient Shift

```tsx
<div className="animate-gradient bg-gradient-to-r from-blue-500 to-purple-500">
  // Animated gradient background
</div>
```

## ⏰ Stagger Delays

Add sequential delays to animations:

```tsx
{
  items.map((item, index) => (
    <div
      key={item.id}
      className={`animate-fade-in-up animate-stagger-${index + 1}`}
    >
      {item.name}
    </div>
  ));
}

// Available: animate-stagger-1 through animate-stagger-6
// Delays: 0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s
```

## 🖱️ Hover Effects

### Hover Lift

```tsx
<div className="hover-lift">// Lifts up 4px on hover with shadow</div>
```

### Hover Grow

```tsx
<div className="hover-grow">// Scales to 105% on hover</div>
```

### Hover Glow

```tsx
<div className="hover-glow">// Adds blue glow shadow on hover</div>
```

## 🎯 Buttons & Interactive Elements

### Standard Button Animation

```tsx
<button className="transition-all duration-300 transform hover:scale-105 active:scale-95">
  Click Me
</button>
```

### Link Animation

```tsx
<Link className="transition-colors duration-300 hover:text-blue-600">
  Navigate
</Link>
```

### Icon Animation

```tsx
<ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
```

## ✨ Special Effects

### Glass Morphism

```tsx
<div className="glass p-6 rounded-xl">
  // Frosted glass effect with backdrop blur
</div>
```

### Loading Skeleton

```tsx
<div className="skeleton h-20 w-full rounded"></div>
```

### Smooth Transition

```tsx
<div className="transition-smooth">
  // Custom smooth transition (0.3s)
</div>

<div className="transition-smooth-slow">
  // Slower smooth transition (0.5s)
</div>
```

## 📦 Complete Component Examples

### Animated Card

```tsx
<div
  className="
  bg-white dark:bg-gray-800
  rounded-xl
  shadow-md
  hover:shadow-xl
  transition-all duration-300
  animate-fade-in-up
  hover-lift
  group
"
>
  <img className="transform group-hover:scale-110 transition-transform duration-300" />
  <h3 className="transition-colors duration-300 group-hover:text-blue-600">
    Title
  </h3>
</div>
```

### Animated Button

```tsx
<button
  className="
  px-6 py-3
  bg-blue-600 hover:bg-blue-700
  text-white
  rounded-lg
  shadow-lg hover:shadow-xl
  transition-all duration-300
  transform hover:scale-105 active:scale-95
"
>
  Action
</button>
```

### Animated List

```tsx
<div className="space-y-4">
  {items.map((item, index) => (
    <div
      key={item.id}
      className={`
        animate-fade-in-up
        animate-stagger-${Math.min(index + 1, 6)}
        hover-lift
      `}
    >
      {item.content}
    </div>
  ))}
</div>
```

### Scroll-triggered Section

```tsx
<button
  onClick={() => {
    document.getElementById("section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
  className="transition-all duration-300 hover:scale-105 active:scale-95"
>
  Scroll to Section
</button>
```

## 🎨 Dark Mode Support

All animations automatically support dark mode:

```tsx
<div
  className="
  bg-white dark:bg-gray-800
  border-gray-200 dark:border-gray-700
  text-gray-900 dark:text-white
  animate-fade-in
"
>
  // Dark mode compatible animations
</div>
```

## ⚡ Performance Tips

### DO ✅

```tsx
// Animate transform and opacity (GPU accelerated)
<div className="transition-transform duration-300 hover:scale-105">
<div className="transition-opacity duration-300 hover:opacity-80">
```

### DON'T ❌

```tsx
// Avoid animating these (causes reflows)
<div className="transition-all hover:w-full">  // ❌ width
<div className="transition-all hover:h-full">  // ❌ height
<div className="transition-all hover:top-0">   // ❌ top/left
```

### Best Durations

```tsx
// Ultra fast: 150ms
className = "duration-150";

// Fast: 200ms
className = "duration-200";

// Standard: 300ms (recommended)
className = "duration-300";

// Slow: 500ms
className = "duration-500";

// Very slow: 700ms
className = "duration-700";
```

## 🔧 Custom Timing Functions

```tsx
// Default easing
className = "ease-out";

// Smooth both ways
className = "ease-in-out";

// Custom bezier
className = "ease-[cubic-bezier(0.4,0,0.2,1)]";
```

## 📱 Responsive Animations

```tsx
<div
  className="
  animate-fade-in-up
  md:animate-slide-in-right
  lg:animate-scale-in
"
>
  // Different animations per breakpoint
</div>
```

## 🎭 Combining Effects

```tsx
<div
  className="
  animate-fade-in-up
  animate-stagger-2
  hover-lift
  hover-glow
  transition-all duration-300
  group
"
>
  <Icon className="transition-transform group-hover:rotate-12" />
</div>
```

## 💡 Common Patterns

### Hero Section Animation

```tsx
<section className="animate-fade-in">
  <h1 className="animate-fade-in-up animate-stagger-1">Title</h1>
  <p className="animate-fade-in-up animate-stagger-2">Description</p>
  <button className="animate-fade-in-up animate-stagger-3 hover-lift">
    CTA
  </button>
</section>
```

### Loading State

```tsx
<div className="space-y-4">
  <div className="skeleton h-8 w-3/4"></div>
  <div className="skeleton h-8 w-full"></div>
  <div className="skeleton h-8 w-5/6"></div>
</div>
```

### Success Toast

```tsx
<div
  className="
  animate-slide-in-right
  bg-green-500
  text-white
  p-4
  rounded-lg
  shadow-lg
"
>
  Success!
</div>
```

---

**Quick Tip:** All animations respect `prefers-reduced-motion` for accessibility!
