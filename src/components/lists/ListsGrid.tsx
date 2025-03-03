'use client';

import { useState } from 'react';
import { Lock, Globe, Users, ShoppingCart, Baby, BookOpen, Video, Link2, MessageCircle } from 'lucide-react';
import NextLink from 'next/link';
import { UserList, ListPrivacy } from '@/types/list';
import { defaultLists } from '@/data/defaultLists';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const privacyIcons = {
  private: Lock,
  friends: Users,
  public: Globe,
};

const typeIcons = {
  'products': ShoppingCart,
  'baby-names': Baby,
  'books': BookOpen,
  'streaming': Video,
  'custom': Link2,
};

export default function ListsGrid() {
  const [lists] = useState<UserList[]>(defaultLists);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => {
        const PrivacyIcon = privacyIcons[list.privacy];
        const TypeIcon = typeIcons[list.type];

        return (
          <div key={list.id} className="flex flex-col">
            <NextLink
              href={`/lists/${list.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border flex-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <TypeIcon className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{list.title}</h3>
                </div>
                <PrivacyIcon className="h-4 w-4 text-gray-400" />
              </div>

              {list.description && (
                <p className="text-sm text-gray-600 mb-4">{list.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {list.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500">
                {list.type === 'baby-names'
                  ? `${list.babyNames?.length || 0} names`
                  : `${list.items.length} items`}
              </div>
            </NextLink>

            {/* Publications section */}
            {list.publications && list.publications.length > 0 && (
              <div className="mt-2 px-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-purple-600 hover:text-purple-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Published in {list.publications.length} {list.publications.length === 1 ? 'place' : 'places'}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        {list.publications.map((pub) => (
                          <NextLink
                            key={pub.id}
                            href={pub.commentId ? `/topic/${pub.topicId}#comment-${pub.commentId}` : `/topic/${pub.topicId}`}
                            className="block text-sm hover:text-purple-600"
                          >
                            {pub.title}
                          </NextLink>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}