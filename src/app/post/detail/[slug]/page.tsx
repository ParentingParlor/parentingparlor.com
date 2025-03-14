import { db } from "@/db";
import findRelatedPostBySlugOrThrow from "@/feature/post/findRelatedPostBySlugOrThrow";
import { PostProvider } from "@/feature/post/postContext";
import PostDetail from "@/feature/post/PostDetail";

export default async function PostDetailPage(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const awaited = await props.params;
  const post = await findRelatedPostBySlugOrThrow({
    db,
    slug: awaited.slug,
  })
  return (
    <div>
      <PostProvider row={post}>
        <PostDetail />
      </PostProvider>
    </div>
  )
}