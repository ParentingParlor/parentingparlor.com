import { CreatePostProvider } from "@/feature/post/createPostContext";
import CreatePostForm from "@/feature/post/CreatePostForm";

export default async function CreatePostPage() {
  return (
    <CreatePostProvider>
      <div>
        <div>Create Post</div>
        <CreatePostForm />
      </div>
    </CreatePostProvider>
  )
}