import { handleApi } from "@/feature/api/handleApi";
import handleCreatePost from "@/feature/post/handleCreatePost";
import { createPostISchema, createPostOSchema } from "@/feature/post/postTypes";

export async function POST(request: Request) {
  return handleApi({
    handle: handleCreatePost,
    i: createPostISchema,
    label: "/post/create",
    o: createPostOSchema,
    request,
  });
}