'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Link2, Video, Film, Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { UserList, ListItem } from '@/types';

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (list: UserList) => void;
}

type ListType = 'products' | 'links' | 'movies' | 'shows' | 'custom';

interface ListTypeOption {
  value: ListType;
  icon: React.ElementType;
  label: string;
  description: string;
}

const listTypes: ListTypeOption[] = [
  {
    value: 'products',
    icon: ShoppingCart,
    label: 'Products',
    description: 'Create a list of products with prices and links'
  },
  {
    value: 'links',
    icon: Link2,
    label: 'Links',
    description: 'Collect useful websites and resources'
  },
  {
    value: 'movies',
    icon: Film,
    label: 'Movies',
    description: 'Track movies you want to watch or recommend'
  },
  {
    value: 'shows',
    icon: Video,
    label: 'TV Shows',
    description: 'List your favorite shows and recommendations'
  },
  {
    value: 'custom',
    icon: Link2,
    label: 'Custom',
    description: 'Create a custom list for anything else'
  }
];

export default function CreateListDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateListDialogProps) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<ListType>('products');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<ListItem[]>([]);
  const [privacy, setPrivacy] = useState<'private' | 'friends' | 'public'>('private');

  const resetForm = () => {
    setStep(1);
    setType('products');
    setTitle('');
    setDescription('');
    setItems([]);
    setPrivacy('private');
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleAddItem = () => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      title: '',
      addedAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<ListItem>) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleSubmit = () => {
    const newList: UserList = {
      id: Date.now().toString(),
      title,
      description,
      type,
      privacy,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
    };

    onCreated(newList);
    handleClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listTypes.map(({ value, icon: Icon, label, description }) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`p-4 text-left border rounded-lg transition-colors ${
              type === value ? 'border-purple-500 bg-purple-50' : 'hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon className="h-5 w-5 text-purple-600" />
              <span className="font-medium">{label}</span>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          List Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Give your list a name"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Add Items</h3>
        <Button
          type="button"
          onClick={handleAddItem}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="relative border rounded-lg p-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveItem(item.id)}
              className="absolute top-2 right-2"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
            <div className="pr-8 space-y-3">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Item title"
              />
              <textarea
                value={item.description || ''}
                onChange={(e) => handleUpdateItem(item.id, { description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Description (optional)"
                rows={2}
              />
              {type === 'products' && (
                <input
                  type="url"
                  value={item.url || ''}
                  onChange={(e) => handleUpdateItem(item.id, { url: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="URL (optional)"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={3}
          placeholder="Add a description for your list"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Privacy Setting
        </label>
        <div className="space-y-2">
          {[
            { value: 'private', label: 'Private', description: 'Only you can see this list' },
            { value: 'friends', label: 'Friends', description: 'Your friends can see this list' },
            { value: 'public', label: 'Public', description: 'Anyone can see this list' }
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-start p-3 border rounded-lg cursor-pointer ${
                privacy === option.value ? 'border-purple-500 bg-purple-50' : 'hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="privacy"
                value={option.value}
                checked={privacy === option.value}
                onChange={(e) => setPrivacy(e.target.value as typeof privacy)}
                className="mt-1"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? 'Create New List' : step === 2 ? 'Add Items' : 'Finish Setup'}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full ${
                    s === step ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">Step {step} of 3</div>
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={step === 1 ? handleClose : handleBack}
          >
            {step === 1 ? (
              'Cancel'
            ) : (
              <>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </>
            )}
          </Button>
          
          <Button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={
              (step === 1 && !title.trim()) ||
              (step === 2 && items.length === 0)
            }
          >
            {step === 3 ? (
              'Create List'
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}