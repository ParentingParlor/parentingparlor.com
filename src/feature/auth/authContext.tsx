'use client';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { AuthState } from './authTypes';
import authClient from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export type AuthContextValue = {
  logout: () => Promise<void>;
  logoutLoading: boolean;
  session?: AuthState['session']
  user?: AuthState['user']
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider(props: {
  children: ReactNode;
  state: AuthState | null
}) {
  const [state, setState] = useState(props.state)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter()

  const logout = useCallback(async () => {
    console.log('logout')
    setLogoutLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
          setState(null)
        }
      }
    });
    setLogoutLoading(false);
  }, [router])

  const value = useMemo(() => {
    const value: AuthContextValue = {
      ...state,
      logout,
      logoutLoading,
    }
    return value
  }, [logout, logoutLoading, state])

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
