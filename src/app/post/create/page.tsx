'use server'
import CreatePostForm from "@/feature/post/CreatePostForm";

export default async function CreatePostPage () {
  return (
    <div>
      <div>Create Post</div>

      <CreatePostForm />
    </div>
  )
}