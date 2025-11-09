export interface Category {
  id: number;
  name: string;
  nameAr: string;
  slug: string;
  description?: string;
  icon?: string;
  count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

// Categories Seed Data
export const categories: Category[] = [
  {
    id: 1,
    name: 'Flutter Basics',
    nameAr: 'أساسيات فلاتر',
    slug: 'flutter-basics',
    description: 'Learn the fundamentals of Flutter development',
    count: 15,
  },
  {
    id: 2,
    name: 'Architecture & State Management',
    nameAr: 'البنية وإدارة الحالة',
    slug: 'architecture-state-management',
    description: 'BLoC, Provider, Riverpod, and clean architecture patterns',
    count: 12,
  },
  {
    id: 3,
    name: 'Firebase & Backend Integration',
    nameAr: 'Firebase والتكامل مع الخلفية',
    slug: 'firebase-backend',
    description: 'Connect your Flutter app to Firebase and other backends',
    count: 10,
  },
  {
    id: 4,
    name: 'UI / UX Design',
    nameAr: 'تصميم الواجهات',
    slug: 'ui-ux-design',
    description: 'Beautiful and responsive user interfaces',
    count: 18,
  },
  {
    id: 5,
    name: 'Performance & Optimization',
    nameAr: 'الأداء والتحسين',
    slug: 'performance-optimization',
    description: 'Make your Flutter apps faster and more efficient',
    count: 8,
  },
  {
    id: 6,
    name: 'Tools & Packages',
    nameAr: 'الأدوات والحزم',
    slug: 'tools-packages',
    description: 'Useful Flutter packages and development tools',
    count: 20,
  },
  {
    id: 7,
    name: 'Internationalization',
    nameAr: 'التعريب والترجمة',
    slug: 'internationalization',
    description: 'Build multilingual Flutter applications',
    count: 6,
  },
  {
    id: 8,
    name: 'Freelancing & Career',
    nameAr: 'العمل الحر والمسار المهني',
    slug: 'freelancing-career',
    description: 'Tips for Flutter developers on career growth',
    count: 7,
  },
  {
    id: 9,
    name: 'App Launch & Publishing',
    nameAr: 'إطلاق التطبيقات ونشرها',
    slug: 'app-launch-publishing',
    description: 'Deploy your apps to App Store and Play Store',
    count: 5,
  },
  {
    id: 10,
    name: 'AI & Flutter',
    nameAr: 'الذكاء الاصطناعي وفلاتر',
    slug: 'ai-flutter',
    description: 'Integrate AI and ML in your Flutter applications',
    count: 9,
  },
  {
    id: 11,
    name: 'Testing & CI/CD',
    nameAr: 'الاختبار والتكامل المستمر',
    slug: 'testing-cicd',
    description: 'Unit tests, integration tests, and CI/CD pipelines',
    count: 4,
  },
  {
    id: 12,
    name: 'Learning & Tutorials',
    nameAr: 'التعلم والدروس',
    slug: 'learning-tutorials',
    description: 'Step-by-step tutorials and learning paths',
    count: 25,
  },
  {
    id: 13,
    name: 'Web & Flutter Web',
    nameAr: 'الويب وفلاتر ويب',
    slug: 'web-flutter-web',
    description: 'Build web applications with Flutter',
    count: 7,
  },
  {
    id: 14,
    name: 'Community & News',
    nameAr: 'المجتمع والأخبار',
    slug: 'community-news',
    description: 'Latest Flutter news and community updates',
    count: 11,
  },
];

// Tags Seed Data
export const tags: Tag[] = [
  { id: 1, name: 'flutter', slug: 'flutter', count: 45 },
  { id: 2, name: 'dart', slug: 'dart', count: 38 },
  { id: 3, name: 'firebase', slug: 'firebase', count: 15 },
  { id: 4, name: 'riverpod', slug: 'riverpod', count: 12 },
  { id: 5, name: 'bloc', slug: 'bloc', count: 18 },
  { id: 6, name: 'ui', slug: 'ui', count: 22 },
  { id: 7, name: 'clean-architecture', slug: 'clean-architecture', count: 10 },
  { id: 8, name: 'arabic', slug: 'arabic', count: 14 },
  { id: 9, name: 'ios', slug: 'ios', count: 20 },
  { id: 10, name: 'android', slug: 'android', count: 20 },
  { id: 11, name: 'freelancing', slug: 'freelancing', count: 8 },
  { id: 12, name: 'performance', slug: 'performance', count: 11 },
  { id: 13, name: 'ai', slug: 'ai', count: 9 },
  { id: 14, name: 'education', slug: 'education', count: 16 },
  { id: 15, name: 'testing', slug: 'testing', count: 7 },
  { id: 16, name: 'animations', slug: 'animations', count: 13 },
  { id: 17, name: 'rest-api', slug: 'rest-api', count: 12 },
  { id: 18, name: 'provider', slug: 'provider', count: 15 },
  { id: 19, name: 'widgets', slug: 'widgets', count: 25 },
  { id: 20, name: 'best-practices', slug: 'best-practices', count: 14 },
];

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

// Helper function to get tag by slug
export const getTagBySlug = (slug: string): Tag | undefined => {
  return tags.find((tag) => tag.slug === slug);
};

// Helper function to get popular categories (top 6)
export const getPopularCategories = (limit: number = 6): Category[] => {
  return [...categories]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, limit);
};

// Helper function to get popular tags (top 10)
export const getPopularTags = (limit: number = 10): Tag[] => {
  return [...tags]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, limit);
};
