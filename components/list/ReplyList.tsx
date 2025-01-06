"use client";
import { deleteComments } from "@/api/post";
import { useAlertStore } from "@/context/useAlertStore";
import { TReply } from "@/types/post.types";
import { daysFromToday } from "@/utils/string";
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Delete02Icon,
  Edit02Icon,
} from "hugeicons-react";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import FavoritePost from "../common/FavoritePost";

type Props = {
  reply: TReply;
  token: string;
  userId: string;
  postId: string;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
export default function ReplyList({
  reply,
  userId,
  postId,
  setUpdate,
  token,
}: Props) {
  const [showEditInput, setShowEditInput] = useState(false);
  const [editedComment, setEditedComment] = useState(reply.content);
  const commentInputRef = useRef<HTMLInputElement>(null);
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
          commentId: reply.id,
          token,
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
    <li key={reply.id} className="relative">
      <div className="flex break-all gap-2">
        <strong className="shrink-0">{reply.username}</strong>
        <div className="flex-1 gap-1">
          {!showEditInput ? (
            reply.content
          ) : (
            <input
              type="text"
              value={editedComment}
              className="w-full border-b"
              ref={commentInputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEditedComment(e.target.value);
              }}
            />
          )}
        </div>
        {reply.user_id === userId && (
          <div className="flex gap-2 ml-2">
            {!showEditInput ? (
              <>
                <button
                  type="button"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    setShowEditInput(true);
                    commentInputRef.current?.focus();
                  }}
                >
                  <Edit02Icon className="w-4 h-4" />
                </button>
                <button type="button" onClick={handleDeleteComment}>
                  <Delete02Icon className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={handleEditComment}>
                  <CheckmarkCircle01Icon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedComment(reply.content);
                    setShowEditInput(false);
                  }}
                >
                  <Cancel01Icon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 flex">
        <span className="after:content-['·'] after:mx-1">
          {reply.updated_at
            ? daysFromToday(reply.updated_at)
            : daysFromToday(reply.created_at)}
          일 전
        </span>
        <span>
          좋아요 <strong>{reply.like_count}</strong>개
        </span>
      </div>
      <FavoritePost
        className="absolute top-2 right-3 -translate-y-1/2"
        id={reply.id}
        postId={reply.id}
        iconSize="w-5 h-5 text-gray-400"
        setUpdate={setUpdate}
        myfavorite={!!reply.like_users.find((user) => user === userId)}
      />
    </li>
  );
}
