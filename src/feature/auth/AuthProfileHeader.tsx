'use client'

import { Button } from "@/components/ui/button";
import { Award, Bell, List, Settings, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useRequiredAuth from "./useRequiredAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthAdminItems from "./AuthAdminItems";
import AuthImpersonateItems from "./AuthImpersonationItems";

const notifications = [
  {
    id: 1,
    title: "New comment on your post",
    description: "Sarah commented on your sleep training topic",
    time: "5m ago"
  },
  {
    id: 2,
    title: "Your post was featured",
    description: "Your topic about baby food was featured",
    time: "1h ago"
  },
  {
    id: 3,
    title: "New milestone reached",
    description: "You've helped 100 parents with your advice!",
    time: "2h ago"
  }
];

export default function AuthProfileHeader() {
  const auth = useRequiredAuth()
  const router = useRouter();
  function handleProfileSelect() {
    router.push('/profile')
  }
  function handleMyListsSelect() {
    router.push('/profile/my-lists')
  }
  function handleMyPointsSelect() {
    router.push('/profile/points')
  }
  function handleSettingsSelect() {
    router.push('/profile/settings')
  }
  async function handleLogoutSelect() {
    await auth.logout()
  }
  return (
    <>
      <Link href="/profile/points">
        <Button variant="ghost" className="text-sm font-medium hidden sm:flex items-center gap-1">
          <Award className="h-4 w-4 text-purple-600 mr-1" />
          <span>??? Points</span>
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-2">
            <h3 className="font-semibold text-gray-900 px-2 py-1">Notifications</h3>
          </div>
          <DropdownMenuSeparator />
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
              <div>
                <div className="font-medium text-gray-900">{notification.title}</div>
                <div className="text-sm text-gray-500">{notification.description}</div>
                <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-2 text-center text-purple-600 cursor-pointer">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={auth.user.image ?? undefined} />
            <AvatarFallback>{auth.user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleProfileSelect}>
            <UserCircle className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleMyListsSelect}>
            <List className="h-4 w-4 mr-2" />
            My Lists
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleMyPointsSelect}>
            <Award className="h-4 w-4 mr-2" />
            My Points
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleSettingsSelect}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogoutSelect}>Logout</DropdownMenuItem>
          <AuthAdminItems />
          <AuthImpersonateItems />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}