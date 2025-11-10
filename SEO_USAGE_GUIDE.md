# 🎯 How to Use SEO Component

## Basic Usage

### 1. Import SEO Component

```typescript
import SEO from "../components/SEO";
```

### 2. Add to Each Page

#### HomePage Example:

```typescript
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      <SEO
        title="BiDev - Flutter Development Articles & Guides | Learn Flutter"
        description="Master Flutter development with BiDev. Comprehensive tutorials on widgets, state management, Firebase, animations, and cross-platform mobile development."
        keywords="Flutter, Dart, Flutter Tutorial, Mobile Development, Cross-platform, Flutter Widgets, State Management, Firebase Flutter"
        image="https://yourdomain.com/og-home.jpg"
      />

      {/* Your page content */}
      <div className="min-h-screen">{/* ... */}</div>
    </>
  );
};
```

#### Categories Page Example:

```typescript
const CategoriesPage = () => {
  return (
    <>
      <SEO
        title="Flutter Development Categories - BiDev"
        description="Browse Flutter articles by category. Topics include Widgets, State Management, Animations, Firebase, Performance, Testing, and more."
        keywords="Flutter categories, Flutter topics, Flutter widgets, Flutter state management, Flutter tutorials"
        image="https://yourdomain.com/og-categories.jpg"
      />

      {/* Your page content */}
    </>
  );
};
```

#### Article Page Example:

```typescript
const ArticlePage = () => {
  const { article } = useArticle(); // Your hook to get article data

  return (
    <>
      <SEO
        title={`${article.title} - BiDev`}
        description={article.excerpt}
        keywords={article.tags.join(", ")}
        image={article.image}
        article={true}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        author="BiDev"
        canonical={`https://yourdomain.com/article/${article.slug}`}
      />

      {/* Article content */}
    </>
  );
};
```

#### About Page Example:

```typescript
const AboutPage = () => {
  return (
    <>
      <SEO
        title="About BiDev - Flutter Development Expert"
        description="Learn about BiDev, your go-to source for Flutter development tutorials, guides, and best practices. Expert insights on Flutter and Dart programming."
        keywords="About BiDev, Flutter expert, Flutter developer, Flutter blog"
        image="https://yourdomain.com/og-about.jpg"
      />

      {/* About content */}
    </>
  );
};
```

---

## Advanced Usage

### Category Page with Dynamic SEO

```typescript
const CategoryPage = () => {
  const { category, articles } = useCategoryData();

  return (
    <>
      <SEO
        title={`${category.name} - Flutter Articles | BiDev`}
        description={`Explore ${articles.length}+ articles about ${category.name} in Flutter. ${category.description}`}
        keywords={`Flutter ${category.name}, ${category.name} tutorial, Flutter ${category.slug}`}
        image={category.image || "https://yourdomain.com/og-category.jpg"}
      />

      {/* Category content */}
    </>
  );
};
```

### Tag Page with Dynamic SEO

```typescript
const TagPage = () => {
  const { tag, articles } = useTagData();

  return (
    <>
      <SEO
        title={`${tag.name} - Flutter Articles | BiDev`}
        description={`${articles.length} Flutter articles tagged with ${tag.name}. Learn everything about ${tag.name} in Flutter development.`}
        keywords={`Flutter ${tag.name}, ${tag.name} tutorial, ${tag.name} guide`}
      />

      {/* Tag content */}
    </>
  );
};
```

---

## SEO Props Reference

| Prop            | Type    | Required | Default              | Description                       |
| --------------- | ------- | -------- | -------------------- | --------------------------------- |
| `title`         | string  | No       | "BiDev - Flutter..." | Page title (50-60 chars)          |
| `description`   | string  | No       | "Master Flutter..."  | Meta description (150-160 chars)  |
| `keywords`      | string  | No       | "Flutter, Dart..."   | Comma-separated keywords          |
| `image`         | string  | No       | "/og-image.jpg"      | Open Graph image URL (1200x630px) |
| `article`       | boolean | No       | false                | Set true for blog posts           |
| `publishedTime` | string  | No       | undefined            | ISO 8601 date (for articles)      |
| `modifiedTime`  | string  | No       | undefined            | ISO 8601 date (for articles)      |
| `author`        | string  | No       | "BiDev"              | Author name                       |
| `canonical`     | string  | No       | Current URL          | Canonical URL                     |
| `noindex`       | boolean | No       | false                | Prevent indexing                  |

---

## Best Practices

### 1. Title Length

✅ **Good**: 50-60 characters

```typescript
title = "Flutter Widgets Guide - BiDev";
```

❌ **Bad**: Too long

```typescript
title =
  "The Complete and Comprehensive Guide to Flutter Widgets Including StatelessWidget, StatefulWidget, and Everything You Need to Know - BiDev";
