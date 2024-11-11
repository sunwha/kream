import { cn } from "@/src/utils/tailwind";

type Props = {
  className?: string;
};
export default function Nodata({ className }: Props) {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-screen flex items-center justify-center z-[-1]",
        className
      )}
    >
      No data
    </div>
  );
}
