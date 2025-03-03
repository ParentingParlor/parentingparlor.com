'use client';

import { Shield, Users, Plus, TrendingUp, Star, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { topics } from '@/data/topics';

const featuredPosts = [
  {
    id: 'reluctant-products',
    title: "What product did you reluctantly buy at first, but now suggest to every parent?",
    slug: 'reluctant-products',
    stats: { contributors: 238, recommendations: 412 }
  },
  {
    id: 'age-products',
    title: "Top 3 products for every age",
    slug: 'age-products',
    stats: { contributors: 156, recommendations: 324 }
  },
  {
    id: 'youtube-channels',
    title: "Suggested YouTube channels for every Age",
    slug: 'youtube-channels',
    stats: { contributors: 189, recommendations: 245 }
  },
  {
    id: 'parenting-books',
    title: "Most recommended parenting books by age group",
    slug: 'parenting-books',
    stats: { contributors: 167, recommendations: 298 }
  }
];

export default function SidebarRight() {
  const trendingTopics = topics
    .sort((a, b) => b.weeklyViews - a.weeklyViews)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Featured Posts */}
      <div className="bg-white rounded-md border p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h2 className="font-semibold text-gray-900">Featured Posts</h2>
        </div>
        <div className="space-y-3">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/topic/${post.slug}`}
              className="block hover:bg-gray-50 -mx-4 px-4 py-2"
            >
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {post.stats.contributors} contributors
                </span>
                <span className="flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  {post.stats.recommendations} recommendations
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-md border p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          <h2 className="font-semibold text-gray-900">Trending Topics</h2>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topic/${topic.slug}`}
              className="block hover:bg-gray-50 -mx-4 px-4 py-2"
            >
              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                {topic.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {topic.weeklyViews} views this week
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* About Community */}
      <div className="bg-white rounded-md border p-4">
        <h2 className="font-semibold text-gray-900 mb-4">About parentingparlor</h2>
        <p className="text-sm text-gray-600 mb-4">
          A community for parents to share experiences, get expert advice, and support each other through the journey of parenthood.
        </p>

        <Link href="/create" className="block mb-4">
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Create Topic
          </Button>
        </Link>

        <div className="flex justify-between text-sm">
          <div>
            <div className="font-medium">238k</div>
            <div className="text-gray-500">Members</div>
          </div>
          <div>
            <div className="font-medium">2.1k</div>
            <div className="text-gray-500">Online</div>
          </div>
          <div>
            <div className="font-medium">2019</div>
            <div className="text-gray-500">Created</div>
          </div>
        </div>
      </div>

      {/* Moderators */}
      <div className="bg-white rounded-md border p-4">
        <h2 className="font-semibold text-gray-900 mb-4">Moderators</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-purple-600 hover:text-purple-700">
            <Shield className="h-4 w-4 mr-2" />
            <span>Message the mods</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>View mod list</span>
          </div>
        </div>
      </div>
    </div>
  );
}