import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { reactionsApi, type ReactionCounts as APIReactionCounts } from '../services/api';

interface ReactionButtonsProps {
  articleId: string;
  onReactionChange?: (upCount: number, downCount: number) => void;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ articleId, onReactionChange }) => {
  const { t, i18n } = useTranslation();
  const [counts, setCounts] = useState<APIReactionCounts>({ upCount: 0, downCount: 0, netScore: 0 });
  const [userReaction, setUserReaction] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState(false);
  const isArabic = i18n.language === 'ar';

  // Get user identifier (stored in localStorage)
  const getUserIdentifier = (): string => {
    let identifier = localStorage.getItem('user_identifier');
    if (!identifier) {
      identifier = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('user_identifier', identifier);
    }
    return identifier;
  };

  // Load reaction counts and user's reaction
  const loadReactions = useCallback(async () => {
    try {
      const userIdentifier = getUserIdentifier();
      
      // Get reaction counts
      const reactionCounts = await reactionsApi.getReactionCounts(articleId);
      setCounts(reactionCounts);
      
      // Get user's reaction
      const userReactionType = await reactionsApi.getUserReaction(articleId, userIdentifier);
      setUserReaction(userReactionType);
      
      if (onReactionChange) {
        onReactionChange(reactionCounts.upCount, reactionCounts.downCount);
      }
    } catch (error) {
      console.error('Failed to load reactions:', error);
    }
  }, [articleId, onReactionChange]);

  useEffect(() => {
    loadReactions();
  }, [loadReactions]);

  const handleReaction = async (type: 'up' | 'down') => {
    if (loading) return;

    setLoading(true);
    try {
      const userIdentifier = getUserIdentifier();
      
      // If clicking the same reaction, remove it
      if (userReaction === type) {
        await reactionsApi.removeReaction(articleId, userIdentifier);
        setUserReaction(null);
        setCounts(prev => ({
          ...prev,
          upCount: type === 'up' ? prev.upCount - 1 : prev.upCount,
          downCount: type === 'down' ? prev.downCount - 1 : prev.downCount,
          netScore: type === 'up' ? prev.netScore - 1 : prev.netScore + 1,
        }));
      } else {
        // Add or update reaction
        await reactionsApi.addReaction(articleId, userIdentifier, type);
        const prevReaction = userReaction;
        setUserReaction(type);
        
        setCounts(prev => {
          let newUpCount = prev.upCount;
          let newDownCount = prev.downCount;
          
          // Remove previous reaction if exists
          if (prevReaction === 'up') newUpCount--;
          if (prevReaction === 'down') newDownCount--;
          
          // Add new reaction
          if (type === 'up') newUpCount++;
          if (type === 'down') newDownCount++;
          
          return {
            upCount: newUpCount,
            downCount: newDownCount,
            netScore: newUpCount - newDownCount,
          };
        });
      }
      
    } catch (error) {
      console.error('Failed to update reaction:', error);
      // Reload on error
      loadReactions();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
        {/* Up Vote Button */}
        <button
          onClick={() => handleReaction('up')}
          disabled={loading}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300
            ${userReaction === 'up' 
              ? 'bg-green-500 text-white shadow-lg scale-105' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-600'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          `}
          aria-label={t('upvote') || 'Upvote'}
        >
          <ThumbsUp className={`w-4 h-4 ${userReaction === 'up' ? 'fill-current' : ''}`} />
          <span className="text-sm font-semibold">{counts.upCount}</span>
        </button>

        {/* Down Vote Button */}
        <button
          onClick={() => handleReaction('down')}
          disabled={loading}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300
            ${userReaction === 'down' 
              ? 'bg-red-500 text-white shadow-lg scale-105' 
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-600'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          `}
          aria-label={t('downvote') || 'Downvote'}
        >
          <ThumbsDown className={`w-4 h-4 ${userReaction === 'down' ? 'fill-current' : ''}`} />
          <span className="text-sm font-semibold">{counts.downCount}</span>
        </button>
      </div>

      {/* Net Score Display */}
      <div className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold ${
        counts.netScore > 0 
          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
          : counts.netScore < 0 
            ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}>
        <span className={isArabic ? 'ml-1' : 'mr-1'}>{counts.netScore > 0 ? '+' : ''}{counts.netScore}</span>
        <span className="text-xs opacity-75">{t('score') || 'score'}</span>
      </div>
    </div>
  );
};

export default ReactionButtons;
