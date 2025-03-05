'use client';

import { useState } from 'react';
import { Child } from '@/types';
import { Button } from './ui/button';
import { Eye, EyeOff, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ChildInfoProps {
  children: Child[];
  onUpdate: (children: Child[]) => void;
}

export default function ChildInfo({ children, onUpdate }: ChildInfoProps) {
  const [newChild, setNewChild] = useState<Partial<Child>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Child | null>(null);

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
      setShowAddForm(false);
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

  const startEditing = (child: Child) => {
    setEditingChildId(child.id);
    setEditFormData({ ...child });
  };

  const cancelEditing = () => {
    setEditingChildId(null);
    setEditFormData(null);
  };

  const saveEditing = () => {
    if (editFormData) {
      onUpdate(
        children.map(child =>
          child.id === editingChildId ? editFormData : child
        )
      );
      setEditingChildId(null);
      setEditFormData(null);
    }
  };

  const updateEditFormData = (field: keyof Child, value: string | boolean) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [field]: value
      });
    }
  };

  const calculateAge = (birthDate: string): string => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--;
    }
    
    if (years < 1) {
      // Calculate months for babies under 1 year
      const monthAge = months < 0 ? months + 12 : months;
      return `${monthAge} month${monthAge !== 1 ? 's' : ''}`;
    }
    
    return `${years} year${years !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-4">
      {/* List of children */}
      {children.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {children.map((child) => (
            <div
              key={child.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              {editingChildId === child.id ? (
                // Edit form
                <div className="flex-1 space-y-3">
                  <div>
                    <Label htmlFor={`child-name-${child.id}`}>Name</Label>
                    <Input
                      id={`child-name-${child.id}`}
                      value={editFormData?.name || ''}
                      onChange={(e) => updateEditFormData('name', e.target.value)}
                      placeholder="Child's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`child-date-${child.id}`}>Birth Date</Label>
                    <Input
                      id={`child-date-${child.id}`}
                      type="date"
                      value={editFormData?.birthDate || ''}
                      onChange={(e) => updateEditFormData('birthDate', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      onClick={saveEditing}
                      size="sm"
                      disabled={!editFormData?.name || !editFormData?.birthDate}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      onClick={cancelEditing}
                      variant="outline"
                      size="sm"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // Display mode
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{child.name}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Born: {new Date(child.birthDate).toLocaleDateString()}</p>
                    <p>Age: {calculateAge(child.birthDate)}</p>
                  </div>
                </div>
              )}

              {/* Action buttons - only visible in display mode */}
              {editingChildId !== child.id && (
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => toggleVisibility(child.id)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                    title={child.isPublic ? "Make private" : "Make public"}
                  >
                    {child.isPublic ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => startEditing(child)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                    title="Edit child information"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveChild(child.id)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-gray-100"
                    title="Remove child"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-500">No children added yet</p>
          <p className="text-sm text-gray-400 mt-1">Add your children to get personalized recommendations</p>
        </div>
      )}

      {/* Add Child Form */}
      {showAddForm ? (
        <div className="border-t pt-4 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-900 mb-4">Add Child</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="child-name">Name</Label>
              <Input
                id="child-name"
                type="text"
                value={newChild.name || ''}
                onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                placeholder="Child's name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="child-birthdate">Birth Date</Label>
              <Input
                id="child-birthdate"
                type="date"
                value={newChild.birthDate || ''}
                onChange={(e) => setNewChild({ ...newChild, birthDate: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={handleAddChild}
                disabled={!newChild.name || !newChild.birthDate}
              >
                Add Child
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setNewChild({});
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button onClick={() => setShowAddForm(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Child
        </Button>
      )}
    </div>
  );
}