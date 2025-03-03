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
            <Link href="/profile/points">
              <Button variant="ghost" className="text-sm font-medium hidden sm:flex items-center gap-1">
                <Award className="h-4 w-4 text-purple-600 mr-1" />
                <span>{points.total.toLocaleString()} Points</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900 px-2 py-1">Notifications</h3>
                </div>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                    <div>
                      <div className="font-medium text-gray-900">{notification.title}</div>
                      <div className="text-sm text-gray-500">{notification.description}</div>
                      <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2 text-center text-purple-600 cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-700 font-medium">
                      {user.name[0]}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleNavigation('/profile')}>
                  <UserCircle className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/profile/my-lists')}>
                  <List className="h-4 w-4 mr-2" />
                  My Lists
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/profile/points')}>
                  <Award className="h-4 w-4 mr-2" />
                  My Points
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleNavigation('/profile/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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