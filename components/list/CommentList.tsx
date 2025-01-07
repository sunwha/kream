"use client";
import { deleteComments, editComments } from "@/api/post";
import { useAlertStore } from "@/context/useAlertStore";
import { TComment } from "@/types/post.types";
import { daysFromToday } from "@/utils/string";
import {
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Comment02Icon,
  Delete02Icon,
  Edit02Icon,
} from "hugeicons-react";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import FavoritePost from "../common/FavoritePost";
import ReplyList from "./ReplyList";

type Props = {
  userId: string;
  postId: string;
  comment: TComment;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  token: string;
  commentInputRef: RefObject<HTMLInputElement>;
  setReplyInfo: Dispatch<SetStateAction<{ id: string; username: string }>>;
};
export default function CommentList({
  userId,
  postId,
  comment,
  setUpdate,
  token,
  commentInputRef,
  setReplyInfo,
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
    replies,
  } = comment;
  const [showEditInput, setShowEditInput] = useState(false);
  const [editedComment, setEditedComment] = useState(content);
  const { openAlert, closeAlert } = useAlertStore();
  const commentEditInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteComment = (parentId: string, commentId: string) => {
    openAlert({
      title: "댓글 삭제 전 확인",
      desc: "댓글을 삭제할까요?",
      isCancel: true,
      isConfirm: true,
      confirmAction: () => {
        handleDelete(parentId, commentId);
        closeAlert();
      },
      cancelAction: () => {
        closeAlert();
      },
    });
    const handleDelete = async (parentId: string, commentId: string) => {
      try {
        const response = await deleteComments({
          postId: parentId,
          commentId: commentId,
          token,
        });
        const result = await response.json();
        if (response.ok) {
          setUpdate(true);
          return;
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  };
  const handleEditComment = async (
    parentId: string,
    commentId: string,
    editContent: string
  ) => {
    const request = { content: editContent };
    try {
      const response = await editComments({
        postId: parentId,
        commentId: commentId,
        request,
        token,
      });
      const result = await response.json();
      if (response.ok) {
        setShowEditInput(false);
        setEditedComment(request.content);
        setUpdate(true);
        return;
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleAddReply = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    commentInputRef.current?.focus();
    setReplyInfo({ id, username });
  };

  return (
    <li className="relative flex flex-col gap-1 px-5 py-2 border-b">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex break-all gap-2">
            <strong className="shrink-0">{username}</strong>
            <div className="flex-1 gap-1">
              {!showEditInput ? (
                content
              ) : (
                <input
                  type="text"
                  value={editedComment}
                  className="w-full border-b"
                  ref={commentEditInputRef}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEditedComment(e.target.value);
                  }}
                />
              )}
            </div>
            {user_id === userId && (
              <div className="flex gap-2 ml-2">
                {!showEditInput ? (
                  <>
                    <button
                      type="button"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        setShowEditInput(true);
                        setTimeout(() => {
                          commentEditInputRef.current?.focus();
                        }, 0);
                      }}
                    >
                      <Edit02Icon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(postId, id)}
                    >
                      <Delete02Icon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleEditComment(postId, id, editedComment)
                      }
                    >
                      <CheckmarkCircle01Icon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditedComment(content);
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
          <div className="text-xs text-gray-500 flex mt-1">
            <span className="after:content-['·'] after:mx-1">
              {updated_at
                ? daysFromToday(updated_at)
                : daysFromToday(created_at)}
              일 전
            </span>
            <span>
              좋아요 <strong>{like_count}</strong>개
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 items-start">
          <button type="button" onClick={handleAddReply}>
            <Comment02Icon className="w-5 h-5" />
          </button>
          <FavoritePost
            className=""
            id={id}
            postId={postId}
            iconSize="w-5 h-5 text-gray-400"
            setUpdate={setUpdate}
            myfavorite={!!like_users.find((user) => user === userId)}
          />
        </div>
      </div>
      {replies.length > 0 && (
        <ul className="ml-4 mt-1">
          {replies.map((reply) => (
            <ReplyList
              key={reply.id}
              reply={reply}
              userId={userId}
              setUpdate={setUpdate}
              parentId={id}
              handleEditComment={handleEditComment}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
