# Bilal's Developer Blog - React + Tailwind CSS

A modern, clean, and responsive personal developer blog built with React, TypeScript, and Tailwind CSS. Supports both Arabic and English with RTL support, dark mode, and is ready to connect to a Laravel backend.

## 🎯 Features

- **Bilingual Support**: Full Arabic and English support with automatic RTL layout
- **Dark Mode**: Beautiful dark mode with smooth transitions
- **Responsive Design**: Mobile-first design that works on all devices
- **Code Highlighting**: Syntax highlighting for Flutter, Dart, JavaScript, and more
- **Ad Integration**: Ready for Google AdSense integration
- **Modern UI**: Clean design with soft colors, rounded corners, and subtle shadows
- **SEO Ready**: Optimized for search engines

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AdBanner.tsx    # Google AdSense placeholder
│   ├── ArticleCard.tsx # Article preview card
│   ├── CodeBlock.tsx   # Syntax-highlighted code blocks
│   ├── Footer.tsx      # Site footer with social links
│   ├── LanguageToggle.tsx  # Language switcher (AR/EN)
│   ├── Loader.tsx      # Loading spinner
│   ├── Navbar.tsx      # Navigation bar with dark mode
│   └── TagBadge.tsx    # Tag/category labels
├── context/
│   └── ThemeContext.tsx    # Dark mode context
├── i18n/
│   └── config.ts       # i18next configuration
├── pages/              # Page components
│   ├── AboutPage.tsx   # About page with bio and social links
│   ├── ArticlePage.tsx # Individual article view
│   └── HomePage.tsx    # Home page with article grid
├── App.tsx             # Main app with routing
├── main.tsx           # App entry point
└── index.css          # Global styles with Tailwind

```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Update Personal Information

1. **Logo and Name**: Edit `src/components/Navbar.tsx` and `src/components/Footer.tsx`
2. **Social Links**: Update links in `src/components/Footer.tsx` and `src/pages/AboutPage.tsx`
3. **Bio**: Modify the bio content in `src/pages/AboutPage.tsx`

### Modify Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: { /* Your primary colors */ },
  accent: { /* Your accent colors */ },
}
```

### Add Translations

Edit `src/i18n/config.ts` to add or modify translations:

```typescript
const resources = {
  en: {
    translation: {
      /* English translations */
    },
  },
  ar: {
    translation: {
      /* Arabic translations */
    },
  },
};
```

## 🔌 Backend Integration

The blog is designed to work with a Laravel backend. To connect:

1. Create API endpoints in Laravel for:

   - `GET /api/articles` - List articles
   - `GET /api/articles/:slug` - Get single article
   - `GET /api/categories` - Get categories
   - `GET /api/tags` - Get tags

2. Update the mock data in:

   - `src/pages/HomePage.tsx`
   - `src/pages/ArticlePage.tsx`

3. Use `fetch` or `axios` to call your Laravel API:

```typescript
// Example
const fetchArticles = async () => {
  const response = await fetch("https://your-api.com/api/articles");
  const data = await response.json();
  return data;
};
```

## 📱 Google AdSense Integration

1. Replace `AdBanner` placeholders with actual AdSense code
2. Add your AdSense script to `index.html`
3. Update `src/components/AdBanner.tsx` with your ad units

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the `dist` folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Configure GitHub Pages to serve from `dist` folder
```

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **react-i18next** - Internationalization
- **React Syntax Highlighter** - Code highlighting
- **Lucide React** - Icons
- **Vite** - Build tool

## 🎯 Pages Overview

### Home Page

- Hero section with name and description
- Latest articles grid with images and excerpts
- Sidebar with popular tags
- Ad placements

### Article Page

- Featured image
- Article metadata (date, read time, author)
- Markdown-style content
- Code block syntax highlighting
- Related posts
- Multiple ad placements

### About Page

- Profile photo/avatar
- Multilingual bio
- Skills showcase
- Social media links

## 🌍 RTL Support

The blog automatically switches to RTL layout when Arabic is selected:

```typescript
// Language toggle automatically updates
document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
```

## 🎨 Dark Mode

Dark mode is persistent and respects system preferences:

```typescript
// Toggle dark mode
const { theme, toggleTheme } = useTheme();
```

## 📝 Adding New Articles

Currently using mock data. To add articles:

1. For development: Update mock arrays in `HomePage.tsx` and `ArticlePage.tsx`
2. For production: Connect to your Laravel API

## 🤝 Contributing

Feel free to customize this blog for your own use!

## 📄 License

MIT License - feel free to use this project for your personal blog.

## 🙏 Credits

- Icons by [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)
- Fonts from [Google Fonts](https://fonts.google.com)

---

Built with ❤️ by Bilal
