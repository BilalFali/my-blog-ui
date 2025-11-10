# Google Analytics Setup Guide

## ✅ Google Analytics Integration Complete!

Google Analytics (GA4) has been successfully integrated into your blog. Follow the steps below to complete the setup.

---

## 📋 What Was Added

### 1. Google Analytics Component

**File:** `src/components/GoogleAnalytics.tsx`

This component:

- ✅ Initializes Google Analytics on app load
- ✅ Automatically tracks page views on route changes
- ✅ Provides helper functions for custom event tracking
- ✅ Uses GA4 (Google Analytics 4) - the latest version

### 2. App Integration

**File:** `src/App.tsx`

The GoogleAnalytics component has been added to automatically track all page navigation.

---

## 🔧 Setup Instructions

### Step 1: Get Your Google Analytics Measurement ID

1. **Go to Google Analytics:** https://analytics.google.com/
2. **Create an account** (if you don't have one)
3. **Create a property** for your website
4. **Select "Web" as the platform**
5. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add Your Measurement ID

Open `src/components/GoogleAnalytics.tsx` and replace the placeholder:

```tsx
// BEFORE (Line 7)
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// AFTER (replace with your actual ID)
const GA_MEASUREMENT_ID = "G-ABC1234567";
```

### Step 3: Deploy Your Changes

```bash
# Commit the changes
git add .
git commit -m "feat: Add Google Analytics integration"
git push origin main

# Deploy to production
npm run build
# Then deploy to your hosting platform
```

---

## 📊 What Gets Tracked Automatically

### Page Views

Every route change is automatically tracked:

- ✅ Home page (`/`)
- ✅ Article pages (`/article/:slug`)
- ✅ Categories page (`/categories`)
- ✅ Category articles (`/category/:slug`)
- ✅ About page (`/about`)

### User Data

GA4 automatically collects:

- ✅ Page URL and title
- ✅ User location (country, city)
- ✅ Device type (mobile, desktop, tablet)
- ✅ Browser and OS
- ✅ Screen resolution
- ✅ Session duration
- ✅ Bounce rate
- ✅ Traffic sources

---

## 🎯 Custom Event Tracking

You can track custom events using the `trackEvent` function.

### Import the Function

```tsx
import { trackEvent } from "../components/GoogleAnalytics";
```

### Track Button Clicks

```tsx
<button
  onClick={() => {
    trackEvent("click", "Button", "Subscribe Button", 1);
    // Your existing onClick logic
  }}
>
  Subscribe
</button>
```

### Track Article Reads

Add to `ArticlePage.tsx`:

```tsx
import { trackEvent } from "../components/GoogleAnalytics";

// In your component
useEffect(() => {
  if (post) {
    trackEvent("view", "Article", post.title);
  }
}, [post]);
```

### Track Social Shares

```tsx
const handleShare = (platform: string) => {
  trackEvent("share", "Social", platform);
  // Your share logic
};
```

### Track Search Queries

```tsx
const handleSearch = (query: string) => {
  trackEvent("search", "Site Search", query);
  // Your search logic
};
```

### Track Downloads

```tsx
const handleDownload = (fileName: string) => {
  trackEvent("download", "File", fileName);
  // Your download logic
};
```

---

## 📈 Event Tracking Examples

### Track Category Clicks

Add to `HomePage.tsx`:

```tsx
import { trackEvent } from "../components/GoogleAnalytics";

const getCategoryIcon = (category: Category, index: number) => {
  return (
    <button
      onClick={() => {
        trackEvent("click", "Category", category.name_en);
        navigate("/category/" + category.slug);
      }}
      // ... rest of button props
    >
      {/* ... */}
    </button>
  );
};
```

### Track Tag Clicks

```tsx
<button
  onClick={() => {
    trackEvent("click", "Tag", tagName);
    navigate("/tag/" + tag.slug);
  }}
>
  {tagName}
</button>
```

### Track Language Switch

Add to `LanguageToggle.tsx`:

```tsx
import { trackEvent } from "./GoogleAnalytics";

const handleLanguageChange = (lang: string) => {
  trackEvent("click", "Language Toggle", lang);
  i18n.changeLanguage(lang);
};
```

### Track Theme Toggle

Add to `ThemeContext.tsx` or where theme is toggled:

```tsx
import { trackEvent } from "../components/GoogleAnalytics";

const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  trackEvent("click", "Theme Toggle", newTheme);
  setTheme(newTheme);
};
```

---

## 🔍 Viewing Analytics Data

### Access Your Dashboard

1. Go to https://analytics.google.com/
2. Select your property
3. View real-time data in the "Realtime" report
4. View historical data in "Reports"

### Key Reports to Monitor

**1. Realtime Report**

- See current active users
- Track page views in real-time
- Monitor traffic sources

**2. Engagement Reports**

- Pages and screens (most viewed pages)
- Events (track custom events)
- Conversions (goal completions)

**3. Acquisition Reports**

- User acquisition (how users found you)
- Traffic acquisition (traffic sources)
- Campaign performance

**4. User Reports**

- Demographics (age, gender)
- Technology (device, browser)
- Location (country, city)

**5. Retention Reports**

- User retention (returning visitors)
- Cohort exploration
- Lifetime value

---

## 🎨 Advanced Tracking

### Track Scroll Depth

```tsx
import { trackEvent } from "../components/GoogleAnalytics";

useEffect(() => {
  let scrollTracked = false;

  const handleScroll = () => {
    const scrollPercent =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;

    if (scrollPercent > 75 && !scrollTracked) {
      trackEvent("scroll", "Article", "75% Scrolled");
      scrollTracked = true;
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

### Track Time on Page

```tsx
import { trackEvent } from "../components/GoogleAnalytics";

useEffect(() => {
  const startTime = Date.now();

  return () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent > 10) {
      trackEvent("engagement", "Time on Page", `${timeSpent}s`, timeSpent);
    }
  };
}, []);
```

### Track Outbound Links

```tsx
<a
  href="https://external-site.com"
  onClick={() =>
    trackEvent("click", "Outbound Link", "https://external-site.com")
  }
  target="_blank"
  rel="noopener noreferrer"
