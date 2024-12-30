import { deleteComments } from "@/api/post";
import { useAlertStore } from "@/context/useAlertStore";
import { TComment } from "@/types/post.types";
import { daysFromToday } from "@/utils/string";
import { Dispatch, SetStateAction } from "react";
import { Cookies } from "react-cookie";
import FavoritePost from "../common/FavoritePost";

type Props = {
  userId: string;
  postId: string;
  comment: TComment;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
export default function CommentList({
  userId,
  postId,
  comment,
  setUpdate,
}: Props) {
  const {
    id,
    username,
    content,
    updated_at,
    created_at,
    like_count,
    user_id,
    like_users,
  } = comment;
  const cookies = new Cookies();
  const { openAlert, closeAlert } = useAlertStore();

  const handleDeleteComment = () => {
    openAlert({
      title: "댓글 삭제 전 확인",
      desc: "댓글을 삭제할까요?",
      isCancel: true,
      isConfirm: true,
      confirmAction: () => {
        handleDelete();
        closeAlert();
      },
      cancelAction: () => {
        closeAlert();
      },
    });
    const handleDelete = async () => {
      try {
        const response = await deleteComments({
          postId,
          commentId: id,
          token: cookies.get("userToken"),
        });
        const result = await response.json();
        if (response.ok) {
          openAlert({
            title: "댓글 삭제 처리 완료",
            desc: result.message,
            isCancel: false,
            isConfirm: true,
            confirmAction: () => {
              setUpdate(true);
              closeAlert();
            },
          });
          return;
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  };
  const handleEditComment = () => {};
  return (
    <li key={id} className="relative flex flex-col gap-1 pl-5 pr-11 py-2">
      <div className="break-all">
        <strong className="mr-2">{username}</strong>
        {content}
      </div>
      <div className="text-xs text-gray-500 flex">
        <span className="after:content-['·'] after:mx-1">
          {updated_at ? daysFromToday(updated_at) : daysFromToday(created_at)}일
          전
        </span>
        <span>
          좋아요 <strong>{like_count}</strong>개
        </span>
        {user_id === userId && (
          <>
            <button className="ml-2" type="button" onClick={handleEditComment}>
              수정
            </button>
            <button
              className="ml-2"
              type="button"
              onClick={handleDeleteComment}
            >
              삭제
            </button>
          </>
        )}
      </div>
      <FavoritePost
        className="absolute top-[calc(50%-8px)] right-3 -translate-y-1/2"
        id={id}
        postId={postId}
        iconSize="w-5 h-5 text-gray-400"
        setUpdate={setUpdate}
        myfavorite={!!like_users.find((user) => user === user_id)}
      />
    </li>
  );
}
