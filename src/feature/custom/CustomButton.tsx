import { Button } from "@/components/ui/button";
import { CustomButtonProps } from "./customTypes";

export default function CustomButton(props: CustomButtonProps) {
  const { children, loading, ...rest } = props;
  const indicator = loading && <> (loading)</>;
  return (
    <Button disabled={loading} {...rest}>
      {children}
      {indicator}
    </Button>
  );
}