# 🚀 Deployment Guide

This guide will help you deploy your blog UI to GitHub and Vercel.

## ✅ Prerequisites

- [x] Production build completed successfully (`npm run build`)
- [x] Supabase project set up with credentials
- [x] GitHub account
- [x] Vercel account (free)

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):

```bash
cd /Users/bilal/Me/MyBlog/my-blog-ui
git init
```

2. **Create .gitignore** (already created):

```
node_modules/
dist/
.env.local
```

3. **Stage and commit your files**:

```bash
git add .
git commit -m "Initial commit: Blog UI with Supabase integration"
```

### Step 2: Push to GitHub

1. **Create a new repository on GitHub**:

   - Go to https://github.com/new
   - Repository name: `my-blog-ui` (or your preferred name)
   - Description: "Modern bilingual blog platform with React and Supabase"
   - Choose: Public or Private
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

2. **Connect your local repository to GitHub**:

```bash
git remote add origin https://github.com/YOUR_USERNAME/my-blog-ui.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**:

   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project**:

   - Click "Add New" → "Project"
   - Select your `my-blog-ui` repository
   - Click "Import"

3. **Configure Project**:

   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

   **Important**: Add these for all environments (Production, Preview, Development)

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:

```bash
npm install -g vercel
```

2. **Login to Vercel**:

```bash
vercel login
```

3. **Deploy**:

```bash
cd /Users/bilal/Me/MyBlog/my-blog-ui
vercel
```

4. **Follow the prompts**:

   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **my-blog-ui**
   - Directory? **./**
   - Override settings? **N**

5. **Add environment variables**:

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

6. **Deploy to production**:

```bash
vercel --prod
```

### Step 4: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## 🔧 Post-Deployment Configuration

### Update Supabase URL Configuration

1. **Go to Supabase Dashboard**:
   - Navigate to your project
   - Go to "Authentication" → "URL Configuration"
   - Add your Vercel URL to "Site URL"
   - Add your Vercel URL to "Redirect URLs"

### Enable Row Level Security (RLS)

Make sure your Supabase tables have proper RLS policies for public read access:

```sql
-- Enable RLS on posts table (public read)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public posts are viewable by everyone"
ON posts FOR SELECT
USING (published = true);

-- Enable RLS on categories table (public read)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
ON categories FOR SELECT
USING (true);

-- Enable RLS on tags table (public read)
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are viewable by everyone"
ON tags FOR SELECT
USING (true);
```

## 🎯 Testing Your Deployment

1. **Visit your deployed URL**:

   - Check that the homepage loads correctly
   - Test language switching (EN/AR)
   - Test dark mode toggle
   - Navigate to different pages
   - Verify categories and tags display

2. **Test on different devices**:

   - Desktop
   - Tablet
   - Mobile

3. **Check browser console** for any errors

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel will automatically:

- Detect the push
- Build your project
- Deploy to production
- Update your live site

## 📊 Build Output

Your production build includes:

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-[hash].js   # Bundled JavaScript (~1.15 MB)
│   └── index-[hash].css  # Bundled CSS (~29 KB)
└── vite.svg           # Favicon
```

## ⚡ Performance Optimization Tips

1. **Code Splitting**: Consider lazy loading routes:

```typescript
const HomePage = lazy(() => import("./pages/HomePage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
```

2. **Image Optimization**: Use optimized images and lazy loading

3. **Caching**: Vercel automatically handles caching for assets

4. **CDN**: Vercel serves your site from their global CDN

## 🐛 Troubleshooting

### Build Fails

**Problem**: Build fails on Vercel
**Solution**:

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### Environment Variables Not Working

**Problem**: Supabase connection fails
**Solution**:

- Verify environment variables in Vercel dashboard
- Variables must start with `VITE_`
- Redeploy after adding variables

### 404 on Page Refresh

**Problem**: Getting 404 when refreshing on routes like `/article/slug`
**Solution**: `vercel.json` already configured with rewrites (✓ done)

### Images Not Loading

**Problem**: Images showing broken
**Solution**:

- Check image URLs in Supabase
- Verify network images are accessible
- Check browser console for CORS errors

## 📝 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Build successful
- [ ] Site accessible at Vercel URL
- [ ] All pages load correctly
- [ ] Language switching works
- [ ] Dark mode works
- [ ] Articles display from Supabase
- [ ] Categories and tags show
- [ ] Mobile responsive
- [ ] Browser console clean (no errors)

## 🎉 Success!

Your blog is now live! Share your URL:

- Vercel URL: `https://your-project.vercel.app`
- Custom domain: `https://yourdomain.com` (if configured)

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Deployment](https://reactrouter.com/en/main/start/concepts#deployments)

## 🆘 Need Help?

- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- GitHub Issues: Create an issue in your repository

---

**Good luck with your deployment! 🚀**
