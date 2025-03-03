'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Users, Stethoscope, Calendar, BookOpen, Heart, Baby, List } from 'lucide-react';

const pages = [
  { id: 'home', name: 'Home', icon: Home, path: '/' },
  { id: 'community', name: 'Community', icon: Users, path: '/community' },
  { id: 'health', name: 'Health & Safety', icon: Stethoscope, path: '/health' },
  { id: 'development', name: 'Development', icon: Calendar, path: '/development' },
  { id: 'education', name: 'Education', icon: BookOpen, path: '/education' },
  { id: 'wellness', name: 'Wellness', icon: Heart, path: '/wellness' },
  { id: 'lists', name: 'Community Lists', icon: List, path: '/lists' },
  { id: 'baby-names', name: 'Baby Names', icon: Baby, path: '/baby-names' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="space-y-1">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = pathname === page.path || pathname?.startsWith(page.path + '/');
          
          return (
            <Link
              key={page.id}
              href={page.path}
              className={`flex items-center px-4 py-2 text-sm rounded-lg hover:bg-gray-100 hover:text-purple-600 transition-colors
                ${isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-700'}`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{page.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}