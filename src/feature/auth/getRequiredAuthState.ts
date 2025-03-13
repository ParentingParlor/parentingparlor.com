import getAuthState from "./getAuthState";

export default async function getRequiredAuthState() {
  const authState = await getAuthState();
  if (authState == null) {
    throw new Error("Unauthenticated");
  }
  return authState;
}