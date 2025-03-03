'use client';

import Link from 'next/link';
import { tags } from '@/data/tags';

interface TagListProps {
  selectedTags: string[];
  onTagClick?: (tagId: string) => void;
  interactive?: boolean;
}

const tagColorClasses = {
  blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  pink: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  red: 'bg-red-100 text-red-800 hover:bg-red-200',
  green: 'bg-green-100 text-green-800 hover:bg-green-200',
  yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
};

export default function TagList({ selectedTags, onTagClick, interactive = true }: TagListProps) {
  const allTags = Object.values(tags).flat();
  const displayTags = selectedTags.map(tagId => allTags.find(tag => tag.id === tagId));

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => {
        if (!tag) return null;
        const colorClass = tagColorClasses[tag.color as keyof typeof tagColorClasses];
        
        if (interactive) {
          return (
            <Link
              key={tag.id}
              href={`/tag/${tag.id}`}
              onClick={(e) => {
                if (onTagClick) {
                  e.preventDefault();
                  onTagClick(tag.id);
                }
              }}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${colorClass} cursor-pointer`}
            >
              {tag.name}
            </Link>
          );
        }

        return (
          <span
            key={tag.id}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
          >
            {tag.name}
          </span>
        );
      })}
    </div>
  );
}