'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { awardPoints, POINTS } from '@/lib/points';
import { UserPoints } from '@/types';

interface User {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  };
  points: UserPoints;
}

interface UserContextType {
  user: User;
  awardActivityPoints: (
    type: 'login' | 'view' | 'comment' | 'post' | 'invite' | 'other',
    amount?: number,
    description?: string
  ) => void;
}

const defaultPoints: UserPoints = {
  total: 0,
  thisMonth: 0,
  lastUpdated: new Date().toISOString(),
  history: [],
  activities: [],
  rewards: []
};

// Mock initial user data
const mockUser: User = {
  id: '1',
  name: 'Eve',
  location: {
    city: 'Washington',
    state: 'DC',
    coordinates: {
      latitude: 38.8951,
      longitude: -77.0364
    }
  },
  points: defaultPoints
};

const UserContext = createContext<UserContextType>({
  user: mockUser,
  awardActivityPoints: () => {}
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);

  useEffect(() => {
    // On first load, award login points
    handleAwardPoints('login', POINTS.LOGIN, 'Daily login bonus');
    
    // This would typically be fetched from an API
    // fetchUserData(userId).then(data => setUser(data));
  }, []);

  const handleAwardPoints = (
    type: 'login' | 'view' | 'comment' | 'post' | 'invite' | 'other',
    amount: number,
    description = ''
  ) => {
    setUser(prevUser => ({
      ...prevUser,
      points: awardPoints(prevUser.points, type, amount, description)
    }));
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        awardActivityPoints: handleAwardPoints
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context.user;
}

export function usePoints() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a UserProvider');
  }
  return {
    points: context.user.points,
    awardPoints: context.awardActivityPoints
  };
}