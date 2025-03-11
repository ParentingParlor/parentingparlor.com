import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function getRequiredAuthSession() {
  const awaited = await headers();
  const session = await auth.api.getSession({
    headers: awaited,
  });
  if (session == null) {
    throw new Error("Unauthenticated");
  }
  return session;
}