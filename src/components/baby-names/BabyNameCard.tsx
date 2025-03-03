'use client';

import { Heart, TrendingUp } from 'lucide-react';
import { BabyName } from '@/types/list';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BabyNameCardProps {
  name: BabyName;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function BabyNameCard({ name, isFavorite, onToggleFavorite }: BabyNameCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{name.name}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm text-purple-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="ml-1">#{name.rank}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p>Current rank: #{name.rank}</p>
                    {name.yearRank && Object.entries(name.yearRank).map(([year, rank]) => (
                      <p key={year}>{year}: #{rank}</p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-500">{name.origin}</p>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-full ${
            isFavorite
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-600">{name.meaning}</p>
        {name.pronunciation && (
          <p className="text-sm text-gray-500 mt-1">
            Pronunciation: {name.pronunciation}
          </p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            name.gender === 'male'
              ? 'bg-blue-100 text-blue-800'
              : name.gender === 'female'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {name.gender}
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
          {name.syllables} {name.syllables === 1 ? 'syllable' : 'syllables'}
        </span>
        {name.nickname && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
            Nickname: {name.nickname}
          </span>
        )}
      </div>
    </div>
  );
}