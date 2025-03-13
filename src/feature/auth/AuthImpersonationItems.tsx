'use client'

import useRequiredAuth from "./useRequiredAuth";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function AuthImpersonateItems() {
  const auth = useRequiredAuth()
  if (!auth.session.impersonatedBy) return <></>
  async function handleStopImpersonating() {
    await auth.stopImpersonating()
  }
  return (
    <DropdownMenuItem onSelect={handleStopImpersonating}>
      Stop Impersonating
    </DropdownMenuItem>
  )
}