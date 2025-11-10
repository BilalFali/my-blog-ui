# Language-Based Content Display Update

## Overview

Updated the blog to dynamically display content based on the selected language (English/Arabic) instead of using a static `language` field from the database.

## Changes Made

### 1. ArticlePage.tsx

**Before:**

- Used `post.language` field to determine content language
- Displayed content based on database language field

**After:**

- Uses `i18n.language` from react-i18next to determine content language
- When Arabic is selected: Shows `title_ar`, `content_ar`, `excerpt_ar`, tag names in Arabic
- When English is selected: Shows `title_en`, `content_en`, `excerpt_en`, tag names in English
- Added `i18n.language` to useEffect dependencies to reload content when language changes

**Key Updates:**

```tsx
// Convert function now takes isArabic parameter
const convertPostToArticle = (post: Post, isArabic: boolean): Article => ({
  title: isArabic ? post.title_ar : post.title_en,
  excerpt: isArabic
    ? (post.excerpt_ar || post.content_ar).substring(0, 150) + "..."
    : (post.excerpt_en || post.content_en).substring(0, 150) + "...",
  // ... other fields
});

// In component:
const isArabic = i18n.language === "ar";
const title = isArabic ? post.title_ar : post.title_en;
const content = isArabic ? post.content_ar : post.content_en;
const tags = post.tags?.map((t) => (isArabic ? t.name_ar : t.name_en)) || [];
```

### 2. HomePage.tsx

**Before:**

- Used hardcoded English content (`title_en`, `content_en`)
- Static language display

**After:**

- Dynamically switches between Arabic and English based on `i18n.language`
- Reloads all articles when language changes
- Shows proper Arabic/English titles, excerpts, tags, and categories

**Key Updates:**

```tsx
// useEffect now depends on i18n.language
useEffect(() => {
  const loadData = async () => {
    const isArabic = i18n.language === "ar";
    // Convert all articles with current language
    setFeaturedArticles(
      featuredPosts.map((p) => convertPostToArticle(p, isArabic))
    );
    setLatestArticles(
      latestPosts.data.map((p) => convertPostToArticle(p, isArabic))
    );
    setRecentArticles(
      recentPosts.map((p) => convertPostToArticle(p, isArabic))
    );
  };
  loadData();
}, [i18n.language]);
```

### 3. CategoryArticlesPage.tsx

**Already Updated:**

- This page was already using the i18n language setting correctly
- No changes needed

## How It Works Now

### Language Switching Flow:

1. User clicks language toggle (EN ⟷ AR)
2. `i18n.language` changes to 'ar' or 'en'
3. useEffect hooks detect language change
4. Content is reloaded with appropriate language:
   - **Arabic (ar):** Shows `title_ar`, `content_ar`, `excerpt_ar`, `name_ar`
   - **English (en):** Shows `title_en`, `content_en`, `excerpt_en`, `name_en`
5. All text, including titles, excerpts, tags, and categories update instantly

## Benefits

### 1. Real-time Language Switching

✅ Content changes immediately when language is switched
✅ No page refresh needed
✅ Consistent experience across all pages

### 2. True Bilingual Support

✅ Every piece of content respects the selected language
✅ Articles show in the chosen language
✅ Categories and tags display in the correct language
✅ Related articles update based on language

### 3. Simplified Logic

✅ No need to store `language` field per article
✅ One source of truth: `i18n.language`
✅ Cleaner code structure
✅ Easier to maintain

### 4. Better User Experience

✅ Seamless language switching
✅ Consistent language throughout the app
✅ Proper RTL support for Arabic
✅ All UI elements respect language choice

## Database Fields Used

### Post Table:

- `title_en` / `title_ar` - Article titles
- `content_en` / `content_ar` - Article content
- `excerpt_en` / `excerpt_ar` - Article excerpts
- `featured_image` - Article image

### Category Table:

- `name_en` / `name_ar` - Category names
- `description_en` / `description_ar` - Category descriptions

### Tag Table:

- `name_en` / `name_ar` - Tag names

## Testing Checklist

- [x] Switch language on HomePage - articles update
- [x] Switch language on ArticlePage - content updates
- [x] Switch language on CategoriesPage - categories update
- [x] Switch language on CategoryArticlesPage - articles update
- [x] Related articles show in correct language
- [x] Tags display in correct language
- [x] Category names display in correct language
- [x] No TypeScript errors
- [x] No console errors

## Technical Details

### Language Detection:

```tsx
const { i18n } = useTranslation();
const isArabic = i18n.language === "ar";
```

### Content Selection:

```tsx
const title = isArabic ? post.title_ar : post.title_en;
const content = isArabic ? post.content_ar : post.content_en;
const excerpt = isArabic ? post.excerpt_ar : post.excerpt_en;
```

### Reactive Updates:

```tsx
useEffect(() => {
  // Reload content
}, [i18n.language]); // Triggers when language changes
```

## Files Modified

1. `/src/pages/ArticlePage.tsx`

   - Updated `convertPostToArticle` function
   - Added `isArabic` parameter
   - Added language to useEffect dependencies
   - Dynamic content selection based on language

2. `/src/pages/HomePage.tsx`
   - Updated `convertPostToArticle` function
   - Added `isArabic` parameter
   - Added language to useEffect dependencies
   - Reloads all articles on language change

## Migration Notes

### From Old Approach:

```tsx
// ❌ Old: Static language field
language: post.language as "en" | "ar";
```

### To New Approach:

```tsx
// ✅ New: Dynamic language from i18n
language: isArabic ? "ar" : "en";
```

## Summary

The blog now features **true bilingual support** where all content dynamically changes based on the user's language preference. This provides a seamless experience where switching between English and Arabic instantly updates:

- Article titles and content
- Category names and descriptions
- Tag names
- Excerpts and metadata
- Related articles
- All UI text

No database `language` field is needed - everything is controlled by the user's language selection through the language toggle.

---

**Status:** ✅ Complete
**Date:** November 10, 2025
**Version:** 2.0
