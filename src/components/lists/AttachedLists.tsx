'use client';

import { UserList } from '@/types/list';
import { List, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface AttachedListsProps {
  lists: UserList[];
}

export default function AttachedLists({ lists }: AttachedListsProps) {
  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <List className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="font-medium text-purple-900">Attached Lists</h3>
      </div>
      <div className="space-y-3">
        {lists.map((list) => (
          <div key={list.id} className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{list.title}</h4>
              <Link href={`/lists/${list.id}`}>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View List
                </Button>
              </Link>
            </div>
            {list.description && (
              <p className="text-sm text-gray-600">{list.description}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {list.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}