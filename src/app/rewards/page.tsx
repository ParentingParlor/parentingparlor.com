'use client';

import { useState, useMemo } from 'react';
import { useUser, usePoints } from '@/context/UserContext';
import { partnerOffers } from '@/data/partners';
import Breadcrumb from '@/components/Breadcrumb';
import { Award, Filter, Search, ArrowUpDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import RewardCard from '@/components/rewards/RewardCard';
import { PartnerOffer } from '@/types';

export default function RewardsPage() {
  const { points } = usePoints();
  const user = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'points-asc' | 'points-desc' | 'newest' | 'popular'>('points-asc');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAffordableOnly, setShowAffordableOnly] = useState(false);

  // Filter offers based on search query, type, and affordability
  const filteredOffers = useMemo(() => {
    return partnerOffers.filter(offer => {
      // Filter by search query
      const matchesSearch = searchQuery.trim() === '' || 
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by type
      const matchesType = filterType === 'all' || offer.type === filterType;
      
      // Filter by affordability
      const isAffordable = !showAffordableOnly || offer.pointsCost <= points.total;
      
      // Filter by status
      const isActive = offer.status === 'active';
      
      return matchesSearch && matchesType && isAffordable && isActive;
    });
  }, [searchQuery, filterType, showAffordableOnly, points.total]);
  
  // Sort offers based on selected sort order
  const sortedOffers = useMemo(() => {
    return [...filteredOffers].sort((a, b) => {
      switch (sortOrder) {
        case 'points-asc':
          return a.pointsCost - b.pointsCost;
        case 'points-desc':
          return b.pointsCost - a.pointsCost;
        case 'newest':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'popular':
          return (b.totalQuantity - b.remainingQuantity) - (a.totalQuantity - a.remainingQuantity);
        default:
          return 0;
      }
    });
  }, [filteredOffers, sortOrder]);

  const offerTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'discount', label: 'Discounts' },
    { value: 'product', label: 'Products' },
    { value: 'service', label: 'Services' },
    { value: 'giveaway', label: 'Giveaways' },
    { value: 'experience', label: 'Experiences' },
  ];

  const sortOptions = [
    { value: 'points-asc', label: 'Points: Low to High' },
    { value: 'points-desc', label: 'Points: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
  ];

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Rewards Marketplace' }
        ]} 
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Marketplace</h1>
          <p className="text-gray-600 mt-2">
            Redeem your points for exclusive partner offers and products
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg flex items-center">
            <Award className="h-5 w-5 mr-2" />
            <span className="font-semibold">{points.total.toLocaleString()} points</span>
          </div>
          <Link href="/profile/points">
            <Button variant="outline" size="sm">
              Earn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search rewards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {offerTypes.find(t => t.value === filterType)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup 
                  value={filterType} 
                  onValueChange={(value) => setFilterType(value)}
                >
                  {offerTypes.map(type => (
                    <DropdownMenuRadioItem key={type.value} value={type.value}>
                      {type.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup 
                  value={sortOrder} 
                  onValueChange={(value) => setSortOrder(value as any)}
                >
                  {sortOptions.map(option => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showAffordableOnly}
              onChange={() => setShowAffordableOnly(!showAffordableOnly)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
            />
            <span className="text-sm text-gray-700">Show only rewards I can afford</span>
          </label>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  This will filter offers that cost less than or equal to your current point balance ({points.total} points)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Rewards Grid */}
      {sortedOffers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOffers.map((offer) => (
            <RewardCard 
              key={offer.id} 
              offer={offer}
              userPoints={points.total}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-10 text-center">
          <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No rewards found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filterType !== 'all' || showAffordableOnly ? 
              'Try adjusting your filters to see more rewards.' : 
              'New rewards will be added soon. Check back later!'}
          </p>
          {(searchQuery || filterType !== 'all' || showAffordableOnly) && (
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setShowAffordableOnly(false);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}