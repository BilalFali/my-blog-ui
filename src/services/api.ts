import { supabase } from '../lib/supabase';

// Types
export interface Author {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  description_en?: string;
  description_ar?: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name_en: string;
  name_ar: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  excerpt_en?: string;
  excerpt_ar?: string;
  content_en: string;
  content_ar: string;
  featured_image?: string;
  cover_image?: string;
  language: string;
  category_id: string;
  author_id: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  author?: Author;
  tags?: Tag[];
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

// Helper function to handle Supabase errors
const handleError = (error: { message?: string }) => {
  console.error('Supabase error:', error);
  throw new Error(error.message || 'An error occurred');
};

// Blog API - Public facing endpoints
export const blogApi = {
  // Get all published posts with pagination
  async getPosts(page = 1, perPage = 10, categorySlug?: string, tagSlug?: string) {
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    let query = supabase
      .from('posts')
      .select(`
        *,
        category:categories(*),
        author:authors(*),
        tags:post_tags(tags(*))
      `, { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    // Filter by category if provided
    if (categorySlug) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    // Filter by tag if provided
    if (tagSlug) {
      const { data: tag } = await supabase
        .from('tags')
        .select('id')
        .eq('slug', tagSlug)
        .single();
      
      if (tag) {
        const { data: postTags } = await supabase
          .from('post_tags')
          .select('post_id')
          .eq('tag_id', tag.id);
        
        if (postTags && postTags.length > 0) {
          const postIds = postTags.map(pt => pt.post_id);
          query = query.in('id', postIds);
        }
      }
    }

    const { data, error, count } = await query;

    if (error) handleError(error);

    // Transform the tags data structure
    const transformedData = data?.map(post => ({
      ...post,
      tags: post.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || []
    }));

    return {
      data: transformedData || [],
      total: count || 0,
      page,
      per_page: perPage,
    };
  },

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        category:categories(*),
        author:authors(*),
        tags:post_tags(tags(*))
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      handleError(error);
    }

    if (!data) return null;

    // Transform tags data
    return {
      ...data,
      tags: data.tags?.map((t: { tags: Tag }) => t.tags).filter(Boolean) || []
    };
  },

  // Get recent posts
  async getRecentPosts(limit = 5) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        category:categories(*),
        author:authors(*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) handleError(error);
    return data || [];
  },

  // Get featured posts (you can customize this logic)
  async getFeaturedPosts(limit = 3) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        category:categories(*),
        author:authors(*)
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) handleError(error);
    return data || [];
  },
};

// Categories API
export const categoriesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name_en', { ascending: true });
    if (error) handleError(error);
    const categoriesWithCounts = await Promise.all(
      (data || []).map(async (category) => {
        const { count } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('published', true);
        return {
          ...category,
          post_count: count || 0
        };
      })
    );

    return categoriesWithCounts;
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      handleError(error);
    }
    return data;
  },

  async getPostCount(categoryId: string): Promise<number> {
    const { count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', categoryId)
      .eq('published', true);

    if (error) handleError(error);
    return count || 0;
  }
};

// Tags API
export const tagsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name_en', { ascending: true });

    if (error) handleError(error);
    
    // Get post counts for each tag
    const tagsWithCounts = await Promise.all(
      (data || []).map(async (tag) => {
        const { count } = await supabase
          .from('post_tags')
          .select('*', { count: 'exact', head: true })
          .eq('tag_id', tag.id);
        
        return {
          ...tag,
          post_count: count || 0
        };
      })
    );

    return tagsWithCounts;
  },

  async getBySlug(slug: string): Promise<Tag | null> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      handleError(error);
    }
    return data;
  },

  async getPostCount(tagId: string): Promise<number> {
    const { count, error } = await supabase
      .from('post_tags')
      .select('*', { count: 'exact', head: true })
      .eq('tag_id', tagId);

    if (error) handleError(error);
    return count || 0;
  }
};

