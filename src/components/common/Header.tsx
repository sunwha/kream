"use client";
import { cn } from "@/src/utils/tailwind";
import { ArrowLeft01Icon, Home03Icon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  isTitle?: boolean;
  isBack?: boolean;
  isHome?: boolean;
  isFunc?: string;
  onFuncClick?: () => void;
};
export default function Header({
  title,
  isTitle = true,
  isBack = true,
  isHome = true,
  isFunc,
  onFuncClick,
}: Props) {
  const router = useRouter();
  return (
    <header
      className={cn(
        "fixed top-0 w-full h-14 bg-white grid items-center grid-cols-[48px_1fr] justify-between border-b border-gray-100",
        isBack && (isHome || isFunc) && "grid-cols-[48px_1fr_48px]",
        !isBack && (isHome || isFunc) && "grid-cols-[1fr_48px]"
      )}
    >
      {isBack && (
        <button
          type="button"
          className="w-12 h-14 flex justify-center items-center"
          aria-label="Back"
          onClick={() => router.back()}
        >
          <ArrowLeft01Icon />
        </button>
      )}
      <h2 className={cn("text-center font-bold", !isTitle && "invisible")}>
        {title}
      </h2>
      {isHome && (
        <Link href="/" className="w-12 h-14 flex justify-center items-center">
          <Home03Icon />
        </Link>
      )}
      {isFunc && (
        <button
          type="button"
          className="w-12 h-14 flex justify-center items-center"
          onClick={onFuncClick}
        >
          {isFunc}
        </button>
      )}
    </header>
  );
}
