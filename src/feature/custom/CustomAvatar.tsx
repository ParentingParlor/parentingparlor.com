import { Avatar } from "@/components/ui/avatar"
import CustomAvatarContent from "./CustomAvatarContent"

export default function CustomAvatar(props: {
  image?: string | null
  label: string
}) {
  return (
    <Avatar className="h-20 w-20 border border-gray-700">
      <CustomAvatarContent image={props.image} label={props.label} />
    </Avatar>
  )
}