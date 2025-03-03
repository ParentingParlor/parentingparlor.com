'use client';

import { Comment } from '@/types';
import CommentCard from './CommentCard';

interface CommentListProps {
  comments: Comment[];
  onReply: (parentId: string) => void;
  onAttachList: (commentId: string) => void;
}

export default function CommentList({ comments, onReply, onAttachList }: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onAttachList={onAttachList}
        />
      ))}
    </div>
  );
}