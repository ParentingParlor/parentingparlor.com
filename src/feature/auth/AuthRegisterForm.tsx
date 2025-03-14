"use client";

import { Input } from "@/components/ui/input";
import authClient from "@/lib/auth-client";
import { ChangeEvent, FormEvent, useState } from "react";
import CustomButton from "../custom/CustomButton";

export default function AuthRegisterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const result = await authClient.signIn.magicLink({
      email,
      callbackURL: "/", //redirect after successful login (optional)
    });
    setLoading(false);
  }
  return (
    <form onSubmit={handleRegister}>
      <p>We'll send you an email</p>
      <Input type="email" value={email} onChange={handleEmailChange} />
      <CustomButton type="submit" loading={loading}>
        Register
      </CustomButton>
    </form>
  );
}
