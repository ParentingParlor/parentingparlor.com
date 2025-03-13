import { TableCell } from "@/components/ui/table";
import { UserProvider } from "./userContext";
import { User } from "./userTypes";
import UserMenu from "./UserMenu";

export default function UserCells(props: {
  row: User
}) {
  return (
    <UserProvider row={props.row}>
      <TableCell>
        {props.row.email}
      </TableCell>
      <TableCell>
        {props.row.name}
      </TableCell>
      <TableCell>
        {props.row.role}
      </TableCell>
      <TableCell>
        <UserMenu />
      </TableCell>
    </UserProvider>
  )
}