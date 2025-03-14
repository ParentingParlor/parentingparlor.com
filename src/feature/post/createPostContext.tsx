'use client'

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import kneel from 'kneel'
import { CreatePostI, createPostISchema, createPostOSchema } from "./postTypes"
import useRequiredAuth from "../auth/useRequiredAuth"

interface CreatePostContextValue {
  content: string
  publishedAt: Date
  title: string
  updateContent: (props: { value: string }) => void
  updatePublishedAt: (props: { value: Date }) => void
  updateTitle: (props: { value: string }) => void
  send: () => Promise<void>
}

const createPostContext = createContext<CreatePostContextValue | undefined>(undefined)

export function CreatePostProvider (props: {
  children: React.ReactNode
}) {
  const auth = useRequiredAuth()
  const [content, setContent] = useState('')
  const [publishedAt, setPublishedAt] = useState(new Date())
  const [title, setTitle] = useState('')

  const updateContent = useCallback((props: { value: string }) => {
    setContent(props.value)
  }, [])

  const updatePublishedAt = useCallback((props: { value: Date }) => {
    setPublishedAt(props.value)
  }, [])

  const updateTitle = useCallback((props: { value: string }) => {
    setTitle(props.value)
  }, [])

  const send = useCallback(async () => {
    const body: CreatePostI = {
      content,
      slug: title,
      title
    }
    if (auth.admin) {
      body.publishedAt = publishedAt
    }
    console.log('body', body)
    await kneel({
      body,
      debug: true,
      i: createPostISchema,
      o: createPostOSchema,
      url: '/api/post/create',
    })
  }, [auth.admin, content, publishedAt, title])

  const value = useMemo(() => ({
    content,
    publishedAt,
    title,
    updateContent,
    updatePublishedAt,
    updateTitle,
    send
  }), [content, publishedAt, title, updateContent, updatePublishedAt, updateTitle, send])

  return (
    <createPostContext.Provider value={value}>
      {props.children}
    </createPostContext.Provider>
  )
}

export function useCreatePostContext () {
  const context = useContext(createPostContext)
  if (context === undefined) {
    throw new Error('useCreatePostContext must be used within a CreatePostProvider')
  }
  return context
}