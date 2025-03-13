import { useAuthContext } from "./authContext";
import getAuthState from "./getAuthState";

type Auth = ReturnType<typeof useAuthContext>;
export type AuthState = NonNullable<Awaited<ReturnType<typeof getAuthState>>>
export type AuthSession = AuthState['session'];
export type AuthUser = AuthState['user'];

export interface RequiredAuth extends Auth {
  session: AuthSession
  user: AuthUser
}