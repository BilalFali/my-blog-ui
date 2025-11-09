#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Blog UI - GitHub Setup Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
  echo -e "${YELLOW}Initializing Git repository...${NC}"
  git init
  echo -e "${GREEN}✓ Git initialized${NC}"
else
  echo -e "${GREEN}✓ Git already initialized${NC}"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${YELLOW}Renaming branch to 'main'...${NC}"
  git branch -M main
  echo -e "${GREEN}✓ Branch renamed to main${NC}"
fi

# Stage all files
echo -e "${YELLOW}Staging files...${NC}"
git add .

# Check if there are files to commit
if git diff --staged --quiet; then
  echo -e "${GREEN}✓ No new changes to commit${NC}"
else
  echo -e "${YELLOW}Committing files...${NC}"
  git commit -m "feat: Modern blog UI with Supabase integration

- Section-by-section homepage design
- Featured, Latest, and Most Viewed articles
- Bilingual support (English/Arabic)
- Dark mode support
- Categories and tags sidebar
- Responsive design
- Supabase backend integration"
  echo -e "${GREEN}✓ Files committed${NC}"
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Next Steps:${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Run these commands with YOUR GitHub username:"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter your repository name (default: my-blog-ui): " REPO_NAME
REPO_NAME=${REPO_NAME:-my-blog-ui}

echo ""
echo -e "${YELLOW}Copy and run these commands:${NC}"
echo ""
echo -e "${GREEN}git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Deploy to Vercel:${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "1. Go to: https://vercel.com"
echo "2. Sign in with GitHub"
echo "3. Click 'Add New' → 'Project'"
echo "4. Import your repository: ${REPO_NAME}"
echo "5. Add environment variables:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo "6. Click 'Deploy'"
echo ""
echo -e "${GREEN}Done! Your blog will be live in ~2 minutes! 🚀${NC}"
echo ""
