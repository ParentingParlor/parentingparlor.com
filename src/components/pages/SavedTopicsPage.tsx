'use client';

import { Bookmark } from 'lucide-react';

export default function SavedTopicsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Topics</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-12">
          <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved topics yet</h2>
          <p className="text-gray-600">
            Topics you save will appear here for easy access.
          </p>
        </div>
      </div>
    </div>
  );
}