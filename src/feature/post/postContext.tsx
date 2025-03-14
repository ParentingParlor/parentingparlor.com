'use client'

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { RelatedPost } from './postTypes';

interface PostContextValue {
  row: RelatedPost
}

const PostContext = createContext<PostContextValue | undefined>(undefined);

export function PostProvider (props: {
  children: ReactNode,
  row: RelatedPost
}) {
  const [row] = useState(props.row)

  const value = useMemo(() => {
    return {
      row
    }
  }, [row])

  return (
    <PostContext.Provider value={value}>
      {props.children}
    </PostContext.Provider>
  )
}

export function usePostContext () {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}