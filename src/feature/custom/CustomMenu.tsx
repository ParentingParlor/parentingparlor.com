import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";

export default function CustomMenu(props: {
  children: ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {props.children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}