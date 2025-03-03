'use client';

import { useState } from 'react';
import { tags } from '@/data/tags';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

const tagColorMap = {
  blue: 'bg-blue-50/50 text-blue-600/60 hover:bg-blue-100/50 hover:text-blue-700/80',
  purple: 'bg-purple-50/50 text-purple-600/60 hover:bg-purple-100/50 hover:text-purple-700/80',
  pink: 'bg-pink-50/50 text-pink-600/60 hover:bg-pink-100/50 hover:text-pink-700/80',
  red: 'bg-red-50/50 text-red-600/60 hover:bg-red-100/50 hover:text-red-700/80',
  green: 'bg-green-50/50 text-green-600/60 hover:bg-green-100/50 hover:text-green-700/80',
  yellow: 'bg-yellow-50/50 text-yellow-600/60 hover:bg-yellow-100/50 hover:text-yellow-700/80',
  orange: 'bg-orange-50/50 text-orange-600/60 hover:bg-orange-100/50 hover:text-orange-700/80',
};

const selectedTagColorMap = {
  blue: 'bg-blue-100 text-blue-800 ring-2 ring-blue-600/20',
  purple: 'bg-purple-100 text-purple-800 ring-2 ring-purple-600/20',
  pink: 'bg-pink-100 text-pink-800 ring-2 ring-pink-600/20',
  red: 'bg-red-100 text-red-800 ring-2 ring-red-600/20',
  green: 'bg-green-100 text-green-800 ring-2 ring-green-600/20',
  yellow: 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-600/20',
  orange: 'bg-orange-100 text-orange-800 ring-2 ring-orange-600/20',
};

export default function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = Object.entries(tags).map(([category, categoryTags]) => ({
    category,
    tags: categoryTags.filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.tags.length > 0);

  const toggleTag = (tagId: string) => {
    onChange(
      selectedTags.includes(tagId)
        ? selectedTags.filter(id => id !== tagId)
        : [...selectedTags, tagId]
    );
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tags..."
        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="space-y-4">
        {filteredTags.map(({ category, tags: categoryTags }) => (
          <div key={category}>
            <h3 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">{category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {categoryTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-2.5 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedTags.includes(tag.id)
                      ? selectedTagColorMap[tag.color as keyof typeof selectedTagColorMap]
                      : tagColorMap[tag.color as keyof typeof tagColorMap]
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}