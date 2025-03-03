'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { topics } from '@/data/topics';
import { SearchResult } from '@/types';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery
    ? topics
        .filter(topic => {
          const searchLower = searchQuery.toLowerCase();
          return (
            topic.title.toLowerCase().includes(searchLower) ||
            topic.author.name.toLowerCase().includes(searchLower) ||
            topic.content.toLowerCase().includes(searchLower) ||
            topic.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        })
        .map(topic => ({
          slug: topic.slug,
          title: topic.title,
          author: {
            name: topic.author.name,
            location: topic.author.location
          },
          tags: topic.tags
        }))
    : [];

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchResults }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}