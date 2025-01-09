import { Post } from "@/types/post.types";
import { daysFromToday } from "@/utils/string";
import { Album01Icon, ImageNotFound02Icon } from "hugeicons-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type Props = {
  userId: string;
  post: Post;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
export default function PostList({ userId, post, setUpdate }: Props) {
  return (
    <li className="relative rounded-xl overflow-hidden shadow-[0_5px_10px_rgba(0,0,0,0.2)] h-[200px]">
      <Link href={`/${post.id}`}>
        {post.files && post.files.length > 0 ? (
          <>
            {post.files.length > 1 && (
              <span className="absolute top-2 right-2">
                <Album01Icon className="w-5 h-5" />
              </span>
            )}
            <img
              src={post.files[0]?.file_path}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            <ImageNotFound02Icon />
          </div>
        )}
        <div className="absolute bottom-1 px-2 text-white w-full truncate">
          <strong className="text-base">{post.username}</strong>
          <p className="text-xs">{daysFromToday(post.created_at)}일 전</p>
          <span className="absolute bottom-4 right-2 text-white text-sm text-center px-2 rounded-full bg-blue-400">
            {post.like_count}
          </span>
        </div>
      </Link>
    </li>
  );
}
