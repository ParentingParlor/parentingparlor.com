import { badge } from "@/db/schema";
import { BadgeColor, BadgeSize } from "./badgeTypes";
import { BADGE_COLORS, BADGE_SIZES } from "./badgeConstants";
import { cn } from "@/lib/utils";

export default function Badge(props: {
  color: BadgeColor;
  icon: string
  name: string
  size: BadgeSize
}) {
  const color = BADGE_COLORS[props.color];
  const size = BADGE_SIZES[props.size];

  const baseClass = "inline-flex items-center rounded-full font-medium";
  const className = cn(baseClass, color, size);

  return (
    <span
      className={baseClass}
    >
      <span className="mr-1">{props.icon}</span>
      {props.name}
    </span>
  );
}