"use client";
import Container from "@/src/components/common/Container";
import Navi from "@/src/components/common/Navi";
import { useAlertStore } from "@/src/context/useAlertStore";
import { useUserStore } from "@/src/context/useUserStore";
import { UserResponse } from "@/src/types/users.types";
import { UserBlock01Icon } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const router = useRouter();
  const { email, token } = useUserStore();
  const { openAlert, closeAlert } = useAlertStore();

  const handleProfileImg = () => {
    console.log("img");
  };

  const handleLogout = () => {
    console.log("logout");
  };
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`/api/users/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰 추가
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setUserInfo(result);
      } else {
        console.log(result.message);
        openAlert({
          title: "로그인 필요",
          desc: "로그인을 해주세요.",
          isCancel: false,
          isConfirm: true,
          confirmAction: () => {
            closeAlert();
            router.replace("/");
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

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <Container isHeader={false} isNavi={true}>
      <div className="px-5 pt-2 pb-4 border-b-8 border-b-gray-100">
        <h2 className="font-bold text-xl tracking-tighter italic">
          <span className="sr-only">마이페이지</span>
          KREAM
        </h2>
        {userInfo && (
          <div className="grid grid-cols-[96px_1fr] gap-2 mt-4">
            <button
              type="button"
              onClick={handleProfileImg}
              className="border border-gray-200 bg-gray-200 rounded-full w-24 h-24 overflow-hidden flex items-center justify-center"
            >
              {userInfo.profile_image_url ? (
                <img
                  src={userInfo.profile_image_url}
                  alt="프로필 이미지"
                  className="w-full"
                />
              ) : (
                <UserBlock01Icon className="w-10 h-10" />
              )}
            </button>
            <div className="flex flex-col justify-center">
              <strong>{userInfo.username}</strong>
              <span className="text-sm text-gray-400">{userInfo.email}</span>
              <Link href="" className="mt-2">
                프로필 관리
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold">내 계정</h3>
        <ul className="flex flex-col mt-2">
          <li>
            <Link href="" className="text-sm block py-4 tracking-tight">
              로그인 정보
            </Link>
          </li>
          <li className="border-t border-t-gray-200">
            <Link href="" className="text-sm block py-4 tracking-tight">
              프로필 관리
            </Link>
          </li>
          <li className="border-t border-t-gray-200">
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm block py-4 text-red-500 tracking-tight"
            >
              로그아웃
            </button>
          </li>
        </ul>
      </div>
      <Navi />
    </Container>
  );
}
