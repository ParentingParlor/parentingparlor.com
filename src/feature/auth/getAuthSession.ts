import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function getAuthSession() {
  const awaited = await headers();
  const session = await auth.api.getSession({
    headers: awaited,
  });
  return session;
}