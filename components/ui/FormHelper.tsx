import { cn } from "@/lib/class-name";
import clsx from "clsx";
import type { ReactNode } from "react";
import Typography from "./Typography";

export const FieldLabelText = ({
  label,
  required = false,
  view,
  className,
}: {
  label: ReactNode;
  className?: string;
  view?: boolean;
  required?: boolean;
}) => (
  <div className={cn(className)}>
    <Typography
      as={"span"}
      variant={view ? "xSmallText" : "xSmallTextSemibold"}
      className={clsx("", view && "text-charcoal-gray", {
        " after:content-['*'] after:ml-0.5 after:text-danger": required,
      })}
    >
      {label}
    </Typography>
  </div>
);

export const FieldErrorText = ({
  error,
  className,
}: {
  error: string;
  className?: string;
}) => (
  <p className={cn("text-xs font-normal text-danger", className)}>{error}</p>
);

export const FieldHelperText = ({
  hint,
  className,
}: {
  hint: ReactNode;
  className?: string;
}) => (
  <Typography
    variant={"subText"}
    className={cn("text-[#667085] leading-4", className)}
  >
    {hint}
  </Typography>
);
