import { Post } from "@/src/types/post.types";

type Props = {
  post: Post;
};
export default function PostList({ post }: Props) {
  return (
    <li key={post.id}>
      {post.files.length > 0 ? (
        <div>
          {post.files.length > 1 && <span>more</span>}
          <img
            src={post.files[0]?.file_path}
            alt={post.title}
            width={100}
            height={300}
          />
        </div>
      ) : (
        <div>No Image</div>
      )}
      <div>
        {post.username} {post.like_count}
      </div>
      {post.tags.length > 0 && (
        <ul>
          {post.tags.map((tag: string, index: number) => (
            <li key={index}>#{tag}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
