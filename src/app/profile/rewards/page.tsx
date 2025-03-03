'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Breadcrumb from '@/components/Breadcrumb';
import { Award, Clock, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Claim } from '@/types';
import { partnerOffers } from '@/data/partners';

export default function MyRewardsPage() {
  const { claims } = useUser();
  const [activeTab, setActiveTab] = useState<'active' | 'redeemed' | 'expired'>('active');

  // Get partner offer details for each claim
  const claimsWithDetails = claims.map(claim => {
    const offer = partnerOffers.find(o => o.id === claim.offerId);
    return { ...claim, offer };
  });

  // Filter claims based on active tab
  const filteredClaims = claimsWithDetails.filter(claim => {
    if (activeTab === 'active') {
      return ['pending', 'approved'].includes(claim.status);
    } else if (activeTab === 'redeemed') {
      return claim.status === 'redeemed';
    } else {
      return ['expired', 'declined'].includes(claim.status);
    }
  });

  const getStatusBadge = (status: Claim['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Pending</span>;
      case 'approved':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Approved</span>;
      case 'redeemed':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Redeemed</span>;
      case 'expired':
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Expired</span>;
      case 'declined':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Declined</span>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Profile', href: '/profile' },
          { label: 'My Rewards' }
        ]} 
      />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Rewards</h1>
          <p className="text-gray-600 mt-1">
            View and manage your redeemed rewards
          </p>
        </div>
        
        <Link href="/rewards">
          <Button>
            <Award className="h-4 w-4 mr-2" />
            Explore Rewards
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'active'
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'redeemed'
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('redeemed')}
          >
            Redeemed
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'expired'
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('expired')}
          >
            Expired
          </button>
        </div>

        {filteredClaims.length === 0 ? (
          <div className="py-12 text-center">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No rewards found</h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' 
                ? "You don't have any active rewards yet." 
                : activeTab === 'redeemed'
                ? "You haven't redeemed any rewards yet."
                : "You don't have any expired rewards."}
            </p>
            <Link href="/rewards">
              <Button variant="outline">
                Browse Rewards
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {filteredClaims.map(claim => (
              <div key={claim.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">
                        {claim.offer?.title || 'Unknown Reward'}
                      </h3>
                      {getStatusBadge(claim.status)}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {claim.offer?.partnerName || 'Unknown Partner'}
                    </p>
                    
                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-4 gap-y-1">
                      <div className="flex items-center">
                        <Award className="h-3.5 w-3.5 mr-1" />
                        {claim.pointsSpent.toLocaleString()} points
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Claimed on {formatDate(claim.claimDate)}
                      </div>
                      {claim.redeemDate && (
                        <div className="flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Redeemed on {formatDate(claim.redeemDate)}
                        </div>
                      )}
                      {claim.expiryDate && (
                        <div className="flex items-center">
                          <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                          Expires on {formatDate(claim.expiryDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {claim.redeemCode && (
                      <div className="bg-purple-50 px-3 py-2 rounded-md">
                        <div className="text-xs text-purple-700 mb-1">Redemption Code</div>
                        <div className="font-mono font-medium text-purple-900">{claim.redeemCode}</div>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2">
                      {claim.offer && (
                        <Link href={`/rewards/${claim.offer.id}`}>
                          <Button variant="outline" size="sm" className="whitespace-nowrap w-full">
                            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                            View Details
                          </Button>
                        </Link>
                      )}
                      
                      {claim.status === 'approved' && (
                        <Button size="sm" className="whitespace-nowrap w-full">
                          Redeem Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}