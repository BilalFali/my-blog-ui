# Quick Reference - Modernized UI Components

## 🎨 Color System

### Primary Colors

```css
Blue Accent:     bg-blue-600      hover:bg-blue-700
Purple Accent:   text-purple-600  dark:text-purple-400
Category Badge:  from-blue-500 to-cyan-500
```

### Background Colors

```css
Light Mode:      bg-gray-50       (page)
                 bg-white         (cards)
                 bg-gray-100      (secondary elements)

Dark Mode:       bg-gray-900      (page)
                 bg-gray-800      (cards)
                 bg-gray-700      (secondary elements)
```

### Border Colors

```css
Default:         border-gray-200  dark:border-gray-700
Hover:           border-blue-500  dark:border-blue-500
```

## 📏 Spacing System

### Container Padding

```css
Mobile:    px-4  py-6
Tablet:    px-6  py-8
Desktop:   px-8  py-10 / py-12
```

### Card Padding

```css
Small:     p-4
Medium:    p-6
Large:     p-6 md:p-10
```

### Grid Gaps

```css
Articles:  gap-6
Categories: gap-6
Tags:      gap-3
```

## 🔤 Typography Scale

### Headings

```css
Hero Title:      text-4xl md:text-5xl  font-bold
Page Title:      text-3xl md:text-4xl  font-bold
Section Header:  text-2xl              font-bold
Card Title:      text-xl               font-bold
```

### Body Text

```css
Large:   text-lg
Normal:  text-base
Small:   text-sm
Tiny:    text-xs
```

### Font Weights

```css
Regular: font-normal
Medium:  font-medium
Bold:    font-bold
```

## 🎯 Component Patterns

### Card Pattern

```tsx
<div
  className="
  bg-white dark:bg-gray-800 
  rounded-xl 
  shadow-sm 
  border border-gray-200 dark:border-gray-700 
  hover:shadow-lg 
  hover:border-blue-500 dark:hover:border-blue-500 
  transition-all 
  p-6
"
>
  {/* Content */}
</div>
```

### Button Pattern

```tsx
<button
  className="
  px-4 py-2.5
  bg-blue-600 hover:bg-blue-700
  text-white
  rounded-lg
  transition-colors
  font-medium
  shadow-md
"
>
  {/* Button Text */}
</button>
```

### Input Pattern

```tsx
<input
  className="
  w-full
  px-4 py-3
  bg-white dark:bg-gray-800
  border border-gray-200 dark:border-gray-700
  rounded-xl
  text-gray-900 dark:text-white
  placeholder-gray-500
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  shadow-sm
"
/>
```

### Icon Container Pattern

```tsx
<div
  className="
  w-12 h-12
  bg-blue-100 dark:bg-blue-900/30
  rounded-lg
  flex items-center justify-center
"
>
  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
</div>
```

## 🖼️ Layout Patterns

### Max-Width Containers

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* Content */}</div>
```

### Responsive Grids

```tsx
{
  /* 3-Column Grid */
}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>;

{
  /* 2-Column Grid */
}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Items */}</div>;
```

### Flex Patterns

```tsx
{
  /* Space Between */
}
<div className="flex items-center justify-between">
  {/* Left */}
  {/* Right */}
</div>;

{
  /* Center */
}
<div className="flex items-center justify-center">{/* Content */}</div>;

{
  /* Gap Pattern */
}
<div className="flex items-center gap-3">{/* Items */}</div>;
```

## 🎭 Animation Classes

### Transitions

```css
transition-all       /* All properties */
transition-colors    /* Colors only */
transition-transform /* Transform only */
transition-shadow    /* Shadow only */
```

### Hover Effects

```css
hover:shadow-lg         /* Shadow increase */
hover:scale-105         /* Slight scale up */
hover:-translate-y-1    /* Lift effect */
hover:text-blue-600     /* Color change */
```

### Group Hover

```tsx
<div className="group">
  <div className="group-hover:text-blue-600">
    {/* Changes when parent is hovered */}
  </div>
</div>
```

## 📱 Responsive Breakpoints

```css
sm:   640px   /* Small devices */
md:   768px   /* Medium devices */
lg:   1024px  /* Large devices */
xl:   1280px  /* Extra large devices */
```

## 🌙 Dark Mode Pattern

```tsx
<div
  className="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
"
>
  {/* Always include light and dark variants */}
</div>
```

## 🔗 Link Pattern

```tsx
<Link
  to="/path"
  className="
    text-gray-600 dark:text-gray-400
    hover:text-gray-900 dark:hover:text-white
    transition-colors
  "
>
  {/* Link Text */}
</Link>
```

## 🎨 Badge Pattern

```tsx
<span
  className="
  px-3 py-1
  bg-gray-100 dark:bg-gray-700
  text-gray-700 dark:text-gray-300
  text-sm
  font-medium
  rounded-full
"
>
  {/* Badge Text */}
</span>
```

## 🌟 Common Icon Sizes

```css
Small:   w-4 h-4
Medium:  w-5 h-5
Large:   w-6 h-6
XL:      w-8 h-8
```

## 📝 Prose Styling

```tsx
<div
  className="
  prose 
  prose-lg
  dark:prose-invert
  max-w-none
  prose-headings:font-bold
  prose-headings:text-gray-900 dark:prose-headings:text-white
  prose-p:text-gray-700 dark:prose-p:text-gray-300
  prose-a:text-blue-600 dark:prose-a:text-blue-400
"
>
  {/* Article content */}
</div>
```

## 🎯 Z-Index Layers

```css
Base:      z-0
Cards:     z-10
Dropdown:  z-20
Modal:     z-30
Toast:     z-40
Navbar:    z-50
```

## 💡 Best Practices

1. **Always pair light/dark variants**

   ```tsx
   ❌ bg-white
   ✅ bg-white dark:bg-gray-800
   ```

2. **Use consistent spacing**

   ```tsx
   ❌ p-5 md:p-7
   ✅ p-4 md:p-6 lg:p-8
   ```

3. **Include transitions**

   ```tsx
   ❌ hover:bg-blue-700
   ✅ hover:bg-blue-700 transition-colors
   ```

4. **Use semantic colors**

   ```tsx
   ❌ bg-red-600 (for success)
   ✅ bg-green-600 (for success)
   ```

5. **Maintain accessibility**
   ```tsx
   ✅ focus:outline-none focus:ring-2 focus:ring-blue-500
   ```

---

**Usage:** Reference this guide when creating new components to maintain consistency across the application.
