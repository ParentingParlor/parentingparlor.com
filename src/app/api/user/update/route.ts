import { handleApi } from "@/feature/api/handleApi";
import handleUpdateUser from "@/feature/user/handleUpdateUser";
import { updateUserISchema, updateUserOSchema } from "@/feature/user/userTypes";

export async function POST(request: Request) {
  return handleApi({
    handle: handleUpdateUser,
    i: updateUserISchema,
    label: "/user/update",
    o: updateUserOSchema,
    request,
  });
}