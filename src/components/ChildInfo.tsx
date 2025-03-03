'use client';

import { useState } from 'react';
import { Child } from '@/types';
import { Button } from './ui/button';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

interface ChildInfoProps {
  children: Child[];
  onUpdate: (children: Child[]) => void;
}

export default function ChildInfo({ children, onUpdate }: ChildInfoProps) {
  const [newChild, setNewChild] = useState<Partial<Child>>({});

  const handleAddChild = () => {
    if (newChild.name && newChild.birthDate) {
      const child: Child = {
        id: Date.now().toString(),
        name: newChild.name,
        birthDate: newChild.birthDate,
        isPublic: false,
      };
      onUpdate([...children, child]);
      setNewChild({});
    }
  };

  const handleRemoveChild = (id: string) => {
    onUpdate(children.filter(child => child.id !== id));
  };

  const toggleVisibility = (id: string) => {
    onUpdate(
      children.map(child =>
        child.id === id ? { ...child, isPublic: !child.isPublic } : child
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {children.map((child) => (
          <div
            key={child.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900">{child.name}</h3>
              <p className="text-sm text-gray-500">
                Born: {new Date(child.birthDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleVisibility(child.id)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                {child.isPublic ? <Eye /> : <EyeOff />}
              </button>
              <button
                onClick={() => handleRemoveChild(child.id)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium text-gray-900 mb-4">Add Child</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newChild.name || ''}
              onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              value={newChild.birthDate || ''}
              onChange={(e) => setNewChild({ ...newChild, birthDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Button onClick={handleAddChild} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Child
          </Button>
        </div>
      </div>
    </div>
  );
}