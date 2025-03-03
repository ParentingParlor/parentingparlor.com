'use client';

import { useState } from 'react';
import { ShoppingCart, Baby, BookOpen, Video, Users, Heart, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { communityLists } from '@/data/communityLists';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserList } from '@/types/list';

const typeIcons = {
  'products': ShoppingCart,
  'baby-names': Baby,
  'books': BookOpen,
  'streaming': Video,
  'custom': Users,
};

const typeLabels = {
  'products': 'Products',
  'baby-names': 'Baby Names',
  'books': 'Books',
  'streaming': 'Shows & Videos',
  'custom': 'Custom Lists',
};

interface CommunityListsProps {
  searchQuery?: string;
}

export default function CommunityLists({ searchQuery = '' }: CommunityListsProps) {
  const [savedLists, setSavedLists] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [forkedLists, setForkedLists] = useState<string[]>([]);

  const filteredLists = communityLists.filter(list => {
    const matchesSearch = list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (list.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      list.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || list.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleSave = (listId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedLists(prev => 
      prev.includes(listId)
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    );
  };

  const handleFork = async (list: UserList, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create a new list based on the community list
    const forkedList: UserList = {
      ...list,
      id: `forked-${list.id}`,
      title: `${list.title} (Forked)`,
      privacy: 'private',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to forked lists
    setForkedLists(prev => [...prev, list.id]);

    // Here you would typically save the forked list to the user's lists
    console.log('Forked list:', forkedList);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedType === 'all' ? 'All Types' : typeLabels[selectedType as keyof typeof typeLabels]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={selectedType} onValueChange={setSelectedType}>
              <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
              {Object.entries(typeLabels).map(([value, label]) => (
                <DropdownMenuRadioItem key={value} value={value}>
                  {label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list) => {
          const Icon = typeIcons[list.type];
          const isSaved = savedLists.includes(list.id);
          const isForked = forkedLists.includes(list.id);

          return (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="group bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-100 hover:border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {list.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      by {list.author?.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${isSaved ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                    onClick={(e) => handleSave(list.id, e)}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${isForked ? 'text-purple-500' : 'text-gray-400'} hover:text-purple-500`}
                    onClick={(e) => handleFork(list, e)}
                    disabled={isForked}
                  >
                    <GitFork className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {list.description && (
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {list.description}
                </p>
              )}

              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{list.items.length} items</span>
                  <span>•</span>
                  <span>{list.saves} saves</span>
                  {isForked && (
                    <>
                      <span>•</span>
                      <span className="text-purple-600">Forked</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {list.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white text-purple-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {list.tags.length > 3 && (
                  <span className="px-2 py-1 bg-white text-gray-500 rounded-full text-xs font-medium">
                    +{list.tags.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}