'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function getAuthState() {
  const awaited = await headers();
  const authState = await auth.api.getSession({
    headers: awaited,
  });
  return authState;
}