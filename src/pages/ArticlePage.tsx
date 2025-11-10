import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Share2, Tag, Folder, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import TagBadge from '../components/TagBadge';
import CodeBlock from '../components/CodeBlock';
import AdBanner from '../components/AdBanner';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import Loader from '../components/Loader';
import { blogApi, type Post } from '../services/api';

const convertPostToArticle = (post: Post, isArabic: boolean): Article => ({
  id: post.id,
  title: isArabic ? post.title_ar : post.title_en,
  excerpt: isArabic 
    ? ((post.excerpt_ar || post.content_ar).substring(0, 150) + '...') 
    : ((post.excerpt_en || post.content_en).substring(0, 150) + '...'),
  image: post.featured_image || 'https://picsum.photos/seed/' + post.id + '/800/400',
  date: post.created_at,
  readTime: Math.ceil((isArabic ? post.content_ar : post.content_en).split(' ').length / 200),
  tags: post.tags?.map(t => isArabic ? t.name_ar : t.name_en) || [],
  language: isArabic ? 'ar' : 'en',
  slug: post.slug,
});

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setNotFound(false);
        
        const postData = await blogApi.getPostBySlug(slug);
        
        if (!postData) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        
        setPost(postData);
        
        const isArabic = i18n.language === 'ar';
        const relatedResponse = await blogApi.getPosts(1, 3, postData.category?.slug);
        const related = relatedResponse.data
          .filter(p => p.id !== postData.id)
          .slice(0, 2)
          .map(p => convertPostToArticle(p, isArabic));
        
        setRelatedArticles(related);
      } catch (error) {
        console.error('Failed to load article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text={t('loading')} />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('articleNotFound') || 'Article Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The article you are looking for does not exist.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            {t('backToHome') || 'Back to Home'}
          </a>
        </div>
      </div>
    );
  }

  const isArabic = i18n.language === 'ar';
  const title = isArabic ? post.title_ar : post.title_en;
  const content = isArabic ? post.content_ar : post.content_en;
  const featuredImage = post.featured_image || 'https://picsum.photos/seed/' + post.id + '/1200/600';
  const tags = post.tags?.map(t => isArabic ? t.name_ar : t.name_en) || [];
  const readTime = Math.ceil(content.split(' ').length / 200);

  const renderContent = (contentText: string) => {
    const parts = contentText.split('```');
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const lines = part.split('\n');
        const language = lines[0].trim() || 'javascript';
        const code = lines.slice(1).join('\n');
        return <CodeBlock key={index} code={code} language={language} />;
      } else {
        return (
          <div key={index} className="prose dark:prose-dark max-w-none">
            {part.split('\n').map((line, i) => {
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{line.substring(4)}</h3>;
              } else if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{line.substring(3)}</h2>;
              } else if (line.startsWith('# ')) {
                return <h1 key={i} className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{line.substring(2)}</h1>;
              } else if (line.startsWith('- ')) {
                return <li key={i} className="ml-6 mb-2 text-gray-700 dark:text-gray-300">{line.substring(2)}</li>;
              } else if (line.trim()) {
                return <p key={i} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>;
              }
              return <br key={i} />;
            })}
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('backToHome') || 'Back to Home'}</span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-80 md:h-96 w-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <article className="relative -mt-24">
          {/* Article Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10 mb-8">
            {/* Category Badge */}
            {post.category && (
              <Link 
                to={`/category/${post.category.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full text-sm font-medium mb-6 transition-all"
              >
                <Folder className="w-4 h-4" />
                {isArabic ? post.category.name_ar : post.category.name_en}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-700">
              {post.author && (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {post.author.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{post.author.name}</p>
                    <p className="text-xs">{t('author') || 'Author'}</p>
                  </div>
                </div>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime} {t('minuteRead') || 'min read'}
              </span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('tags') || 'Tags'}:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <TagBadge key={index} tag={tag} variant="primary" size="md" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 mb-8">
            <AdBanner className="mb-8 rounded-xl overflow-hidden h-24" />

            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-img:rounded-xl prose-img:shadow-lg
            ">
              {renderContent(content)}
            </div>

            <AdBanner className="mt-8 rounded-xl overflow-hidden h-24" />
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-blue-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              {t('shareArticle') || 'Share This Article'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md">
                <Facebook className="w-5 h-5" />
                Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors font-medium shadow-md">
                <Twitter className="w-5 h-5" />
                Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors font-medium shadow-md">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium shadow-md">
                <LinkIcon className="w-5 h-5" />
                {t('copyLink') || 'Copy Link'}
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              {t('relatedPosts') || 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        <AdBanner className="mb-16 rounded-xl overflow-hidden h-32" />
      </div>
    </div>
  );
};

export default ArticlePage;
