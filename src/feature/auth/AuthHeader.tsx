import { useAuthContext } from "./authContext";
import AuthLoginHeader from "./AuthLoginHeader";
import AuthProfileHeader from "./AuthProfileHeader";

export default function AuthHeader() {
  const auth = useAuthContext()
  if (auth.logoutLoading) {
    return <>Logging out...</>
  }
  if (auth.session) {
    return <AuthProfileHeader />
  }
  return <AuthLoginHeader />
}