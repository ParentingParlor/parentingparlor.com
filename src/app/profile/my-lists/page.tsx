'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Plus, ChevronDown, ChevronUp, Lock, Globe, Users, ShoppingCart, Baby, BookOpen, Video, Link2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateListDialog from '@/components/lists/CreateListDialog';
import Link from 'next/link';
import { defaultLists } from '@/data/defaultLists';
import { popularCommunityLists } from '@/data/communityLists';

const typeIcons = {
  'products': ShoppingCart,
  'baby-names': Baby,
  'books': BookOpen,
  'streaming': Video,
  'custom': Link2,
};

const privacyIcons = {
  'private': Lock,
  'friends': Users,
  'public': Globe,
};

export default function MyListsPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [showDefaultLists, setShowDefaultLists] = useState(true);
  const [showCommunityLists, setShowCommunityLists] = useState(false);
  const [savedLists, setSavedLists] = useState<string[]>([]);

  const defaultSystemLists = defaultLists.filter(list => 
    ['products', 'baby-names', 'books', 'streaming'].includes(list.type)
  );

  const customLists = defaultLists.filter(list => list.type === 'custom');

  const handleSave = (listId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedLists(prev => 
      prev.includes(listId)
        ? prev.filter(id => id !== listId)
        : [...prev, listId]
    );
  };

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Profile', href: '/profile' },
          { label: 'My Lists' }
        ]} 
      />

      {/* Your Default Lists Section */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
        <button
          onClick={() => setShowDefaultLists(!showDefaultLists)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Default Lists</h2>
            <p className="text-sm text-gray-600">
              Built-in lists to help you get started
            </p>
          </div>
          {showDefaultLists ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {showDefaultLists && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {defaultSystemLists.map((list) => {
              const TypeIcon = typeIcons[list.type];
              const PrivacyIcon = privacyIcons[list.privacy];

              return (
                <Link
                  key={list.id}
                  href={`/lists/${list.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium text-gray-900">{list.title}</h3>
                    </div>
                    <PrivacyIcon className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {list.type === 'baby-names' 
                      ? `${list.babyNames?.length || 0} names`
                      : `${list.items.length} items`}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Community Lists Section */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
        <button
          onClick={() => setShowCommunityLists(!showCommunityLists)}
          className="w-full flex items-center justify-between text-left"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Popular Community Lists</h2>
            <p className="text-sm text-gray-600">
              Discover and get inspired by other parents' lists
            </p>
          </div>
          {showCommunityLists ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </button>

        {showCommunityLists && (
          <div className="mt-4 space-y-2">
            {popularCommunityLists.slice(0, 5).map((list) => {
              const TypeIcon = typeIcons[list.type];
              const isSaved = savedLists.includes(list.id);

              return (
                <Link
                  key={list.id}
                  href={`/lists/${list.id}`}
                  className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TypeIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-purple-600">
                        {list.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {list.items.length} items • {list.saves} saves
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${isSaved ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
                    onClick={(e) => handleSave(list.id, e)}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </Link>
              );
            })}
            <div className="pt-2 text-center">
              <Link href="/lists">
                <Button variant="outline" size="sm">
                  View All Community Lists
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Custom Lists Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Lists</h1>
          <p className="text-gray-600 mt-1">
            Create and manage your own lists
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create List
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {customLists.map((list) => {
          const TypeIcon = typeIcons[list.type];
          const PrivacyIcon = privacyIcons[list.privacy];

          return (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="block bg-white p-6 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TypeIcon className="h-5 w-5 text-purple-600" />
                  <h3 className="font-medium text-gray-900">{list.title}</h3>
                </div>
                <PrivacyIcon className="h-4 w-4 text-gray-400" />
              </div>
              {list.description && (
                <p className="text-sm text-gray-600 mb-3">{list.description}</p>
              )}
              <p className="text-sm text-gray-500">
                {list.items.length} items
              </p>
            </Link>
          );
        })}
      </div>
      
      <CreateListDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onCreated={() => {
          setCreateDialogOpen(false);
        }}
      />
    </div>
  );
}