import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { User } from './userTypes';

interface UserContextValue {
  row: User;
}

const userContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider(props: {
  children: ReactNode;
  row: User;
}) {
  const [row] = useState(props.row);
  const value = useMemo(() => {
    return { row }
  }, [row]);
  return <userContext.Provider value={value}>{props.children}</userContext.Provider>;
}

export function useUserContext () {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}