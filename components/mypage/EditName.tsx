"use client";
import { getUserInfo, updateUserInfo } from "@/api/user";
import { useAlertStore } from "@/context/useAlertStore";
import { useUserStore } from "@/context/useUserStore";
import { UserResponse } from "@/types/users.types";
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Edit02Icon,
} from "hugeicons-react";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  userInfo: UserResponse;
  token: string;
};
export default function EditName({ userInfo, token }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const [editedName, setEditedName] = useState(userInfo.username);

  const { openAlert, closeAlert } = useAlertStore();
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = async () => {
    try {
      const response = await updateUserInfo({
        email: userInfo.email,
        request: {
          username: editedName,
          profile_image_id: userInfo.profile_image_id,
        },
        token,
      });
      const result = await response.json();
      if (response.ok) {
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
            setShowEdit(false);
            closeAlert();
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center pt-4">
      {!showEdit ? (
        <strong>
          {userInfo.username}
          <button
            className="ml-2"
            type="button"
            onClick={() => setShowEdit(true)}
            aria-label="이름 수정 선택"
          >
            <Edit02Icon className="w-4 h-4" />
          </button>
        </strong>
      ) : (
        <div className="flex gap-1">
          <input
            type="text"
            className="border-b w-[100px]"
            value={editedName}
            ref={nameInputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEditedName(e.target.value);
            }}
          />
          <button onClick={handleEdit}>
            <CheckmarkCircle01Icon className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setEditedName(userInfo.username);
              setShowEdit(false);
            }}
            aria-label="이름 수정 취소"
          >
            <Cancel01Icon className="w-4 h-4" />
          </button>
        </div>
      )}
      <span className="text-sm text-gray-400">{userInfo.email}</span>
    </div>
  );
}
