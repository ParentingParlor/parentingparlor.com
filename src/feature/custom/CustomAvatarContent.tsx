import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function CustomAvatarContent(props: {
  label: string;
  image?: string | null
}) {
  if (props.image) {
    return <AvatarImage src={props.image} alt="Avatar" referrerPolicy="no-referrer" />
  }
  return (
    <AvatarFallback className="bg-gray-100">
      <span className="text-3xl font-semibold text-purple-700">{props.label[0]}</span>
    </AvatarFallback>
  )
}