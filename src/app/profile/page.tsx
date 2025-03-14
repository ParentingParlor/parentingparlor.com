"use client"

import AuthProfileForm from "@/feature/auth/AuthProfileForm"
import useRequiredAuth from "@/feature/auth/useRequiredAuth"
import Badge from "@/feature/badge/Badge"
import getUserLabel from "@/feature/user/getUserLabel"
import { MapPin, User } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Breadcrumb from "@/components/Breadcrumb"
import CustomAvatar from "@/feature/custom/CustomAvatar"

export default function ProfilePage() {
  const auth = useRequiredAuth()
  const label = getUserLabel({ user: auth.user })

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Profile' }
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-6">
          <CustomAvatar image={auth.user.image} label={label} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{label}</h1>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span>
                {auth.user.city}, {auth.user.state}
              </span>
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

