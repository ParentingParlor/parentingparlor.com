'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ThumbsUp, List, MapPin, CheckCircle } from 'lucide-react';
import { Topic } from '@/types';
import TagList from './TagList';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopicCardProps {
  topic: Topic;
}

function getPreviewText(content: string): string {
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  const numSentences = Math.min(sentences.length, Math.random() > 0.5 ? 4 : 3);
  return sentences.slice(0, numSentences).join(' ').trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

function formatVerifiedDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export default function TopicCard({ topic }: TopicCardProps) {
  const previewText = getPreviewText(topic.content);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full">
      {/* Area 1: Title - Full width */}
      <div className="mb-4">
        <Link href={`/topic/${topic.slug}`} className="block">
          <h2 className="text-xl font-semibold text-gray-900 hover:text-purple-600">
            {topic.title}
          </h2>
        </Link>
      </div>

      {/* Area 2: Content and Image */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-600 line-clamp-3 mb-4">
            {previewText}
          </div>

          <div className="flex flex-wrap gap-2">
            <TagList selectedTags={topic.tags} interactive={true} />
          </div>
        </div>

        {topic.imageUrl && (
          <div className="hidden sm:block flex-shrink-0">
            <div className="relative w-40 h-32 rounded-lg overflow-hidden">
              <Image
                src={topic.imageUrl}
                alt={topic.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Area 3: Footer - Full width */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="font-medium truncate">{topic.author.name}</span>
            {topic.author.isVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1">
                      <CheckCircle className="h-4 w-4 text-blue-500 inline" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Verified Human</p>
                    <p className="text-xs text-gray-500">Verified on {formatVerifiedDate(topic.author.verifiedDate)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {topic.author.location && (
            <span className="flex items-center text-gray-400">
              <MapPin className="h-3 w-3 mr-1" />
              {topic.author.location}
            </span>
          )}
          <span className="text-gray-400">{formatDate(topic.createdAt)}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center space-x-1 hover:text-purple-600">
            <MessageCircle className="h-5 w-5" />
            <span>{topic.communityResponses}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-purple-600">
            <ThumbsUp className="h-5 w-5" />
            <span>{topic.likes}</span>
          </button>
          {topic.attachedLists && topic.attachedLists.length > 0 && (
            <div className="flex items-center space-x-1 text-purple-600">
              <List className="h-5 w-5" />
              <span>{topic.attachedLists.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}