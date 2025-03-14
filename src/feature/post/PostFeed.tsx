import { db } from "@/db";
import findRelatedPosts from "./findRelatedPosts";
import { desc } from "drizzle-orm";
import { post } from "@/db/schema";
import PostCardList from "./PostCardList";

export default async function PostFeed() {
  const posts = await findRelatedPosts({
    db,
    orderBy: [desc(post.createdAt)]
  });
  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            <PostCardList posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}