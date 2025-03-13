'use client'

import { useRouter } from "next/navigation";
import useRequiredAuth from "./useRequiredAuth";
import authClient from "@/lib/auth-client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function AuthAdminItems() {
  const auth = useRequiredAuth()
  const router = useRouter();
  if (auth.user.role !== 'admin') return <></>
  function handleAdmin() {
    router.push('/admin')
  }
  return (
    <>
      <DropdownMenuItem onSelect={handleAdmin}>Admin</DropdownMenuItem>
    </>
  )
}