import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomButton from "../custom/CustomButton";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CustomTimeInput } from "../custom/CustomTimeInput";

export default function DateInput(props: {
  value: Date;
  onChange: (props: { value: Date }) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <CustomButton variant="outline" size="icon">
            <CalendarIcon className="h-4 w-4" />
          </CustomButton>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-4 space-y-4">
            <Calendar
              mode="single"
              selected={props.value}
              onSelect={(newDate) => {
                if (newDate) {
                  const updatedDate = new Date(newDate);
                  updatedDate.setHours(props.value.getHours());
                  updatedDate.setMinutes(props.value.getMinutes());
                  props.onChange({ value: updatedDate });
                }
              }}
            />
            <div className="border-t pt-4">
              <Label className="text-xs mb-2 block">Time</Label>
              <CustomTimeInput value={props.value} onChange={props.onChange} />
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {format(props.value, "PPP 'at' HH:mm")}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
