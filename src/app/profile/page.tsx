'use client';

import AuthProfileForm from "@/feature/auth/AuthProfileForm";
import useRequiredAuth from "@/feature/auth/useRequiredAuth";
import Badge from "@/feature/badge/Badge";
import getUserLabel from "@/feature/user/getUserLabel";
import { MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/*
    id: 'verified-human',
    name: 'Verified Human',
    description: 'Verified real person',
    icon: '✓',
    color: 'green'
*/

export default function ProfilePage() {
  const auth = useRequiredAuth();
  const label = getUserLabel({ user: auth.user });
  const image = auth.user.image ?? undefined;
  console.log("Image URL:", image) // Debug the actual URL
  return (
    <div>
      <div>{label} Profile</div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20 border border-gray-300">
        <AvatarImage src={image} alt={label} referrerPolicy="no-referrer" />
            <AvatarFallback className="text-3xl font-semibold text-purple-700 bg-purple-200">
              {label[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{label}</h1>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{auth.user.city}, {auth.user.state}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">127</div>
            <div className="text-sm text-gray-500">Topics</div>
          </div>
        </div>
      </div>

      <AuthProfileForm />
    </div>
  )
}