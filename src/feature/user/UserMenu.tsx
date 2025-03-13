import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CustomMenu from "@/feature/custom/CustomMenu";
import ModalView from "@/feature/modal/ModalView";
import { useState } from "react"
import { useUserContext } from "./userContext";
import CustomButton from "../custom/CustomButton";
import authClient from "@/lib/auth-client";

export default function UserMenu() {
  const user = useUserContext()
  const [impersonateOpened, setImpersonateOpened] = useState(false);
  function handleOpenImpersonate() {
    setImpersonateOpened(true);
  }
  function handleImpersonateOpenedChange(props: {
    opened: boolean
  }) {
    setImpersonateOpened(props.opened);
  }
  async function handleImpersonate () {
    console.log('Impersonating...')
    const impersonatedSession = await authClient.admin.impersonateUser({
      userId: user.row.id,
    });
    console.log('Impersonated!', impersonatedSession)
  }
  const title = <>Impersonate {user.row.email}</>
  return (
    <>
      <CustomMenu>
        <DropdownMenuItem onClick={handleOpenImpersonate}>Impersonate</DropdownMenuItem>
      </CustomMenu>
      <ModalView
        onOpenedChange={handleImpersonateOpenedChange}
        opened={impersonateOpened}
        title={title}
      >
        <CustomButton onClick={handleImpersonate}>Impersonate</CustomButton>
      </ModalView>
    </>
  );
}

