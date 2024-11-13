import { ButtonHTMLAttributes, CSSProperties } from "react";

interface ButtonProps {
  children: React.ReactNode;
  size: "small" | "medium" | "large" | "full";
}

const sizeStyles: Record<ButtonProps["size"], CSSProperties> = {
  small: { fontSize: "12px", padding: "5px" },
  medium: { fontSize: "16px", padding: "10px" },
  large: { fontSize: "20px", padding: "15px" },
  full: { fontSize: "24px", padding: "20px", width: "100%" },
};

export const Button = ({
  children,
  size,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button style={sizeStyles[size]}>{children}</button>;
};
