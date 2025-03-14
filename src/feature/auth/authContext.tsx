'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthSession, AuthState, AuthUser } from './authTypes';
import authClient from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { UpdateUserI, updateUserISchema, updateUserOSchema } from '../user/userTypes';
import kneel from 'kneel';
import kneelReadUser from '../user/kneelReadUser';

export type AuthContextValue = {
  admin: boolean
  impersonate: (props: {
    userId: string
  }) => Promise<void>;
  logout: () => Promise<void>;
  logoutLoading: boolean;
  session?: AuthSession
  stopImpersonating: () => Promise<void>
  update: (props: {
    i: UpdateUserI
  }) => Promise<void>
  updating: boolean
  user?: AuthUser
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider(props: {
  children: ReactNode;
  state: AuthState | null
}) {
  const [session, setSession] = useState(props.state?.session)
  const [updating, setUpdating] = useState(false)
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
    console.log('impersonating...')
    const impersonation = await authClient.admin.impersonateUser({
      userId: props.userId,
    });
    const user = await kneelReadUser({ i: { userId: props.userId } })
    if (!impersonation.data) {
      throw new Error('Impersonation failed')
    }
    setSession(impersonation.data.session)
    const impersonatedUser = {
      ...user,
      ...impersonation.data.user,
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
    const unimpersonation =  await authClient.admin.stopImpersonating();
    if (!unimpersonation.data) {
      throw new Error('Failed to stop impersonation')
    }
    setSession(unimpersonation.data.session)
    const user = await kneelReadUser({ i: { userId: unimpersonation.data.user.id } })
    const unimpersonatedUser = {
      ...user,
      ...unimpersonation.data.user,
    }
    setUser(unimpersonatedUser)
  }, [])

  const update = useCallback(async (props: {
    i: UpdateUserI
  }) => {
    setUpdating(true)
    const user = await kneel({
      body: props.i,
      i: updateUserISchema,
      o: updateUserOSchema,
      url: '/api/user/update'
    })
    setUser(user)
    setUpdating(false)
  }, [])

  const value = useMemo(() => {
    const admin = user?.role === 'admin'
    const value: AuthContextValue = {
      admin,
      impersonate,
      logout,
      logoutLoading,
      session,
      stopImpersonating,
      update,
      updating,
      user
    }
    return value
  }, [impersonate, logout, logoutLoading, session, stopImpersonating, update, updating, user])

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
