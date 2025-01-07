"use client";
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
  useEffect,
  useRef,
  useState,
} from "react";
import FavoritePost from "../common/FavoritePost";

type Props = {
  reply: TReply;
  userId: string;
  parentId: string;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  handleEditComment: (
    parentId: string,
    commentId: string,
    editContent: string
  ) => void;
  handleDeleteComment: (parentId: string, commentId: string) => void;
};
export default function ReplyList({
  reply,
  userId,
  parentId,
  setUpdate,
  handleEditComment,
  handleDeleteComment,
}: Props) {
  const {
    username,
    content,
    user_id,
    id,
    updated_at,
    created_at,
    like_users,
    like_count,
  } = reply;
  const [showEditInput, setShowEditInput] = useState(false);
  const [editedComment, setEditedComment] = useState(content);
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShowEditInput(false);
  }, [content]);

  return (
    <li className="relative">
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
                  ref={commentInputRef}
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
                        commentInputRef.current?.focus();
                      }}
                    >
                      <Edit02Icon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(parentId, id)}
                    >
                      <Delete02Icon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleEditComment(parentId, id, editedComment)
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
          <div className="text-xs text-gray-500 flex">
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
          <FavoritePost
            className=""
            id={id}
            postId={id}
            iconSize="w-5 h-5 text-gray-400"
            setUpdate={setUpdate}
            myfavorite={!!like_users.find((user) => user === userId)}
          />
        </div>
      </div>
    </li>
  );
}
