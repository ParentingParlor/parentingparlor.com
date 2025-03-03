'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TagList from '@/components/TagList';
import { List } from 'lucide-react';
import { UserList } from '@/types';

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  content?: string;
  tags: string[];
  attachedLists?: UserList[];
}

export default function PreviewDialog({
  open,
  onOpenChange,
  title = '',
  content = '',
  tags,
  attachedLists = [],
}: PreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

          <div className="flex flex-wrap gap-2">
            <TagList selectedTags={tags} interactive={false} />
          </div>

          <div className="prose max-w-none">
            {content.split('\n').filter(Boolean).map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          {attachedLists.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <List className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-purple-900">Attached Lists</h3>
              </div>
              <div className="space-y-2">
                {attachedLists.map((list) => (
                  <div key={list.id} className="bg-white rounded p-3">
                    <h4 className="font-medium">{list.title}</h4>
                    {list.description && (
                      <p className="text-sm text-gray-600">{list.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}