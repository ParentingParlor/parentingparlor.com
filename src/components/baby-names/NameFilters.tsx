'use client';

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NameFiltersProps {
  selectedGender: string[];
  setSelectedGender: (gender: string[]) => void;
  selectedOrigins: string[];
  setSelectedOrigins: (origins: string[]) => void;
  lengthRange: [number, number];
  setLengthRange: (range: [number, number]) => void;
  nicknameLengthRange: [number, number];
  setNicknameLengthRange: (range: [number, number]) => void;
  selectedSyllables: number[];
  setSelectedSyllables: (syllables: number[]) => void;
  popularityRange: [number, number];
  setPopularityRange: (range: [number, number]) => void;
  rhymeWord: string;
  setRhymeWord: (word: string) => void;
}

const origins = [
  'English', 'Latin', 'Greek', 'Hebrew', 'Arabic', 'Celtic', 'Germanic',
  'Nordic', 'Spanish', 'French', 'Italian', 'Japanese', 'Chinese', 'Indian',
  'Persian', 'Russian', 'African', 'Irish', 'Welsh', 'Scottish',
];

export default function NameFilters({
  selectedGender,
  setSelectedGender,
  selectedOrigins,
  setSelectedOrigins,
  lengthRange,
  setLengthRange,
  nicknameLengthRange,
  setNicknameLengthRange,
  selectedSyllables,
  setSelectedSyllables,
  popularityRange,
  setPopularityRange,
  rhymeWord,
  setRhymeWord,
}: NameFiltersProps) {
  const toggleGender = (gender: string) => {
    setSelectedGender(prev =>
      prev.includes(gender)
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    );
  };

  const toggleOrigin = (origin: string) => {
    setSelectedOrigins(prev =>
      prev.includes(origin)
        ? prev.filter(o => o !== origin)
        : [...prev, origin]
    );
  };

  const toggleSyllable = (syllable: number) => {
    setSelectedSyllables(prev =>
      prev.includes(syllable)
        ? prev.filter(s => s !== syllable)
        : [...prev, syllable]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Gender</h3>
        <div className="space-y-2">
          {['male', 'female', 'unisex'].map((gender) => (
            <label
              key={gender}
              className="flex items-center"
            >
              <input
                type="checkbox"
                checked={selectedGender.includes(gender)}
                onChange={() => toggleGender(gender)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {gender}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Name Length</Label>
          <div className="pt-2 px-1">
            <Slider
              min={2}
              max={15}
              step={1}
              value={[lengthRange[0], lengthRange[1]]}
              onValueChange={(value) => setLengthRange([value[0], value[1]])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{lengthRange[0]} letters</span>
              <span>{lengthRange[1]} letters</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Nickname Length</Label>
          <div className="pt-2 px-1">
            <Slider
              min={2}
              max={10}
              step={1}
              value={[nicknameLengthRange[0], nicknameLengthRange[1]]}
              onValueChange={(value) => setNicknameLengthRange([value[0], value[1]])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{nicknameLengthRange[0]} letters</span>
              <span>{nicknameLengthRange[1]} letters</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Popularity Rank</Label>
          <div className="pt-2 px-1">
            <Slider
              min={1}
              max={1000}
              step={1}
              value={[popularityRange[0], popularityRange[1]]}
              onValueChange={(value) => setPopularityRange([value[0], value[1]])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Top {popularityRange[0]}</span>
              <span>to {popularityRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label>Find Rhyming Names</Label>
        <Input
          type="text"
          value={rhymeWord}
          onChange={(e) => setRhymeWord(e.target.value)}
          placeholder="Enter a word to find rhyming names"
          className="mt-2"
        />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Syllables</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((syllable) => (
            <button
              key={syllable}
              onClick={() => toggleSyllable(syllable)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSyllables.includes(syllable)
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {syllable}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Origin</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {origins.map((origin) => (
            <label
              key={origin}
              className="flex items-center"
            >
              <input
                type="checkbox"
                checked={selectedOrigins.includes(origin)}
                onChange={() => toggleOrigin(origin)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {origin}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}