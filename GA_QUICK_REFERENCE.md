# Google Analytics Quick Reference

## 🚀 Quick Setup (5 Minutes)

### 1. Get Your Measurement ID

```
1. Go to: https://analytics.google.com
2. Create property → Get Measurement ID
3. Copy ID (format: G-XXXXXXXXXX)
```

### 2. Update Code

```tsx
// File: src/components/GoogleAnalytics.tsx
// Line 7: Replace this
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// With your actual ID
const GA_MEASUREMENT_ID = "G-ABC1234567";
```

### 3. Deploy

```bash
npm run build
# Deploy to your hosting
```

---

## 📊 Track Custom Events

### Import

```tsx
import { trackEvent } from "../components/GoogleAnalytics";
```

### Usage

```tsx
trackEvent("action", "category", "label", value);
```

---

## 🎯 Common Tracking Examples

### Button Click

```tsx
<button onClick={() => trackEvent("click", "Button", "Subscribe")}>
  Subscribe
</button>
```

### Article View

```tsx
useEffect(() => {
  trackEvent("view", "Article", articleTitle);
}, [articleTitle]);
```

### Social Share

```tsx
const handleShare = (platform) => {
  trackEvent("share", "Social", platform);
};
```

### Search

```tsx
const handleSearch = (query) => {
  trackEvent("search", "Site Search", query);
};
```

### Download

```tsx
<a onClick={() => trackEvent("download", "File", fileName)}>Download</a>
```

---

## 🔍 View Your Data

**Dashboard:** https://analytics.google.com

**Key Reports:**

- **Realtime** → See current visitors
- **Engagement → Pages** → Most viewed pages
- **Engagement → Events** → Custom events
- **Acquisition** → Traffic sources
- **User → Demographics** → Audience info

---

## 🧪 Test It Works

1. Visit your website
2. Go to GA → Realtime
3. See yourself as active user ✅

---

## 📋 Event Tracking Cheat Sheet

| What to Track | Action     | Category   | Example Label   |
| ------------- | ---------- | ---------- | --------------- |
| Button        | `click`    | `Button`   | "Subscribe CTA" |
| Article       | `view`     | `Article`  | Article title   |
| Category      | `click`    | `Category` | Category name   |
| Tag           | `click`    | `Tag`      | Tag name        |
| Share         | `share`    | `Social`   | "Twitter"       |
| Download      | `download` | `File`     | File name       |
| Search        | `search`   | `Search`   | Search term     |
| Video         | `play`     | `Video`    | Video title     |
| Form          | `submit`   | `Form`     | Form name       |
| Link          | `click`    | `Link`     | Link URL        |

---

## 🛠️ Helper Functions Available

```tsx
// Initialize GA (called automatically)
initGA();

// Track page view (called automatically on route change)
trackPageView(url);

// Track custom event
trackEvent(action, category, label, value);
```

---

## ⚡ Pro Tips

1. **Test in Incognito** - Ad blockers can block GA
2. **Use Descriptive Labels** - Makes reports easier to read
3. **Don't Over-Track** - Track meaningful events only
4. **Check Real-time First** - Verify setup immediately
5. **Historical data takes 24-48 hours** - Be patient

---

## 🔧 Troubleshooting

**Not seeing data?**

- ✅ Check Measurement ID is correct
- ✅ Disable ad blockers
- ✅ Check console for errors
- ✅ Test in incognito mode
- ✅ Wait a few minutes for realtime data

**Want to disable in development?**

```tsx
// Use environment variable
const GA_MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID;
```

---

## 📱 What's Tracked Automatically

- ✅ All page views
- ✅ User location
- ✅ Device type
- ✅ Browser & OS
- ✅ Traffic source
- ✅ Session duration
- ✅ Bounce rate

---

**Need Help?** Check `GOOGLE_ANALYTICS_SETUP.md` for detailed guide!
