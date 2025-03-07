'use client'

import authClient from "@/lib/authClient";

export default function AuthRegisterForm() {
  async function handleRegister() {
    const result = await authClient.signIn.magicLink({
      email: "user@email.com",
      callbackURL: "/dashboard", //redirect after successful login (optional)
    });
  }
  return (
    <form>
    </form>
  )
}