import { LikeResponse } from "@/src/types/post.types";
import { useMutation } from "@tanstack/react-query";
import { FavouriteIcon } from "hugeicons-react";
import { MouseEvent } from "react";

type Props = {
  id: string;
  iconSize?: string;
};
export default function FavoritePost({ id, iconSize }: Props) {
  // 게시물 좋아요 추가/삭제 요청
  // TODO: 로그인 상태일 때만 가능
  // TODO: 좋아요 상태 업데이트 필요
  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${id}/like`, {
          method: "POST",
        });
        return res.json() as Promise<LikeResponse>;
      } catch (error) {
        console.error(error);
      }
    },
  });
  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
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
