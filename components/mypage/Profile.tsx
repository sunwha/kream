"use client";
import { Edit02Icon } from "hugeicons-react";

import { UserIcon } from "hugeicons-react";

import { uploadProfile } from "@/api/file";
import { getUserInfo, updateUserInfo } from "@/api/user";
import { useAlertStore } from "@/context/useAlertStore";
import { useUserStore } from "@/context/useUserStore";
import { UserResponse } from "@/types/users.types";
import { useEffect, useRef, useState } from "react";

type Props = {
  userInfo: UserResponse;
  token: string;
};
export default function Profile({ userInfo, token }: Props) {
  const [uploadImage, setUploadImage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { openAlert, closeAlert } = useAlertStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 이미지 업로드
  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files?.[0]; // 첫 번째 파일만 가져오기
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadProfile({
          request: formData,
          token,
        });
        const result = await response.json(); // 오류 메시지 확인
        if (!response.ok) {
          console.log("error", result.message);
          throw new Error(result.message); // 오류 발생 시 예외 처리
        }
        setUploadImage(result.file.id);
        setUploadSuccess(true);
      } catch (error: any) {
        console.error("Error uploading images:", error);
        openAlert({
          title: "이미지 업로드 오류",
          desc: "이미지 업로드 오류입니다. 다시 시도해주세요.",
          isCancel: false,
          isConfirm: true,
          confirmAction: () => {
            setUploadSuccess(false);
            closeAlert();
          },
        });
      }
    } else {
      console.log("no images");
      setUploadSuccess(false);
    }
  };
  // 이미지 업로드 실행 버튼
  const openFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 모든 이미지 업로드 요청, 받은 id 저장 후 post 진행
  useEffect(() => {
    if (uploadSuccess) handleProfile();
  }, [uploadSuccess]);

  const handleProfile = async () => {
    try {
      const response = await updateUserInfo({
        email: userInfo.email,
        request: { username: userInfo.username, profile_image_id: uploadImage },
        token,
      });
      const result = await response.json(); // 오류 메시지 확인
      if (!response.ok) {
        console.log("error", result.message);
        throw new Error(result.message); // 오류 발생 시 예외 처리
      }
      openAlert({
        title: "프로필 업로드 성공",
        desc: result.message,
        isCancel: false,
        isConfirm: true,
        confirmAction: async () => {
          const response = await getUserInfo({
            email: userInfo.email,
            token,
          });
          const result = await response.json();
          if (response.ok) {
            useUserStore.setState(result);
          }
          closeAlert();
        },
      });
    } catch (error: any) {
      console.error("Error uploading images:", error);
      openAlert({
        title: "이미지 업로드 오류",
        desc: "이미지 업로드 오류입니다. 다시 시도해주세요.",
        isCancel: false,
        isConfirm: true,
        confirmAction: () => {
          closeAlert();
        },
      });
    }
  };
  return (
    <div className="relative border border-gray-200 bg-gray-200 rounded-full w-56 h-56 flex items-center justify-center">
      {userInfo.profile_image_url ? (
        <span className="rounded-full w-56 h-56 overflow-hidden">
          <img
            src={userInfo.profile_image_url}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </span>
      ) : (
        <UserIcon className="w-20 h-20" />
      )}
      <button
        type="button"
        onClick={openFileUpload}
        className="absolute bottom-0 right-5 rounded-full w-10 bg-white h-10 flex items-center justify-center"
      >
        <Edit02Icon className="w-5 h-5" />
      </button>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        onChange={handleImage}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}
