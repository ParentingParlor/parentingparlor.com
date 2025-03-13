'use client';

import AuthProfileForm from "@/feature/auth/AuthProfileForm";
import useRequiredAuth from "@/feature/auth/useRequiredAuth";
import getUserLabel from "@/feature/user/getUserLabel";

export default function ProfilePage() {
  const auth = useRequiredAuth();
  const label = getUserLabel({ user: auth.user });

  return (
    <div>
      <div>{label} Profile</div>

      <AuthProfileForm />
    </div>
  )
}