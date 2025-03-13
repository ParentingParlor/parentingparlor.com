'use client'

import { createContext, ReactNode, useContext, useCallback, useEffect, useMemo, useState } from "react";

interface ModalContextValue {
  handleOpenChange: (props: {
    opened: boolean
  }) => void,
  opened?: boolean,
}

const modalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider(props: {
  children: ReactNode,
  onOpenChange?: (props: {
    opened: boolean
  }) => void,
  opened?: boolean,
}) {
  const [opened, setOpened] = useState(props.opened);
  useEffect(() => {
    if (props.opened !== undefined) {
      setOpened(props.opened);
    }
  }, [props.opened]);
  function handleOpenChange(handleProps: {
    opened: boolean
  }) {
    setOpened(handleProps.opened);
    props.onOpenChange?.({
      opened: handleProps.opened
    });
  }
  const value = {
    handleOpenChange,
    opened,
  };
  return (
    <modalContext.Provider value={value}>
      {props.children}
    </modalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}