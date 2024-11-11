import { cn } from "@/src/utils/tailwind";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isHeader?: boolean;
  isNavi?: boolean;
};
export default function Container({
  children,
  isHeader = true,
  isNavi = false,
}: Props) {
  return (
    <section
      className={cn("relative mb-8", isNavi && "pb-14", isHeader && "pt-14")}
    >
      {children}
    </section>
  );
}
