"use client"

import AuthProfileForm from "@/feature/auth/AuthProfileForm"
import useRequiredAuth from "@/feature/auth/useRequiredAuth"
import Badge from "@/feature/badge/Badge"
import getUserLabel from "@/feature/user/getUserLabel"
import { MapPin, User } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function ProfilePage() {
  const auth = useRequiredAuth()
  const label = getUserLabel({ user: auth.user })

  return (
    <div>
      <div>{label} Profile</div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-gray-200">
            {auth.user.image ? <AvatarImage src={auth.user.image} alt={label} referrerPolicy="no-referrer" /> : null}
            <AvatarFallback className="bg-gray-100">
              {label?.[0] ? (
                <span className="text-3xl font-semibold text-purple-700">{label[0]}</span>
              ) : (
                <User className="h-10 w-10 text-gray-400" />
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{label}</h1>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span>
                {auth.user.city}, {auth.user.state}
              </span>
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

