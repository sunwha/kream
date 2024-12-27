"use client";
import { getLikeInfo } from "@/api/post";
import { useAlertStore } from "@/context/useAlertStore";
import { FavouriteIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { Cookies } from "react-cookie";

type Props = {
  target_type: "post" | "comment";
  target_id: string;
  iconSize?: string;
};
export default function FavoritePost({
  target_type,
  target_id,
  iconSize,
}: Props) {
  const cookies = new Cookies();
  const { openAlert, closeAlert } = useAlertStore();
  const router = useRouter();

  // 게시물 좋아요 추가/삭제 요청
  const handleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await getLikeInfo({
        request: { target_type, target_id },
        token: cookies.get("userToken"),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("좋아요");
        return;
      } else {
        console.log(result.message);
        openAlert({
          title: "좋아요 오류",
          desc: result.message,
          isCancel: false,
          isConfirm: true,
          confirmAction: () => {
            closeAlert();
          },
        });
        return;
      }
    } catch (error) {
      console.error("Error posting:", error);
      openAlert({
        title: "시스템 에러",
        desc: "예기치 않은 문제가 발생했습니다. 홈으로 이동합니다.",
        isCancel: false,
        isConfirm: true,
        confirmAction: () => {
          closeAlert();
          router.push("/");
        },
      });
    }
  };
  return (
    <button
      type="button"
      aria-label="좋아요"
      onClick={(e: MouseEvent<HTMLButtonElement>) => handleLike(e)}
      className="cursor-pointer"
    >
      <FavouriteIcon className={iconSize} />
    </button>
  );
}
