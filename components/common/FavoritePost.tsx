"use client";
import { commentLike, postLike } from "@/api/post";
import { useAlertStore } from "@/context/useAlertStore";
import { cn } from "@/utils/tailwind";
import { FavouriteIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { Cookies } from "react-cookie";

type Props = {
  className?: string;
  id: string;
  postId?: string;
  iconSize?: string;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  myfavorite: boolean;
};
export default function FavoritePost({
  className,
  id,
  postId,
  iconSize,
  setUpdate,
  myfavorite,
}: Props) {
  const cookies = new Cookies();
  const { openAlert, closeAlert } = useAlertStore();
  const router = useRouter();

  // 게시물 좋아요 추가/삭제 요청
  const handleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let response;
      if (postId) {
        // 댓글 좋아요일 때
        response = await commentLike({
          postId,
          commentId: id,
          token: cookies.get("userToken"),
        });
      } else {
        // 글 좋아요일 때
        response = await postLike({
          id,
          token: cookies.get("userToken"),
        });
      }
      if (response) {
        const result = await response.json();
        if (response.ok) {
          setUpdate(true);
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
      }
    } catch (error) {
      console.error("Error posting:", error);
      openAlert({
        title: "시스템 에러",
        desc: (
          <>
            예기치 않은 문제가 발생했습니다. <br />
            홈으로 이동합니다.
          </>
        ),
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
      className={cn("cursor-pointer", className)}
    >
      <FavouriteIcon className={cn(iconSize, myfavorite && "text-red-500")} />
    </button>
  );
}
