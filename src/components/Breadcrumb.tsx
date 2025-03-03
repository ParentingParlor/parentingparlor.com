'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center text-sm">
        <Link href="/" className="text-gray-600 hover:text-purple-600">
          Home
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            {item.href ? (
              <Link href={item.href} className="text-gray-600 hover:text-purple-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium truncate">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}