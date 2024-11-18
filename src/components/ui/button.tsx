import { cn } from "@/src/utils/tailwind";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: React.ReactNode;
  color: "primary";
  size: "full";
  disabled: boolean;
}

const styleStyles: Record<ButtonProps["color"], string> = {
  primary: "bg-black text-white",
};

const sizeStyles: Record<ButtonProps["size"], string> = {
  // small: "text-[12px] p-[5px]",
  // medium: "text-[16px] p-[10px]",
  // large: "text-[20px] p-[15px]",
  full: "h-[48px] text-[16px] w-full",
};

export const Button = ({
  children,
  color,
  size,
  disabled,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "font-bold rounded-xl disabled:bg-gray-300",
        sizeStyles[size],
        styleStyles[color]
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
