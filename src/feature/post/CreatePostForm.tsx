'use client'

import { ChangeEvent, FormEvent } from "react"
import { Input } from "@/components/ui/input"
import CustomButton from "../custom/CustomButton"
import { Textarea } from "@/components/ui/textarea"
import useRequiredAuth from "../auth/useRequiredAuth"
import { useCreatePostContext } from "./createPostContext"
import AdminCreatePostInputs from "./AdminCreatePostInputs"

export default function CreatePostForm () {
  const createPost = useCreatePostContext()

  function handleContentChange (event: ChangeEvent<HTMLTextAreaElement>) {
    createPost.updateContent({ value: event.target.value })
  }

  function handleTitleChange (event: ChangeEvent<HTMLInputElement>) {
    createPost.updateTitle({ value: event.target.value })
  }

  async function handleSubmit (event: FormEvent) {
    event.preventDefault()
    await createPost.send()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        placeholder='Title'
        onChange={handleTitleChange}
        value={createPost.title}
      />
      <Textarea
        placeholder='Content'
        onChange={handleContentChange}
        value={createPost.content}
      />
      <AdminCreatePostInputs />
      <CustomButton type='submit'>Create Post</CustomButton>
    </form>
  )
}