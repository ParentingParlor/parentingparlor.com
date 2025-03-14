import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CustomMenu from "@/feature/custom/CustomMenu";
import ModalView from "@/feature/modal/ModalView";
import { useState } from "react"
import { useUserContext } from "./userContext";
import CustomButton from "../custom/CustomButton";
import { useAuthContext } from "../auth/authContext";

export default function UserMenu() {
  const auth = useAuthContext()
  const user = useUserContext()
  const [banOpened, setBanOpened] = useState(false);
  function handleBan () {
    console.log('Ban WIP')
  }
  function handleOpenBan() {
    setBanOpened(true);
  }
  function handleBanOpenedChange(props: {
    opened: boolean
  }) {
    setBanOpened(props.opened);
  }
  async function handleImpersonate () {
    await auth.impersonate({ userId: user.row.id })
  }
  const banTitle = <>Ban {user.row.email}</>
  return (
    <>
      <CustomMenu>
        <DropdownMenuItem onClick={handleImpersonate}>Impersonate</DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenBan}>Ban</DropdownMenuItem>
      </CustomMenu>
      <ModalView
        onOpenedChange={handleBanOpenedChange}
        opened={banOpened}
        title={banTitle}
      >
        <CustomButton onClick={handleBan}>Ban (WIP)</CustomButton>
      </ModalView>
    </>
  );
}

