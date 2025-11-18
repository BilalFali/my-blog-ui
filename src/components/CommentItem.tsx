import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';

export interface Comment {
  id: string;
  article_id: string;
  user_name: string;
  email: string;
  content: string;
  created_at: string;
}

interface CommentItemProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
  canDelete?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete, canDelete = false }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return isArabic ? 'الآن' : 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return isArabic ? `منذ ${minutes} دقيقة` : `${minutes} min ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return isArabic ? `منذ ${hours} ساعة` : `${hours} hours ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return isArabic ? `منذ ${days} يوم` : `${days} days ago`;
    } else {
      return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
      <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
            {comment.user_name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Content */}
        <div className={`flex-1 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className={`flex items-center gap-2 mb-1 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {comment.user_name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>

        {/* Delete Button */}
        {canDelete && onDelete && (
          <button
            onClick={() => onDelete(comment.id)}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Delete comment"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
