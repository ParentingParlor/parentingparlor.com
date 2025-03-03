'use client';

import { Search, MapPin } from 'lucide-react';
import Link from 'next/link';
import { SearchResult } from '@/types';

interface SearchDropdownProps {
  visible: boolean;
  results: SearchResult[];
  onSelect: (slug: string) => void;
}

export default function SearchDropdown({ visible, results, onSelect }: SearchDropdownProps) {
  if (!visible || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      {results.map((result) => (
        <Link
          key={result.slug}
          href={`/topic/${result.slug}`}
          onClick={() => onSelect(result.slug)}
          className="flex items-start gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
        >
          <Search className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-900">{result.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{result.author.name}</span>
              {result.author.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {result.author.location}
                  </span>
                </>
              )}
            </div>
            {result.tags && (
              <div className="flex flex-wrap gap-1 mt-1">
                {result.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}