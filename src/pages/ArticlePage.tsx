import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Share2, User } from 'lucide-react';
import TagBadge from '../components/TagBadge';
import CodeBlock from '../components/CodeBlock';
import AdBanner from '../components/AdBanner';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../components/ArticleCard';
import Loader from '../components/Loader';
import { blogApi, type Post } from '../services/api';

const convertPostToArticle = (post: Post): Article => ({
  id: post.id,
  title: post.title_en,
  excerpt: post.content_en.substring(0, 150) + '...',
  image: 'https://picsum.photos/seed/' + post.id + '/800/400',
  date: new Date(post.created_at).toISOString().split('T')[0],
  readTime: Math.ceil(post.content_en.split(' ').length / 200),
  tags: post.tags?.map(t => t.name_en) || [],
  language: post.language as 'en' | 'ar',
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
        
        const relatedResponse = await blogApi.getPosts(1, 3, postData.category?.slug);
        const related = relatedResponse.data
          .filter(p => p.id !== postData.id)
          .slice(0, 2)
          .map(convertPostToArticle);
        
        setRelatedArticles(related);
      } catch (error) {
        console.error('Failed to load article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

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
  const featuredImage = 'https://picsum.photos/seed/' + post.id + '/1200/600';
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
    <div className="min-h-screen">
      <div className="relative h-96 w-full overflow-hidden">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} variant="primary" size="md" />
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {readTime} {t('minuteRead') || 'min read'}
                </span>
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {post.author.name}
                  </span>
                )}
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 mb-8" />
            <AdBanner className="mb-8 h-24" />

            <div className="article-content">
              {renderContent(content)}
            </div>

            <AdBanner className="my-8 h-24" />

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
                {t('shareArticle') || 'Share Article'}
              </button>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <div className="mt-16 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {t('relatedPosts') || 'Related Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        <AdBanner className="mb-16 h-32" />
      </div>
    </div>
  );
};

export default ArticlePage;
