'use client'

import { useRouter } from "next/navigation";
import useRequiredAuth from "./useRequiredAuth";
import authClient from "@/lib/auth-client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Shield } from "lucide-react";

export default function AuthAdminItems() {
  const auth = useRequiredAuth()
  const router = useRouter();
  if (auth.user.role !== 'admin') return <></>
  function handleAdmin() {
    router.push('/admin')
  }
  return (
    <>
      <DropdownMenuItem onSelect={handleAdmin}>
        <Shield className="h-4 w-4 mr-2" />
        Admin
      </DropdownMenuItem>
    </>
  )
}