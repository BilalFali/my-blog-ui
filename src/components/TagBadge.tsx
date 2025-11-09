import React from 'react';

interface TagBadgeProps {
  tag: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md';
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, variant = 'primary', size = 'sm' }) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-block rounded-full font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
