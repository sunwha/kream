"use client";
import { clearUserStore, useUserStore } from "@/context/useUserStore";

import { logout } from "@/api/auth";
import { deleteUser } from "@/api/user";
import { useAlertStore } from "@/context/useAlertStore";
import { UserResponse } from "@/types/users.types";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

type Props = {
  userInfo: UserResponse;
  token: string;
};
export default function UserOpt({ userInfo, token }: Props) {
  const cookies = new Cookies();
  const { openAlert, closeAlert } = useAlertStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        useUserStore.setState({
          id: "",
          username: "",
          email: "",
          roles: [],
          profile_image_id: "",
          profile_image_url: "",
        });
        clearUserStore();
        cookies.remove("userToken");
        router.replace("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkDropout = async () => {
    openAlert({
      title: "탈퇴 전 확인",
      desc: "탈퇴 하시겠습니까?",
      isCancel: true,
      isConfirm: true,
      cancelAction: () => {
        closeAlert();
      },
      confirmAction: () => {
        handleDropout();
        closeAlert();
      },
    });
  };

  const handleDropout = async () => {
    try {
      const response = await deleteUser({
        email: userInfo.email,
        token,
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        useUserStore.setState({
          id: "",
          username: "",
          email: "",
          roles: [],
          profile_image_id: "",
          profile_image_url: "",
        });
        clearUserStore();
        cookies.remove("userToken");
        router.replace("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={checkDropout}
        className="text-sm block py-4 tracking-tight text-gray-400"
      >
        탈퇴하기
      </button>
      <button
        type="button"
        onClick={handleLogout}
        className="text-sm block py-4 tracking-tight text-gray-500"
      >
        로그아웃
      </button>
    </div>
  );
}
