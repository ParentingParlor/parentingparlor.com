'use client';

import { ListItem } from '@/types/list';
import { ExternalLink, Star, ThumbsUp, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProductItemProps {
  item: ListItem;
  onStatusChange: (id: string, status: 'have' | 'want' | 'recommend') => void;
}

export default function ProductItem({ item, onStatusChange }: ProductItemProps) {
  const statusIcons = {
    have: Check,
    want: ShoppingCart,
    recommend: ThumbsUp,
  };

  const StatusIcon = item.status ? statusIcons[item.status] : ShoppingCart;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="inline-block">
              <Button variant="outline" size="sm">
                <StatusIcon className="h-4 w-4 mr-2" />
                {item.status || 'Status'}
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onStatusChange(item.id, 'have')}>
              <Check className="h-4 w-4 mr-2" />
              I Have This
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(item.id, 'want')}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Want This
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange(item.id, 'recommend')}>
              <ThumbsUp className="h-4 w-4 mr-2" />
              Recommend This
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {item.price && (
        <div className="text-sm text-gray-600 mb-2">
          ${item.price.toFixed(2)}
        </div>
      )}

      {item.rating && (
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < item.rating!
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {item.review && (
        <p className="text-sm text-gray-700 mb-3">{item.review}</p>
      )}

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          View on Amazon
        </a>
      )}
    </div>
  );
}