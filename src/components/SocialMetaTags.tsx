import { useEffect } from 'react';

interface SocialMetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  locale?: 'en_US' | 'ar_SA';
}

const SocialMetaTags: React.FC<SocialMetaTagsProps> = ({
  title,
  description,
  image = 'https://bidev.site/og-default.jpg',
  url,
  type = 'article',
  author,
  publishedTime,
  modifiedTime,
  tags = [],
  locale = 'en_US',
}) => {
  useEffect(() => {
    const siteUrl = window.location.origin;
    const fullUrl = url || window.location.href;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const truncatedDescription = description.length > 160 
      ? description.substring(0, 157) + '...' 
      : description;

    // Update document title
    document.title = `${title} | BiDev Blog`;

    // Helper function to set or update meta tag
    const setMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('title', title, false);
    setMetaTag('description', truncatedDescription, false);
    
    // Open Graph / Facebook
    setMetaTag('og:type', type);
    setMetaTag('og:url', fullUrl);
    setMetaTag('og:title', title);
    setMetaTag('og:description', truncatedDescription);
    setMetaTag('og:image', fullImage);
    setMetaTag('og:image:width', '1200');
    setMetaTag('og:image:height', '630');
    setMetaTag('og:site_name', 'BiDev Blog');
    setMetaTag('og:locale', locale);
    
    // Article specific meta tags
    if (type === 'article' && author) {
      setMetaTag('article:author', author);
    }
    if (type === 'article' && publishedTime) {
      setMetaTag('article:published_time', publishedTime);
    }
    if (type === 'article' && modifiedTime) {
      setMetaTag('article:modified_time', modifiedTime);
    }

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:url', fullUrl, false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', truncatedDescription, false);
    setMetaTag('twitter:image', fullImage, false);
    setMetaTag('twitter:creator', '@bidev', false);
    setMetaTag('twitter:site', '@bidev', false);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // JSON-LD structured data
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
      headline: title,
      description: truncatedDescription,
      image: fullImage,
      url: fullUrl,
      ...(type === 'article' && {
        author: {
          '@type': 'Person',
          name: author || 'BiDev',
          url: 'https://portfolio.bidev.site'
        },
        publisher: {
          '@type': 'Organization',
          name: 'BiDev Blog',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`
          }
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        keywords: tags.join(', '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl
        }
      })
    });

  }, [title, description, image, url, type, author, publishedTime, modifiedTime, tags, locale]);

  return null; // This component only updates meta tags
};

export default SocialMetaTags;
