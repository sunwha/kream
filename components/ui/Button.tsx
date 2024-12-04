import { cn } from "@/utils/tailwind";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: React.ReactNode;
  color: "primary" | "secondary";
  size: "full" | "medium";
  disabled?: boolean;
  onClick?: () => void;
}

const styleStyles: Record<ButtonProps["color"], string> = {
  primary: "bg-black text-white",
  secondary: "bg-white border-black border",
};

const sizeStyles: Record<ButtonProps["size"], string> = {
  // small: "text-[12px] px-2 h-[20px]",
  medium: "h-[32px] text-[14px] px-2",
  // large: "text-[20px] p-[15px]",
  full: "h-[48px] text-[16px] w-full",
};

export const Button = ({
  children,
  color,
  size,
  disabled,
  onClick,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "font-bold rounded-xl disabled:bg-gray-300",
        sizeStyles[size],
        styleStyles[color]
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
