import { handleApi } from "@/feature/api/handleApi";
import handleReadUser from "@/feature/user/handleReadUser";
import { readUserISchema, readUserOSchema } from "@/feature/user/userTypes";

export async function POST(request: Request) {
  return handleApi({
    handle: handleReadUser,
    i: readUserISchema,
    label: "/user/read",
    o: readUserOSchema,
    request,
  });
}