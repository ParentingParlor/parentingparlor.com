import { useAuthContext } from "./authContext"
import { RequiredAuth } from "./authTypes"

export default function useRequiredAuth(): RequiredAuth {
  const auth = useAuthContext();
  if (auth.session == null) {
    throw new Error("There is no session")
  }
  if (auth.user == null) {
    throw new Error("There is no user")
  }
  return {
    ...auth,
    session: auth.session,
    user: auth.user
  }
}