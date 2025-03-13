'use client';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthSession, AuthState, AuthUser } from './authTypes';
import authClient from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import getAuthState from './getAuthSession';

export type AuthContextValue = {
  impersonate: (props: {
    userId: string
  }) => Promise<void>;
  logout: () => Promise<void>;
  logoutLoading: boolean;
  session?: AuthSession
  stopImpersonating: () => Promise<void>
  user?: AuthUser
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider(props: {
  children: ReactNode;
  state: AuthState | null
}) {
  const [session, setSession] = useState(props.state?.session)
  const [user, setUser] = useState(props.state?.user)
  useEffect(() => {
    if (props.state) {
      setSession(props.state.session)
      setUser(props.state.user)
    }
  }, [props.state])
  const [logoutLoading, setLogoutLoading] = useState(false)
  const router = useRouter()

  const impersonate = useCallback(async (props: {
    userId: string
  }) => {
    const impersonation = await authClient.admin.impersonateUser({
      userId: props.userId,
    });
    if (!impersonation.data) {
      throw new Error('Impersonation failed')
    }
    setSession(impersonation.data.session)
    const impersonatedUser = {
      ...impersonation.data.user,
      banned: false
    }
    setUser(impersonatedUser)
  }, [])

  const logout = useCallback(async () => {
    setLogoutLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh()
          setSession(undefined)
          setUser(undefined)
        }
      }
    });
    setLogoutLoading(false);
  }, [router])

  const stopImpersonating = useCallback(async () => {
    console.log('Stopping impersonation...')
    const authState =  await authClient.admin.stopImpersonating();
    if (!authState.data) {
      throw new Error('Failed to stop impersonation')
    }
    setSession(authState.data.session)
    const user = {
      ...authState.data.user,
      banned: false
    }
    setUser(user)
  }, [])

  const value = useMemo(() => {
    const value: AuthContextValue = {
      impersonate,
      logout,
      logoutLoading,
      session,
      stopImpersonating,
      user
    }
    return value
  }, [impersonate, logout, logoutLoading, session, stopImpersonating, user])

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
