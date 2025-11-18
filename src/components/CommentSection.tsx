import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Send } from 'lucide-react';
import CommentItem, { type Comment } from './CommentItem';
import { commentsApi } from '../services/api';

interface CommentSectionProps {
  articleId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const { i18n } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errors, setErrors] = useState({ name: '', email: '', comment: '' });
  const isArabic = i18n.language === 'ar';

  // Load comments
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const data = await commentsApi.getComments(articleId);
        setComments(data);
      } catch (error) {
        console.error('Failed to load comments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [articleId]);

  const validateForm = (): boolean => {
    const newErrors = { name: '', email: '', comment: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = isArabic ? 'الاسم مطلوب' : 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = isArabic ? 'البريد الإلكتروني مطلوب' : 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isArabic ? 'البريد الإلكتروني غير صالح' : 'Invalid email';
      isValid = false;
    }

    if (!formData.comment.trim()) {
      newErrors.comment = isArabic ? 'التعليق مطلوب' : 'Comment is required';
      isValid = false;
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = isArabic ? 'التعليق قصير جداً' : 'Comment is too short';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const newComment = await commentsApi.addComment(
        articleId,
        formData.name,
        formData.email,
        formData.comment
      );
      
      setComments(prev => [newComment, ...prev]);
      setFormData({ name: '', email: '', comment: '' });
      setErrors({ name: '', email: '', comment: '' });
      
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert(isArabic ? 'فشل إرسال التعليق' : 'Failed to submit comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm(isArabic ? 'هل تريد حذف هذا التعليق؟' : 'Delete this comment?')) {
      return;
    }

    try {
      await commentsApi.deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert(isArabic ? 'فشل حذف التعليق' : 'Failed to delete comment');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isArabic ? 'التعليقات' : 'Comments'} ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Name Input */}
          <div>
            <label 
              htmlFor="name" 
              className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isArabic ? 'text-right' : ''}`}
            >
              {isArabic ? 'الاسم' : 'Name'} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isArabic ? 'text-right' : ''
              } text-gray-900 dark:text-white`}
              placeholder={isArabic ? 'أدخل اسمك' : 'Enter your name'}
              dir={isArabic ? 'rtl' : 'ltr'}
            />
            {errors.name && (
              <p className={`mt-1 text-sm text-red-500 ${isArabic ? 'text-right' : ''}`}>{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isArabic ? 'text-right' : ''}`}
            >
              {isArabic ? 'البريد الإلكتروني' : 'Email'} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isArabic ? 'text-right' : ''
              } text-gray-900 dark:text-white`}
              placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              dir={isArabic ? 'rtl' : 'ltr'}
            />
            {errors.email && (
              <p className={`mt-1 text-sm text-red-500 ${isArabic ? 'text-right' : ''}`}>{errors.email}</p>
            )}
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="mb-4">
          <label 
            htmlFor="comment" 
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isArabic ? 'text-right' : ''}`}
          >
            {isArabic ? 'التعليق' : 'Comment'} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${
              errors.comment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
              isArabic ? 'text-right' : ''
            } text-gray-900 dark:text-white`}
            placeholder={isArabic ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
            dir={isArabic ? 'rtl' : 'ltr'}
          />
          {errors.comment && (
            <p className={`mt-1 text-sm text-red-500 ${isArabic ? 'text-right' : ''}`}>{errors.comment}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
            isArabic ? 'flex-row-reverse mr-auto' : 'ml-auto'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? (isArabic ? 'جاري الإرسال...' : 'Submitting...') : (isArabic ? 'إرسال التعليق' : 'Submit Comment')}</span>
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {isArabic ? 'لا توجد تعليقات بعد. كن أول من يعلق!' : 'No comments yet. Be the first to comment!'}
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={handleDelete}
              canDelete={false} // Set to true if user owns the comment
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
