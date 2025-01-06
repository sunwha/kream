"use client";
import { getUserInfo } from "@/api/user";
import { useAlertStore } from "@/context/useAlertStore";
import { useUserStore } from "@/context/useUserStore";
import { cn } from "@/utils/tailwind";
import { Camera01Icon, Home03Icon, UserCircle02Icon } from "hugeicons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

export default function Navi() {
  const router = useRouter();
  const pathname = usePathname();
  const cookies = new Cookies();
  const { email } = useUserStore();
  const { openAlert, closeAlert } = useAlertStore();

  const handleCheckUser = async (page: string) => {
    try {
      const response = await getUserInfo({
        email,
        token: cookies.get("userToken"),
      });
      const result = await response.json();
      if (response.ok) {
        useUserStore.setState(result);
        router.push(`/${page}`);
      } else {
        console.log(result.message);
        openAlert({
          title: "로그인 필요한 페이지 진입",
          desc: "로그인을 해주세요.",
          isCancel: false,
          isConfirm: true,
          confirmAction: () => {
            closeAlert();
            router.replace("/login");
          },
        });
      }
    } catch (error) {
      console.log("error", error);
      openAlert({
        title: "시스템 에러",
        desc: "예기치 않은 문제가 발생했습니다. 홈으로 이동합니다.",
        isCancel: false,
        isConfirm: true,
        confirmAction: () => {
          closeAlert();
          router.replace("/");
        },
      });
    }
  };
  return (
    <nav className="fixed bottom-0 w-full">
      <ul className="grid grid-cols-3 justify-between items-center h-14 bg-white shadow-[0_-2px_10px_0_rgba(0,0,0,0.1)]">
        <li className="h-full">
          <Link
            href="/"
            className="h-full flex justify-center items-center"
            aria-label="Home"
          >
            <Home03Icon
              className={cn("text-gray-500", pathname === "/" && "text-black")}
            />
          </Link>
        </li>
        <li className="h-full">
          <button
            type="button"
            className="flex justify-center items-center h-full w-full"
            aria-label="Upload post"
            onClick={() => handleCheckUser("upload")}
          >
            <Camera01Icon
              className={cn(
                "text-gray-500",
                pathname === "/upload" && "text-black"
              )}
            />
          </button>
        </li>
        <li className="h-full">
          <button
            type="button"
            className="flex justify-center items-center h-full w-full"
            aria-label="My page"
            onClick={() => handleCheckUser("mypage")}
          >
            <UserCircle02Icon
              className={cn(
                "text-gray-500",
                pathname === "/mypage" && "text-black"
              )}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
