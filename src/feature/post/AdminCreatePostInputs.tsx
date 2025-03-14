'use client'

import DateInput from "../date/DateInput"
import useRequiredAuth from "../auth/useRequiredAuth"
import { useCreatePostContext } from "./createPostContext"

export default function AdminCreatePostInputs () {
  const auth = useRequiredAuth()
  const createPost = useCreatePostContext()

  if (!auth.admin) {
    return <></>
  }

  return (
    <>
      <DateInput value={createPost.publishedAt} onChange={createPost.updatePublishedAt} />
    </>
  )
}