```

### 2. Description Length

✅ **Good**: 150-160 characters

```typescript
description =
  "Learn Flutter widgets with this comprehensive guide. Master StatelessWidget, StatefulWidget, and create custom widgets for your apps.";
```

❌ **Bad**: Too short

```typescript
description = "Flutter widgets guide";
```

### 3. Keywords

✅ **Good**: Relevant, specific keywords

```typescript
keywords =
  "Flutter widgets, StatelessWidget, StatefulWidget, Custom widgets, Flutter UI";
```

❌ **Bad**: Keyword stuffing

```typescript
keywords =
  "Flutter, Flutter widgets, widgets Flutter, Flutter widget tutorial, widget, widgets, UI, UI widgets, Flutter UI, Flutter...";
```

### 4. Images

✅ **Good**: Optimized, descriptive

```typescript
image = "https://yourdomain.com/flutter-widgets-guide-og.jpg";
// Image size: 1200x630px, < 200KB, descriptive filename
```

❌ **Bad**: Generic, large

```typescript
image = "https://yourdomain.com/img123.jpg";
// Image size: 5000x3000px, 5MB
```

---

## Quick Setup Checklist

### For New Pages:

- [ ] Import SEO component
- [ ] Add unique title
- [ ] Write compelling description
- [ ] Add relevant keywords
- [ ] Specify OG image
- [ ] Set article=true for blog posts
- [ ] Add publish/modified dates for articles
- [ ] Set canonical URL if needed

### For Article Pages:

- [ ] Dynamic title from article data
- [ ] Excerpt as description
- [ ] Tags as keywords
- [ ] Article image as OG image
- [ ] Published/modified dates
- [ ] Author name
- [ ] Unique canonical URL

---

## Testing Your SEO

### Tools to Test:

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Google Rich Results Test**: https://search.google.com/test/rich-results

### What to Check:

- ✅ Title displays correctly
- ✅ Description is complete
- ✅ Image loads (1200x630px)
- ✅ No errors in structured data
- ✅ Canonical URL is correct

---

## Examples from Real Articles

### "Flutter State Management with BLoC"

```typescript
<SEO
  title="Flutter State Management with BLoC Pattern - Complete Guide | BiDev"
  description="Master Flutter BLoC pattern for state management. Learn how to implement BLoC, manage app state, and build scalable Flutter applications."
  keywords="Flutter BLoC, State Management, BLoC pattern, Flutter state, flutter_bloc package"
  image="https://yourdomain.com/images/flutter-bloc-guide.jpg"
  article={true}
  publishedTime="2025-11-01T10:00:00Z"
  modifiedTime="2025-11-10T15:30:00Z"
/>
```

### "Firebase Integration in Flutter"

```typescript
<SEO
  title="Complete Firebase Integration Guide for Flutter Apps | BiDev"
  description="Integrate Firebase into your Flutter app. Step-by-step guide covering Authentication, Firestore, Cloud Storage, and Push Notifications."
  keywords="Flutter Firebase, Firebase integration, Firestore Flutter, Firebase Auth, Firebase Cloud Storage"
  image="https://yourdomain.com/images/firebase-flutter-integration.jpg"
  article={true}
  publishedTime="2025-10-15T14:00:00Z"
/>
```

---

## Common Mistakes to Avoid

❌ **Don't**: Use same title/description for all pages
✅ **Do**: Create unique content for each page

❌ **Don't**: Forget to update modified time
✅ **Do**: Update dates when editing articles

❌ **Don't**: Use generic images
✅ **Do**: Create custom OG images for each article

❌ **Don't**: Ignore mobile preview
✅ **Do**: Test on mobile devices

---

**Ready to dominate search results! 🚀**
