'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { communityLists } from '@/data/communityLists';
import { Heart, Share2, ShoppingCart, Baby, BookOpen, Video, Users, GitFork } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/Breadcrumb';

const typeIcons = {
  'products': ShoppingCart,
  'baby-names': Baby,
  'books': BookOpen,
  'streaming': Video,
  'custom': Users,
};

export default function ListDetailPage() {
  const { id } = useParams();
  const list = communityLists.find(l => l.id === id);
  const [isSaved, setIsSaved] = useState(false);
  const [isForked, setIsForked] = useState(false);
  
  if (!list) {
    return (
      <div>
        <Breadcrumb 
          items={[
            { label: 'Community Lists', href: '/lists' },
            { label: 'List not found' }
          ]} 
        />
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900">List not found</h1>
        </div>
      </div>
    );
  }

  const Icon = typeIcons[list.type];

  const handleFork = async () => {
    // Create a new list based on the community list
    const forkedList = {
      ...list,
      id: `forked-${list.id}`,
      title: `${list.title} (Forked)`,
      privacy: 'private',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setIsForked(true);
    // Here you would typically save the forked list to the user's lists
    console.log('Forked list:', forkedList);
  };

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Community Lists', href: '/lists' },
          { label: list.title }
        ]} 
      />

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{list.title}</h1>
              <div className="flex items-center gap-2 mt-1 text-gray-500">
                <span>by {list.author?.name}</span>
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
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant={isSaved ? "default" : "outline"}
              onClick={() => setIsSaved(!isSaved)}
              className={isSaved ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save List"}
            </Button>
            <Button
              variant="outline"
              onClick={handleFork}
              disabled={isForked}
            >
              <GitFork className="h-4 w-4 mr-2" />
              {isForked ? "Forked" : "Fork List"}
            </Button>
          </div>
        </div>

        {list.description && (
          <p className="text-gray-600 mb-6">{list.description}</p>
        )}

        <div className="space-y-4">
          {list.items?.map((item, index) => {
            if (!item) return null;
            
            return (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-700 mt-2 inline-block"
                      >
                        View Item →
                      </a>
                    )}
                  </div>
                  {item.price && (
                    <span className="text-lg font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}