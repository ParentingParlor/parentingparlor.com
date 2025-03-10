import { useAuthContext } from "./authContext";
import getAuthSession from "./getAuthSession";

type Auth = ReturnType<typeof useAuthContext>;

export type CustomSession = NonNullable<Awaited<ReturnType<typeof getAuthSession>>>

export interface RequiredAuth extends Auth {
  session: CustomSession;
}