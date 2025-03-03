'use client';

import { useState } from 'react';
import { List } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { defaultLists } from '@/data/defaultLists';

interface AttachListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttach: (listId: string) => void;
}

export default function AttachListDialog({
  open,
  onOpenChange,
  onAttach,
}: AttachListDialogProps) {
  const [selectedList, setSelectedList] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Attach a List</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {defaultLists.map((list) => (
            <div
              key={list.id}
              onClick={() => setSelectedList(list.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedList === list.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <List className="h-5 w-5 text-purple-600 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">{list.title}</h3>
                  {list.description && (
                    <p className="text-sm text-gray-500">{list.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => selectedList && onAttach(selectedList)}
            disabled={!selectedList}
          >
            Attach List
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}