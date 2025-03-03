'use client';

import { PartnerOffer } from '@/types';
import { Award, Clock, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RewardCardProps {
  offer: PartnerOffer;
  userPoints: number;
}

export default function RewardCard({ offer, userPoints }: RewardCardProps) {
  const canAfford = userPoints >= offer.pointsCost;
  const availableQuantity = offer.remainingQuantity > 0;
  const isActive = offer.status === 'active';
  const canRedeem = canAfford && availableQuantity && isActive;
  
  // Calculate days remaining until end date
  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(offer.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format original value as currency
  const formatCurrency = (cents: number | undefined) => {
    if (!cents) return null;
    
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(cents / 100);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border overflow-hidden ${!canRedeem ? 'opacity-75' : ''}`}>
      <div className="relative">
        {/* Image */}
        {offer.image ? (
          <div className="relative h-40 w-full">
            <Image
              src={offer.image}
              alt={offer.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-purple-100 h-40 w-full flex items-center justify-center">
            <Award className="h-16 w-16 text-purple-300" />
          </div>
        )}
        
        {/* Partner logo */}
        <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-4">
          <div className="h-10 w-10 bg-white rounded-full p-0.5 shadow-md">
            <div className="h-full w-full rounded-full overflow-hidden relative">
              <Image
                src={offer.partnerLogo}
                alt={offer.partnerName}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Points badge */}
        <div className="absolute top-0 right-0 m-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
            canAfford ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
          }`}>
            <Award className="h-4 w-4 mr-1" />
            {offer.pointsCost.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-6">
        <div className="text-xs text-gray-500 mb-1">{offer.partnerName}</div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {offer.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {offer.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {getDaysRemaining()} days left
          </div>
          
          {offer.remainingQuantity && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {offer.remainingQuantity} remaining
            </div>
          )}
          
          {formatCurrency(offer.originalValue) && (
            <div>
              Value: {formatCurrency(offer.originalValue)}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              offer.type === 'discount' ? 'bg-blue-100 text-blue-800' :
              offer.type === 'product' ? 'bg-green-100 text-green-800' :
              offer.type === 'service' ? 'bg-yellow-100 text-yellow-800' :
              offer.type === 'giveaway' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
            </div>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Link href={`/rewards/${offer.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs px-2"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {!isActive ? 'This offer is no longer active' :
                 !availableQuantity ? 'Out of stock' :
                 !canAfford ? `You need ${offer.pointsCost - userPoints} more points` :
                 'View more details and redeem'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}