'use client';

import { useState } from 'react';
import { ThumbsUp, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductRecommendation } from '@/types/feature-post';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProductRecommendationListProps {
  recommendations: ProductRecommendation[];
  onVote: (recommendationId: string) => void;
}

export default function ProductRecommendationList({
  recommendations,
  onVote
}: ProductRecommendationListProps) {
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Community Recommendations ({recommendations.length})
        </h2>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'votes' ? 'default' : 'outline'}
            onClick={() => setSortBy('votes')}
            size="sm"
          >
            Most Voted
          </Button>
          <Button
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            onClick={() => setSortBy('recent')}
            size="sm"
          >
            Most Recent
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedRecommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="bg-white rounded-lg shadow-sm border p-4"
          >
            <div className="flex items-start gap-4">
              {recommendation.imageUrl && (
                <img
                  src={recommendation.imageUrl}
                  alt={recommendation.productName}
                  className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {recommendation.productName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${recommendation.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onVote(recommendation.id)}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{recommendation.votes}</span>
                  </Button>
                </div>

                <p className="mt-2 text-gray-700">{recommendation.comment}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={recommendation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Product
                  </a>
                  {recommendation.additionalUrls.length > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <LinkIcon className="h-4 w-4 mr-1" />
                            +{recommendation.additionalUrls.length} related
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-2">
                            {recommendation.additionalUrls.map((url, index) => (
                              <a
                                key={index}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm hover:text-purple-600"
                              >
                                Related Product {index + 1}
                              </a>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <span>{recommendation.userName}</span>
                  <span>•</span>
                  <span>{new Date(recommendation.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}