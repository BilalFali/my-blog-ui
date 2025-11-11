import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Share2, Tag, Folder, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import TagBadge from '../components/TagBadge';
import CodeBlock from '../components/CodeBlock';
import AdBanner from '../components/AdBanner';
import ArticleCard from '../components/ArticleCard';
import ArticleSkeleton from '../components/ArticleSkeleton';
import type { Article } from '../components/ArticleCard';
import { blogApi, type Post } from '../services/api';

const convertPostToArticle = (post: Post, isArabic: boolean): Article => ({
  id: post.id,
  title: isArabic ? post.title_ar : post.title_en,
  excerpt: isArabic 
    ? ((post.excerpt_ar || post.content_ar).substring(0, 150) + '...') 
    : ((post.excerpt_en || post.content_en).substring(0, 150) + '...'),
  image: post.cover_image || post.featured_image || 'https://picsum.photos/seed/' + post.id + '/800/400',
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
  const [copied, setCopied] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post ? (i18n.language === 'ar' ? post.title_ar : post.title_en) : '';

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    const url = urls[platform as keyof typeof urls];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return <ArticleSkeleton />;
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
  const featuredImage = post.cover_image || post.featured_image || 'https://picsum.photos/seed/' + post.id + '/1200/600';
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
          <div key={index}>
            {part.split('\n\n').map((paragraph, i) => {
              const trimmed = paragraph.trim();
              
              if (!trimmed) return null;
              
              // Headings
              if (trimmed.startsWith('### ')) {
                return <h3 key={i} className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{trimmed.substring(4)}</h3>;
              } else if (trimmed.startsWith('## ')) {
                return <h2 key={i} className="text-3xl font-bold mt-12 mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{trimmed.substring(3)}</h2>;
              } else if (trimmed.startsWith('# ')) {
                return <h1 key={i} className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">{trimmed.substring(2)}</h1>;
              }
              
              // Lists
              else if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={i} className="list-disc list-inside my-6 space-y-2">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.substring(2)) }} />
                    ))}
                  </ul>
                );
              }
              
              // Blockquotes
              else if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={i} className="border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-900 rounded-r-lg py-3 px-6 my-6 italic text-gray-700 dark:text-gray-300">
                    <p dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed.substring(2)) }} />
                  </blockquote>
                );
              }
              
              // Regular paragraphs with inline formatting
              else {
                return <p key={i} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />;
              }
            })}
          </div>
        );
      }
    });
  };

  const formatInlineMarkdown = (text: string): string => {
    return text
      // Bold with ** or __
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>')
      .replace(/__(.+?)__/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>')
      // Italic with * or _
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.+?)_/g, '<em class="italic">$1</em>')
      // Inline code with `
      .replace(/`(.+?)`/g, '<code class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-900 px-2 py-1 rounded-md text-sm font-mono">$1</code>')
      // Links with [text](url)
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 font-medium hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium text-sm">{t('backToHome') || 'Back'}</span>
        </Link>
      </div>

      {/* Full Hero Image with Parallax */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        {/* Floating Title on Hero */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            {post.category && (
              <Link 
                to={`/category/${post.category.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full text-sm font-medium mb-4 transition-all duration-300 border border-white/20"
              >
                <Folder className="w-4 h-4" />
                {isArabic ? post.category.name_ar : post.category.name_en}
              </Link>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Main Content */}
        <article>
          {/* Article Meta Card */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 mb-8 border border-gray-100 dark:border-gray-700/50">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
              {post.author && (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{post.author.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('author') || 'Author'}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                  <Clock className="w-4 h-4" />
                  {readTime} {t('minuteRead') || 'min'}
                </span>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  {tags.map((tag, index) => (
                    <TagBadge key={index} tag={tag} variant="primary" size="md" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-10 mb-8 border border-gray-100 dark:border-gray-700/50">
            <AdBanner slot="inArticleAd" format="horizontal" className="mb-10 rounded-2xl overflow-hidden h-24" />

            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:scroll-mt-20
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
              prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:my-2
              prose-ul:my-6 prose-ol:my-6
              prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-8
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-gray-900 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:italic
            ">
              {renderContent(content)}
            </div>

            <AdBanner slot="inArticleAd" format="horizontal" className="mt-10 rounded-2xl overflow-hidden h-24" />
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-3xl shadow-xl p-6 md:p-8 mb-8 border-2 border-blue-200/50 dark:border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              {t('shareArticle') || 'Share This Article'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => handleShare('facebook')}
                className="group flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="group flex items-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Twitter</span>
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="group flex items-center gap-2 px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </button>
              <button 
                onClick={copyToClipboard}
                className="group flex items-center gap-2 px-5 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                    <span>{t('copied') || 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t('copyLink') || 'Copy Link'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="pb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-1.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t('relatedPosts') || 'Related Articles'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        <AdBanner slot="footerBanner" format="horizontal" className="mb-16 rounded-3xl overflow-hidden h-32 shadow-lg" />
      </div>
    </div>
  );
};

export default ArticlePage;
