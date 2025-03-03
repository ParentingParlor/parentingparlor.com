'use client';

import { useState } from 'react';
import { Plus, Minus, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductRecommendationFormProps {
  onSubmit: (mainUrl: string, comment: string, additionalUrls: string[]) => void;
}

export default function ProductRecommendationForm({ onSubmit }: ProductRecommendationFormProps) {
  const [mainUrl, setMainUrl] = useState('');
  const [comment, setComment] = useState('');
  const [additionalUrls, setAdditionalUrls] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [productPreview, setProductPreview] = useState<{
    name: string;
    price: number;
    imageUrl: string;
  } | null>(null);

  const handleMainUrlChange = async (url: string) => {
    setMainUrl(url);
    if (url.includes('amazon.com')) {
      setIsLoading(true);
      try {
        // In a real implementation, this would call your API to fetch product details
        const response = await fetch(`/api/product-info?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setProductPreview(data);
      } catch (error) {
        console.error('Failed to fetch product info:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addUrlField = () => {
    if (additionalUrls.length < 3) {
      setAdditionalUrls([...additionalUrls, '']);
    }
  };

  const removeUrlField = (index: number) => {
    setAdditionalUrls(additionalUrls.filter((_, i) => i !== index));
  };

  const updateAdditionalUrl = (index: number, value: string) => {
    const newUrls = [...additionalUrls];
    newUrls[index] = value;
    setAdditionalUrls(newUrls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mainUrl && comment) {
      onSubmit(mainUrl, comment, additionalUrls.filter(Boolean));
      setMainUrl('');
      setComment('');
      setAdditionalUrls(['']);
      setProductPreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Product URL
          </label>
          <div className="relative">
            <Input
              type="url"
              value={mainUrl}
              onChange={(e) => handleMainUrlChange(e.target.value)}
              placeholder="Paste Amazon product URL"
              className="pl-10"
              required
            />
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {isLoading && (
          <div className="animate-pulse bg-gray-100 rounded-lg p-4">
            Loading product information...
          </div>
        )}

        {productPreview && (
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
            {productPreview.imageUrl && (
              <img
                src={productPreview.imageUrl}
                alt={productPreview.name}
                className="w-16 h-16 object-contain"
              />
            )}
            <div>
              <h3 className="font-medium text-gray-900">{productPreview.name}</h3>
              <p className="text-gray-600">${productPreview.price.toFixed(2)}</p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Why do you recommend this product?
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Share your experience with this product..."
            required
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Additional Related Products (Optional)
            </label>
            {additionalUrls.length < 3 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addUrlField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add URL
              </Button>
            )}
          </div>

          {additionalUrls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="url"
                value={url}
                onChange={(e) => updateAdditionalUrl(index, e.target.value)}
                placeholder="Additional product URL"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeUrlField(index)}
              >
                <Minus className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={!mainUrl || !comment}>
        Share Recommendation
      </Button>
    </form>
  );
}