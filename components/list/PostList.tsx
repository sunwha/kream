import { Post } from "@/types/post.types";
import { Album01Icon, ImageNotFound02Icon } from "hugeicons-react";
import Link from "next/link";
import FavoritePost from "../common/FavoritePost";

type Props = {
  post: Post;
};
export default function PostList({ post }: Props) {
  return (
    <li className="relative">
      <Link href={`/${post.id}`}>
        {post.files.length > 0 ? (
          <div className="min-h-[200px] rounded-lg overflow-hidden">
            {post.files.length > 1 && (
              <span className="absolute top-2 right-2">
                <Album01Icon className="w-5 h-5" />
              </span>
            )}
            <img
              src={post.files[0]?.file_path}
              alt={post.title}
              className="w-full"
            />
          </div>
        ) : (
          <div className="min-h-[200px] flex justify-center items-center border border-gray-200 rounded-lg">
            <ImageNotFound02Icon />
          </div>
        )}
        <div className="flex justify-between items-center pt-2">
          <strong className="text-sm">{post.username}</strong>
          <div className="flex items-center gap-1">
            <FavoritePost
              target_type="post"
              target_id={post.id}
              iconSize="w-4"
            />
            <span className="text-sm">{post.like_count}</span>
          </div>
        </div>
        {post.tags.length > 0 && (
          <ul className="flex gap-1 pt-1 text-xs">
            {post.tags.map((tag: string, index: number) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>
        )}
      </Link>
    </li>
  );
}
