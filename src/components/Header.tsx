'use client';

import { Search, Bell, UserCircle, List, Settings, Menu, Award } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import SearchDropdown from './SearchDropdown';
import { useRef, useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { useUser, usePoints } from '@/context/UserContext';
import AuthHeader from '@/feature/auth/AuthHeader';

interface HeaderProps {
  showMobileMenu: boolean;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export default function Header({ showMobileMenu, sidebarOpen, onSidebarOpenChange }: HeaderProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery, searchResults } = useSearch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const user = useUser();
  const { points, awardPoints } = usePoints();

  const handleSearchFocus = () => {
    setDropdownVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New comment on your post",
      description: "Sarah commented on your sleep training topic",
      time: "5m ago"
    },
    {
      id: 2,
      title: "Your post was featured",
      description: "Your topic about baby food was featured",
      time: "1h ago"
    },
    {
      id: 3,
      title: "New milestone reached",
      description: "You've helped 100 parents with your advice!",
      time: "2h ago"
    }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-xl font-bold text-gray-900">Parenting Parlor</span>
          </Link>
          
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8" ref={searchContainerRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <SearchDropdown
                visible={dropdownVisible && searchQuery.length > 0}
                results={searchResults}
                onSelect={(slug) => {
                  setDropdownVisible(false);
                  setSearchQuery('');
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AuthHeader />

            {showMobileMenu && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => onSidebarOpenChange?.(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}