>
  External Link
</a>
```

---

## 🛡️ Privacy & GDPR Compliance

### Cookie Consent (Optional but Recommended)

If you have users from EU, you may want to add cookie consent:

```tsx
// Install: npm install react-cookie-consent

import CookieConsent from "react-cookie-consent";

// Add to App.tsx
<CookieConsent
  location="bottom"
  buttonText="Accept"
  cookieName="ga-consent"
  onAccept={() => {
    initGA(); // Initialize GA only after consent
  }}
>
  This website uses cookies to enhance the user experience.
</CookieConsent>;
```

### Anonymize IP Addresses

GA4 automatically anonymizes IP addresses by default.

### Allow Users to Opt-Out

```tsx
// Add to Privacy Policy page
<button
  onClick={() => {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
    alert("Google Analytics has been disabled");
  }}
>
  Disable Analytics
</button>
```

---

## 🧪 Testing Your Integration

### 1. Check Real-time Reports

1. Visit your website
2. Go to Google Analytics → Realtime
3. You should see yourself as an active user

### 2. Use GA Debugger Extension

Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension to see GA events in console.

### 3. Check Network Tab

1. Open DevTools → Network
2. Filter by "collect"
3. You should see requests to `google-analytics.com`

### 4. Test Custom Events

```tsx
// Add a test button
<button onClick={() => trackEvent("test", "Test Category", "Test Label")}>
  Test GA Event
</button>
```

Check if it appears in GA → Realtime → Events

---

## 📊 Event Tracking Reference

### Event Structure

```tsx
trackEvent(
  action, // 'click', 'view', 'submit', etc.
  category, // 'Button', 'Article', 'Form', etc.
  label, // Descriptive label (optional)
  value // Numeric value (optional)
);
```

### Common Events to Track

| Event        | Action     | Category      | Label         |
| ------------ | ---------- | ------------- | ------------- |
| Button Click | `click`    | `Button`      | Button name   |
| Article View | `view`     | `Article`     | Article title |
| Search       | `search`   | `Site Search` | Search query  |
| Share        | `share`    | `Social`      | Platform name |
| Download     | `download` | `File`        | File name     |
| Video Play   | `play`     | `Video`       | Video title   |
| Form Submit  | `submit`   | `Form`        | Form name     |
| Link Click   | `click`    | `Link`        | Link URL      |

---

## 🔧 Troubleshooting

### Analytics Not Working?

**1. Check Measurement ID**

- Ensure it's in the correct format: `G-XXXXXXXXXX`
- No spaces or extra characters

**2. Check Browser Extensions**

- Ad blockers may block GA
- Test in incognito mode

**3. Check Console for Errors**

- Open DevTools → Console
- Look for GA-related errors

**4. Verify Script Loading**

- Check Network tab for `gtag/js` request
- Should load from `googletagmanager.com`

**5. Check Production vs Development**

- GA works in both, but consider disabling in development:

```tsx
const GA_MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID || "";

// Only initialize in production
if (process.env.NODE_ENV === "production" && GA_MEASUREMENT_ID) {
  initGA();
}
```

---

## 🌟 Best Practices

### 1. Don't Over-Track

- Track meaningful interactions only
- Avoid tracking every single click
- Focus on business metrics

### 2. Use Descriptive Labels

```tsx
// ❌ Bad
trackEvent("click", "btn", "b1");

// ✅ Good
trackEvent("click", "Subscribe Button", "Header CTA");
```

### 3. Track User Journey

- Track key steps in user flow
- Identify drop-off points
- Optimize based on data

### 4. Set Up Goals

- Define conversions in GA
- Track newsletter signups
- Monitor article engagement

### 5. Regular Monitoring

- Check reports weekly
- Identify trends
- Make data-driven decisions

---

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 Reports Guide](https://support.google.com/analytics/answer/9212670)
- [Privacy & GDPR](https://support.google.com/analytics/answer/9019185)

---

## ✅ Setup Checklist

- [ ] Create Google Analytics account
- [ ] Get Measurement ID (G-XXXXXXXXXX)
- [ ] Replace placeholder ID in `GoogleAnalytics.tsx`
- [ ] Deploy to production
- [ ] Verify tracking in GA Realtime report
- [ ] Set up custom events (optional)
- [ ] Add cookie consent (if needed for GDPR)
- [ ] Create custom reports in GA
- [ ] Set up conversion goals
- [ ] Monitor regularly

---

**Status:** ✅ Google Analytics Ready  
**Next Step:** Add your Measurement ID and deploy!

🎊 Your blog is now ready to track analytics and gain insights into your audience!
