'use client';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { CustomSession } from './authTypes';
import authClient from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export type AuthContextValue = {
  logout: () => Promise<void>;
  logoutLoading: boolean;
  session: CustomSession | null;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider(props: {
  children: ReactNode;
  session: CustomSession | null
}) {
  const [session, setSession] = useState(props.session)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter()

  const logout = useCallback(async () => {
    console.log('logout')
    setLogoutLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
          setSession(null)
        }
      }
    });
    setLogoutLoading(false);
  }, [router])

  const value = useMemo(() => {
    return {
      logout,
      logoutLoading,
      session,
    }
  }, [logout, logoutLoading, session])

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
