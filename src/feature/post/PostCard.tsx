'use client';

import Link from 'next/link';
import { MessageCircle, ThumbsUp, List, MapPin, CheckCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePostContext } from './postContext';
import getUserLabel from '../user/getUserLabel';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export default function PostCard() {
  const post = usePostContext()
  const userLabel = getUserLabel({ user: post.row.user });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full">
      <div className="mb-4">
        <Link href={`/post/${post.row.slug}`} className="block">
          <h2 className="text-xl font-semibold text-gray-900 hover:text-purple-600">
            {post.row.title}
          </h2>
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-600 line-clamp-3 mb-4">
            {post.row.content}
          </div>
        </div>
      </div>

      {/* Area 3: Footer - Full width */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="font-medium truncate">{userLabel}</span>
            {post.row.user.dkbaVerified && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-1">
                      <CheckCircle className="h-4 w-4 text-blue-500 inline" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Verified Human</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          {(post.row.user.city || post.row.user.state) && (
            <span className="flex items-center text-gray-400">
              <MapPin className="h-3 w-3 mr-1" />
              {post.row.user.city} {post.row.user.state}
            </span>
          )}
          <span className="text-gray-400">{formatDate(post.row.createdAt)}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center space-x-1 hover:text-purple-600">
            <MessageCircle className="h-5 w-5" />
            <span>{post.row.comments.length}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-purple-600">
            <ThumbsUp className="h-5 w-5" />
            <span>{post.row.postLikes.length}</span>
          </button>
          {post.row.postLists.length > 0 && (
            <div className="flex items-center space-x-1 text-purple-600">
              <List className="h-5 w-5" />
              <span>{post.row.postLists.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

