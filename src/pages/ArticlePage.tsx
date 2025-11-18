import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import ArticleCard from '../components/ArticleCard';
import ArticleSkeleton from '../components/ArticleSkeleton';
import ShareButtons from '../components/ShareButtons';
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
          .slice(0, 3)
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post ? (i18n.language === 'ar' ? post.title_ar : post.title_en) : '';

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('articleNotFound') || 'Article Not Found'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The article you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {t('backToHome') || 'Back to Home'}
          </Link>
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
              
              if (trimmed.startsWith('### ')) {
                return <h3 key={i} className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white">{trimmed.substring(4)}</h3>;
              } else if (trimmed.startsWith('## ')) {
                return <h2 key={i} className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">{trimmed.substring(3)}</h2>;
              } else if (trimmed.startsWith('# ')) {
                return <h1 key={i} className="text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">{trimmed.substring(2)}</h1>;
              } else if (trimmed.includes('\n- ') || trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={i} className="list-disc list-inside my-6 space-y-3 text-gray-700 dark:text-gray-300">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.substring(2)) }} />
                    ))}
                  </ul>
                );
              } else if (trimmed.startsWith('> ')) {
                return (
                  <blockquote key={i} className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-900 rounded-r py-4 px-6 my-6 italic text-gray-700 dark:text-gray-300">
                    <p dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed.substring(2)) }} />
                  </blockquote>
                );
              } else {
                return <p key={i} className="mb-5 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />;
              }
            })}
          </div>
        );
      }
    });
  };

  const formatInlineMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/__(.+?)__/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.+?)_/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded font-mono text-blue-600 dark:text-blue-400">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('backToHome') || 'Back'}</span>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <span>{new Date(post.created_at).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>{readTime} min read</span>
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author.name}</span>
            </>
          )}
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-12">
            <img
              src={featuredImage}
              alt={title}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {renderContent(content)}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share Buttons */}
        <div className="mt-8">
          <ShareButtons url={shareUrl} title={shareTitle} />
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-gray-100 dark:border-gray-800 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticlePage;
