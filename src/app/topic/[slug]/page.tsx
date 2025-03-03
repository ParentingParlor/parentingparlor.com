'use client';

import { useParams } from 'next/navigation';
import TopicDetail from '@/components/TopicDetail';
import FeaturePostPage from './feature-post';
import { topics } from '@/data/topics';
import Breadcrumb from '@/components/Breadcrumb';
import { featuredPosts } from '@/data/featured-posts';

export default function TopicPage() {
  const { slug } = useParams();
  
  // First check if it's a featured post
  const featurePost = featuredPosts.find(p => p.slug === slug);
  if (featurePost) {
    return (
      <div>
        <Breadcrumb 
          items={[
            { label: 'Featured', href: '/' },
            { label: featurePost.title }
          ]} 
        />
        <FeaturePostPage post={featurePost} />
      </div>
    );
  }

  // If not a featured post, look for regular topic
  const topic = topics.find(t => t.slug === slug);
  if (!topic) {
    return (
      <div>
        <Breadcrumb 
          items={[
            { label: 'Topic not found' }
          ]} 
        />
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900">Topic not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: topic.title }
        ]} 
      />
      <TopicDetail topic={topic} />
    </div>
  );
}