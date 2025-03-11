'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import kneel from 'kneel'
import { createPostISchema, createPostOSchema } from "./postTypes"
import { Input } from "@/components/ui/input"
import CustomButton from "../custom/CustomButton"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePostForm () {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  function handleContentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
  }

  function handleTitleChange (event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()
    await kneel({
      body: {
        content,
        slug: title,
        title
      },
      i: createPostISchema,
      o: createPostOSchema,
      url: '/api/post/create',
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input 
        placeholder='Title'
        onChange={handleTitleChange}
        value={title}
      />
      <Textarea
        placeholder='Content'
        onChange={handleContentChange}
        value={content}
      />
      <CustomButton type='submit'>Create Post</CustomButton>
    </form>
  )
}