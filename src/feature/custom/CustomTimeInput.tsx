"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export function CustomTimeInput(props: {
  value: Date;
  onChange: (props: { value: Date }) => void;
}) {
  const [hours, setHours] = useState(
    (props.value.getHours() % 12 || 12).toString().padStart(2, "0")
  );
  const [minutes, setMinutes] = useState(
    props.value.getMinutes().toString().padStart(2, "0")
  );
  const [period, setPeriod] = useState<"AM" | "PM">(
    props.value.getHours() >= 12 ? "PM" : "AM"
  );

  const updateDate = (
    newHours: string,
    newMinutes: string,
    newPeriod: "AM" | "PM"
  ) => {
    const hour = parseInt(newHours);
    const minute = parseInt(newMinutes);

    if (isNaN(hour) || isNaN(minute)) return;

    let hour24 = hour;
    if (newPeriod === "PM" && hour !== 12) hour24 += 12;
    if (newPeriod === "AM" && hour === 12) hour24 = 0;

    const newDate = new Date(props.value);
    newDate.setHours(hour24);
    newDate.setMinutes(minute);
    props.onChange({ value: newDate });
  };

  const handleInputChange = (
    value: string,
    currentValue: string,
    setValue: (value: string) => void,
    validateFn: (num: number) => boolean,
    updateFn: (value: string) => void
  ) => {
    if (value === "") {
      setValue("");
      return;
    }

    if (value.length < currentValue.length) {
      setValue(value);
      if (value) updateFn(value);
      return;
    }

    const numbers = value.replace(/\D/g, "");
    const num = parseInt(numbers);
    if (!isNaN(num) && validateFn(num)) {
      setValue(numbers);
      updateFn(numbers);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Input
        className="w-[50px]"
        value={hours}
        onChange={(e) =>
          handleInputChange(
            e.target.value,
            hours,
            setHours,
            (num) => num >= 1 && num <= 12,
            (value) => value && updateDate(value, minutes, period)
          )
        }
        onBlur={() => {
          const num = parseInt(hours);
          if (!isNaN(num)) {
            setHours(num.toString().padStart(2, "0"));
          }
        }}
        type="text"
        maxLength={2}
        inputMode="numeric"
      />
      <span className="text-sm font-medium">:</span>
      <Input
        className="w-[50px]"
        value={minutes}
        onChange={(e) =>
          handleInputChange(
            e.target.value,
            minutes,
            setMinutes,
            (num) => num >= 0 && num <= 59,
            (value) => value && updateDate(hours, value, period)
          )
        }
        onBlur={() => {
          const num = parseInt(minutes);
          if (!isNaN(num)) {
            setMinutes(num.toString().padStart(2, "0"));
          }
        }}
        type="text"
        maxLength={2}
        inputMode="numeric"
      />
      <div className="flex gap-1">
        {["AM", "PM"].map((p) => (
          <button
            key={p}
            type="button"
            className={`w-[40px] h-10 rounded-md text-sm ${
              period === p
                ? "bg-primary text-primary-foreground"
                : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => {
              setPeriod(p as "AM" | "PM");
              updateDate(hours, minutes, p as "AM" | "PM");
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
