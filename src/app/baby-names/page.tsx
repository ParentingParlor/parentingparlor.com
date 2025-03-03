'use client';

import { useState } from 'react';
import { Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BabyName } from '@/types/list';
import BabyNameCard from '@/components/baby-names/BabyNameCard';
import NameFilters from '@/components/baby-names/NameFilters';
import { generateBabyNames } from '@/data/babyNames';
import { getRhymingScore } from '@/lib/rhyming';
import Breadcrumb from '@/components/Breadcrumb';

export default function BabyNamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [lengthRange, setLengthRange] = useState<[number, number]>([2, 15]);
  const [nicknameLengthRange, setNicknameLengthRange] = useState<[number, number]>([2, 10]);
  const [selectedSyllables, setSelectedSyllables] = useState<number[]>([]);
  const [popularityRange, setPopularityRange] = useState<[number, number]>([1, 1000]);
  const [rhymeWord, setRhymeWord] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const [names] = useState<BabyName[]>(generateBabyNames(200));

  const toggleFavorite = (nameId: string) => {
    setFavorites(prev =>
      prev.includes(nameId)
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };

  const filteredNames = names.filter(name => {
    const matchesSearch = searchQuery
      ? name.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesGender = selectedGender.length
      ? selectedGender.includes(name.gender)
      : true;
    const matchesOrigin = selectedOrigins.length
      ? selectedOrigins.includes(name.origin)
      : true;
    const matchesLength = name.length >= lengthRange[0] && name.length <= lengthRange[1];
    const matchesNicknameLength = !name.nickname || 
      (name.nicknameLength && name.nicknameLength >= nicknameLengthRange[0] && 
       name.nicknameLength <= nicknameLengthRange[1]);
    const matchesSyllables = selectedSyllables.length
      ? selectedSyllables.includes(name.syllables)
      : true;
    const matchesPopularity = name.rank 
      ? name.rank >= popularityRange[0] && name.rank <= popularityRange[1]
      : true;
    const matchesRhyme = rhymeWord
      ? getRhymingScore(name.name, rhymeWord) > 0.5
      : true;

    return matchesSearch && matchesGender && matchesOrigin && 
           matchesLength && matchesNicknameLength && 
           matchesSyllables && matchesPopularity && matchesRhyme;
  }).sort((a, b) => {
    if (rhymeWord) {
      return getRhymingScore(b.name, rhymeWord) - getRhymingScore(a.name, rhymeWord);
    }
    return 0;
  });

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Baby Names' }
        ]} 
      />

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Baby Name Wizard</h1>
          <p className="text-gray-600 mt-2">
            Find the perfect name for your little one
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {/* Navigate to favorites list */}}
        >
          <Heart className="h-4 w-4 mr-2" />
          Favorites ({favorites.length})
        </Button>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <NameFilters
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedOrigins={selectedOrigins}
            setSelectedOrigins={setSelectedOrigins}
            lengthRange={lengthRange}
            setLengthRange={setLengthRange}
            nicknameLengthRange={nicknameLengthRange}
            setNicknameLengthRange={setNicknameLengthRange}
            selectedSyllables={selectedSyllables}
            setSelectedSyllables={setSelectedSyllables}
            popularityRange={popularityRange}
            setPopularityRange={setPopularityRange}
            rhymeWord={rhymeWord}
            setRhymeWord={setRhymeWord}
          />
        </div>

        <div className="flex-1">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search names..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNames.map((name) => (
              <BabyNameCard
                key={name.id}
                name={name}
                isFavorite={favorites.includes(name.id)}
                onToggleFavorite={() => toggleFavorite(name.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}