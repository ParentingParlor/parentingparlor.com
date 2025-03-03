'use client';

import { useState } from 'react';
import { MessageCircle, ThumbsUp, List, Share2, CheckCircle } from 'lucide-react';
import { Comment } from '@/types';
import { Button } from '@/components/ui/button';
import AttachListDialog from './AttachListDialog';
import CommentList from './CommentList';
import AttachedLists from '@/components/lists/AttachedLists';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommentCardProps {
  comment: Comment;
  onReply: (parentId: string) => void;
  onAttachList: (commentId: string) => void;
  depth?: number;
}

export default function CommentCard({ comment, onReply, onAttachList, depth = 0 }: CommentCardProps) {
  const [attachListOpen, setAttachListOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const handleAttachList = () => {
    setAttachListOpen(true);
  };

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-100 pl-4' : ''}`}>
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <span className="font-medium text-gray-900">{comment.author}</span>
            {comment.authorIsVerified && (
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
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-500 text-sm">
            {new Date(comment.timestamp).toLocaleDateString()}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{comment.content}</p>

        {comment.attachedLists && comment.attachedLists.length > 0 && (
          <div className="mb-4">
            <AttachedLists lists={comment.attachedLists} />
          </div>
        )}

        <div className="flex items-center space-x-4 text-sm">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.likes}</span>
          </button>
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Reply</span>
          </button>
          <button
            onClick={handleAttachList}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
          >
            <List className="h-4 w-4" />
            <span>Attach List</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-purple-600 hover:text-purple-700 mb-4"
          >
            {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
          </button>
          
          {showReplies && (
            <CommentList
              comments={comment.replies}
              onReply={onReply}
              onAttachList={onAttachList}
            />
          )}
        </div>
      )}

      <AttachListDialog
        open={attachListOpen}
        onOpenChange={setAttachListOpen}
        onAttach={(listId) => {
          onAttachList(comment.id);
          setAttachListOpen(false);
        }}
      />
    </div>
  );
}