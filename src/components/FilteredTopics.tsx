'use client';

import { Topic } from '@/types';
import { topics } from '@/data/topics';
import TopicCard from './TopicCard';

interface FilteredTopicsProps {
  category: string;
  tags?: string[];
  limit?: number;
}

export default function FilteredTopics({ category, tags, limit = 5 }: FilteredTopicsProps) {
  const filteredTopics = topics
    .filter(topic => {
      const matchesCategory = topic.category === category;
      const matchesTags = tags ? tags.some(tag => topic.tags.includes(tag)) : true;
      return matchesCategory && matchesTags;
    })
    .slice(0, limit);

  if (filteredTopics.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Topics</h2>
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}