import { AuthUser } from "../auth/authTypes";
import { User } from "./userTypes";

export default function getUserLabel (props: {
  user: AuthUser | User
}) {
  if (props.user.displayName) {
    return props.user.displayName;
  }

  return props.user.name
}