'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { partnerOffers } from '@/data/partners';
import { useUser, usePoints } from '@/context/UserContext';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Users, MapPin, Clock, Gift, CheckCircle, AlertTriangle, ExternalLink, InfoIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RewardDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { points, spendPoints } = usePoints();
  const user = useUser();
  
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [processingRedeem, setProcessingRedeem] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  // Find the offer
  const offer = partnerOffers.find(o => o.id === id);

  if (!offer) {
    return (
      <div>
        <Breadcrumb 
          items={[
            { label: 'Rewards Marketplace', href: '/rewards' },
            { label: 'Reward not found' }
          ]} 
        />
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900">Reward not found</h1>
          <p className="text-gray-600 mt-2">The reward you're looking for may have expired or been removed.</p>
          <Button className="mt-6" onClick={() => router.push('/rewards')}>
            Back to Rewards Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const canAfford = points.total >= offer.pointsCost;
  const availableQuantity = offer.remainingQuantity > 0;
  const isActive = offer.status === 'active';
  const canRedeem = canAfford && availableQuantity && isActive;

  const handleRedeemClick = () => {
    if (!canRedeem) return;
    setConfirmDialogOpen(true);
  };

  const handleConfirmRedeem = async () => {
    setProcessingRedeem(true);
    
    // Simulate API call to redeem offer
    setTimeout(() => {
      const success = spendPoints(
        offer.pointsCost, 
        `Redeemed: ${offer.title} from ${offer.partnerName}`
      );
      
      if (success) {
        // Add to user's claims
        const newClaim = {
          id: `claim-${Date.now()}`,
          offerId: offer.id,
          userId: user.id,
          pointsSpent: offer.pointsCost,
          claimDate: new Date().toISOString(),
          status: 'pending' as 'pending' | 'approved' | 'redeemed' | 'expired' | 'declined',
        };
        
        user.addClaim(newClaim);
        setRedeemSuccess(true);
      } else {
        // Handle failure case
        alert("Failed to redeem: Insufficient points");
        setConfirmDialogOpen(false);
      }
      
      setProcessingRedeem(false);
    }, 1500);
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(offer.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(cents / 100);
  };

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Rewards Marketplace', href: '/rewards' },
          { label: offer.title }
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main offer details */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {offer.image && (
              <div className="relative w-full h-64">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-gray-100 rounded-full overflow-hidden relative">
                  <Image 
                    src={offer.partnerLogo}
                    alt={offer.partnerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-gray-700">
                  Offered by <strong>{offer.partnerName}</strong>
                </span>
                {offer.isSponsored && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Sponsored
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{offer.title}</h1>
              <p className="text-gray-700 mb-6">{offer.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Offer ends in</p>
                    <p className="font-medium">{getDaysRemaining()} days</p>
                  </div>
                </div>
                
                {offer.remainingQuantity && (
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Remaining</p>
                      <p className="font-medium">{offer.remainingQuantity} of {offer.totalQuantity}</p>
                    </div>
                  </div>
                )}

                {offer.originalValue && (
                  <div className="flex items-center">
                    <Gift className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Value</p>
                      <p className="font-medium">{formatCurrency(offer.originalValue)}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-4">How to Redeem</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-line">{offer.redeemInstructions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
            <div className="text-gray-700 whitespace-pre-line">
              {offer.termsAndConditions}
            </div>
          </div>
        </div>

        {/* Right sidebar for checkout */}
        <div className="space-y-6">
          {/* Redemption Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Redeem Offer</h2>
              <div className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-medium flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {offer.pointsCost.toLocaleString()} points
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Your points balance:</span>
                <span className="font-medium">{points.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Reward cost:</span>
                <span className="font-medium">-{offer.pointsCost.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Points after redemption:</span>
                  <span className={`font-semibold ${canAfford ? 'text-gray-900' : 'text-red-600'}`}>
                    {Math.max(0, points.total - offer.pointsCost).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {!isActive && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">This offer is no longer active</p>
                </div>
              )}
              
              {isActive && !availableQuantity && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">This offer is currently out of stock</p>
                </div>
              )}

              {isActive && availableQuantity && !canAfford && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-lg">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">You need {offer.pointsCost - points.total} more points to redeem this offer</p>
                </div>
              )}

              <Button 
                className="w-full" 
                disabled={!canRedeem}
                onClick={handleRedeemClick}
              >
                Redeem Now
              </Button>
              
              <Link href="/rewards" className="block w-full">
                <Button variant="outline" className="w-full">
                  Back to Rewards
                </Button>
              </Link>
            </div>

            <div className="text-xs text-gray-500 mt-4 text-center">
              By redeeming this offer, you agree to the terms and conditions.
            </div>
          </div>

          {/* Partner Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-gray-100 rounded-full overflow-hidden relative flex-shrink-0">
                <Image 
                  src={offer.partnerLogo}
                  alt={offer.partnerName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{offer.partnerName}</h3>
                <p className="text-sm text-gray-500">Verified Partner</p>
              </div>
            </div>
            <Link href={`/partners/${offer.partnerId}`} className="block w-full">
              <Button variant="outline" className="w-full flex items-center justify-center" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Partner Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          {!redeemSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Redemption</DialogTitle>
                <DialogDescription>
                  You are about to redeem this offer for {offer.pointsCost.toLocaleString()} points.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="h-10 w-10 bg-gray-100 rounded-full overflow-hidden relative">
                    <Image 
                      src={offer.partnerLogo}
                      alt={offer.partnerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{offer.title}</h3>
                    <p className="text-sm text-gray-500">{offer.partnerName}</p>
                  </div>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Your points:</span>
                  <span className="font-medium">{points.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Redemption cost:</span>
                  <span className="font-medium">-{offer.pointsCost.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining points:</span>
                    <span className="font-semibold">
                      {(points.total - offer.pointsCost).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmRedeem}
                  disabled={processingRedeem}
                >
                  {processingRedeem ? 'Processing...' : 'Confirm Redemption'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Redemption Successful!</DialogTitle>
                <DialogDescription>
                  You have successfully redeemed this offer.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Thank you for redeeming!</h3>
                <p className="text-gray-600 mb-4">
                  Your redemption details have been sent to your registered email address. 
                  Please follow the instructions to claim your reward.
                </p>
                <p className="text-sm text-gray-500">
                  Your remaining points balance: <strong>{(points.total).toLocaleString()}</strong>
                </p>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  className="sm:flex-1"
                  onClick={() => {
                    setConfirmDialogOpen(false);
                    router.push('/profile/rewards');
                  }}
                >
                  View My Rewards
                </Button>
                <Button 
                  className="sm:flex-1"
                  onClick={() => {
                    setConfirmDialogOpen(false);
                    router.push('/rewards');
                  }}
                >
                  Explore More Rewards
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}