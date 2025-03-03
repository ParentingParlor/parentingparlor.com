'use client';

import { useState } from 'react';
import { FeaturePost } from '@/types/feature-post';
import ProductRecommendationForm from '@/components/feature-posts/ProductRecommendationForm';
import ProductRecommendationList from '@/components/feature-posts/ProductRecommendationList';
import ProductStats from '@/components/feature-posts/ProductStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommentForm from '@/components/comments/CommentForm';
import CommentList from '@/components/comments/CommentList';

interface FeaturePostPageProps {
  post: FeaturePost;
}

export default function FeaturePostPage({ post }: FeaturePostPageProps) {
  const [activeTab, setActiveTab] = useState('recommendations');

  const handleRecommendationSubmit = async (
    mainUrl: string,
    comment: string,
    additionalUrls: string[]
  ) => {
    // Here you would typically:
    // 1. Call your API to fetch product details from the Amazon URL
    // 2. Save the recommendation to your database
    // 3. Update the UI with the new recommendation
    console.log('New recommendation:', { mainUrl, comment, additionalUrls });
  };

  const handleVote = async (recommendationId: string) => {
    // Here you would:
    // 1. Call your API to update the vote count
    // 2. Update the UI with the new vote count
    console.log('Voted for:', recommendationId);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <p className="text-gray-600 mb-6">{post.description}</p>
        <div className="prose max-w-none">{post.content}</div>
      </div>

      <ProductStats stats={post.stats} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="recommendations">
            Recommendations ({post.recommendations?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="discussion">
            Discussion ({post.comments?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Share Your Recommendation
            </h2>
            <ProductRecommendationForm onSubmit={handleRecommendationSubmit} />
          </div>

          {post.recommendations && (
            <ProductRecommendationList
              recommendations={post.recommendations}
              onVote={handleVote}
            />
          )}
        </TabsContent>

        <TabsContent value="discussion">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Discussion</h2>
            
            <div className="mb-6">
              <CommentForm
                onSubmit={(content, attachedLists) => {
                  console.log('New comment:', { content, attachedLists });
                }}
              />
            </div>

            {post.comments && (
              <CommentList
                comments={post.comments}
                onReply={(parentId) => {
                  console.log('Reply to:', parentId);
                }}
                onAttachList={(commentId) => {
                  console.log('Attach list to comment:', commentId);
                }}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}