// Newsletter API
export const newsletterApi = {
  async subscribe(email: string) {
    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (existingSubscriber) {
      // If already subscribed and active
      if (existingSubscriber.is_active) {
        return { 
          success: false, 
          message: 'This email is already subscribed',
          alreadySubscribed: true 
        };
      } else {
        // Reactivate subscription
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({ is_active: true, subscribed_at: new Date().toISOString() })
          .eq('id', existingSubscriber.id);

        if (error) handleError(error);
        return { 
          success: true, 
          message: 'Successfully resubscribed to newsletter' 
        };
      }
    }

    // Create new subscription
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          is_active: true,
          subscribed_at: new Date().toISOString()
        }
      ]);

    if (error) handleError(error);
    return { 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    };
  },

  async unsubscribe(email: string) {
    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false })
      .eq('email', email.toLowerCase());

    if (error) handleError(error);
    return { 
      success: true, 
      message: 'Successfully unsubscribed from newsletter' 
    };
  }
};

// Comments API
export interface Comment {
  id: string;
  article_id: string;
  user_name: string;
  email: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const commentsApi = {
  // Get all comments for an article
  async getComments(articleId: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_id', articleId)
      .order('created_at', { ascending: false });

    if (error) handleError(error);
    return data || [];
  },

  // Add a new comment
  async addComment(articleId: string, userName: string, email: string, content: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        article_id: articleId,
        user_name: userName.trim(),
        email: email.toLowerCase().trim(),
        content: content.trim()
      }])
      .select()
      .single();

    if (error) handleError(error);
    return data;
  },

  // Delete a comment
  async deleteComment(commentId: string) {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) handleError(error);
    return { success: true };
  }
};

// Reactions API
export interface Reaction {
  id: string;
  article_id: string;
  user_identifier: string;
  reaction_type: 'up' | 'down';
  created_at: string;
}

export interface ReactionCounts {
  upCount: number;
  downCount: number;
  netScore: number;
}

export const reactionsApi = {
  // Get reaction counts for an article
  async getReactionCounts(articleId: string): Promise<ReactionCounts> {
    const { data, error } = await supabase
      .from('reactions')
      .select('reaction_type')
      .eq('article_id', articleId);

    if (error) handleError(error);
    
    const upCount = data?.filter(r => r.reaction_type === 'up').length || 0;
    const downCount = data?.filter(r => r.reaction_type === 'down').length || 0;
    
    return {
      upCount,
      downCount,
      netScore: upCount - downCount
    };
  },

  // Get user's reaction for an article
  async getUserReaction(articleId: string, userIdentifier: string): Promise<'up' | 'down' | null> {
    const { data, error } = await supabase
      .from('reactions')
      .select('reaction_type')
      .eq('article_id', articleId)
      .eq('user_identifier', userIdentifier)
      .maybeSingle();

    if (error) handleError(error);
    return data?.reaction_type || null;
  },

  // Add or update a reaction
  async addReaction(articleId: string, userIdentifier: string, reactionType: 'up' | 'down') {
    // First, try to update existing reaction
    const { data: existing } = await supabase
      .from('reactions')
      .select('id')
      .eq('article_id', articleId)
      .eq('user_identifier', userIdentifier)
      .maybeSingle();

    if (existing) {
      // Update existing reaction
      const { error } = await supabase
        .from('reactions')
        .update({ reaction_type: reactionType })
        .eq('id', existing.id);
      
      if (error) handleError(error);
    } else {
      // Insert new reaction
      const { error } = await supabase
        .from('reactions')
        .insert([{
          article_id: articleId,
          user_identifier: userIdentifier,
          reaction_type: reactionType
        }]);
      
      if (error) handleError(error);
    }

    return { success: true };
  },

  // Remove a reaction
  async removeReaction(articleId: string, userIdentifier: string) {
    const { error } = await supabase
      .from('reactions')
      .delete()
      .eq('article_id', articleId)
      .eq('user_identifier', userIdentifier);

    if (error) handleError(error);
    return { success: true };
  }
};
