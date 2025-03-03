'use client';

import { useParams } from 'next/navigation';
import { topics } from '@/data/topics';
import { tags } from '@/data/tags';
import TopicCard from '@/components/TopicCard';
import { Tag } from '@/types';

export default function TagPage() {
  const { id } = useParams();
  const allTags = Object.values(tags).flat();
  const tag = allTags.find(t => t.id === id) as Tag;
  
  const taggedTopics = topics.filter(topic => topic.tags.includes(id as string));

  if (!tag) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Tag not found</h1>
      </div>
    );
  }

  const tagColorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">#{tag.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${tagColorClasses[tag.color as keyof typeof tagColorClasses]}`}>
            {tag.category}
          </span>
        </div>
        <p className="text-gray-600">
          {taggedTopics.length} {taggedTopics.length === 1 ? 'topic' : 'topics'}
        </p>
      </div>

      <div className="space-y-4">
        {taggedTopics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}