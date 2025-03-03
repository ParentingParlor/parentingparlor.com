'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { List } from 'lucide-react';
import AttachListDialog from '@/components/lists/AttachListDialog';
import CreateListDialog from '@/components/lists/CreateListDialog';
import { UserList } from '@/types';

interface CommentFormProps {
  onSubmit: (content: string, attachedLists: UserList[]) => void;
  parentId?: string;
  placeholder?: string;
}

export default function CommentForm({ onSubmit, parentId, placeholder = 'Add to the discussion' }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [attachListOpen, setAttachListOpen] = useState(false);
  const [createListOpen, setCreateListOpen] = useState(false);
  const [attachedLists, setAttachedLists] = useState<UserList[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, attachedLists);
      setContent('');
      setAttachedLists([]);
    }
  };

  const handleAttachList = (list: UserList) => {
    setAttachedLists(prev => [...prev, list]);
    setAttachListOpen(false);
  };

  const handleCreateAndAttachList = (list: UserList) => {
    setAttachedLists(prev => [...prev, list]);
    setCreateListOpen(false);
  };

  const removeAttachedList = (listId: string) => {
    setAttachedLists(prev => prev.filter(list => list.id !== listId));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {attachedLists.length > 0 && (
        <div className="space-y-2">
          {attachedLists.map((list) => (
            <div key={list.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <List className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-900">{list.title}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAttachedList(list.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setAttachListOpen(true)}
          >
            Attach List
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setCreateListOpen(true)}
          >
            Create List
          </Button>
        </div>
        <Button type="submit" disabled={!content.trim()}>
          Comment
        </Button>
      </div>

      <AttachListDialog
        open={attachListOpen}
        onOpenChange={setAttachListOpen}
        onAttach={handleAttachList}
      />

      <CreateListDialog
        open={createListOpen}
        onOpenChange={setCreateListOpen}
        onCreated={handleCreateAndAttachList}
      />
    </form>
  );
}