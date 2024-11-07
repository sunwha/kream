"use client";
import type { Post, PostResponse } from "@/src/types/post.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [request, setRequest] = useState({ page: 1, limit: 10 });
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<Post[] | null>(null);
  const tagList = ["ALL", "패션", "스트릿템", "일교차코디"];
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        `/api/posts?page=${request.page}&limit=${request.limit}`
      );
      return res.json() as Promise<PostResponse>;
    },
  });

  const handleTagClick = (tag: string) => {
    if (tag === "ALL") {
      setSelectedTagList(null);
    } else {
      setSelectedTagList(postList.filter((post) => post.tags.includes(tag)));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        data?.nextPage !== null
      ) {
        if (data) setRequest((prev) => ({ ...prev, page: data.nextPage }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setPostList((prev) => [...prev, ...data.posts]);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    async function refetchPosts() {
      const { data } = await refetch();
      if (data) {
        setPostList((prev) => [...prev, ...data.posts]);
      }
    }
    if (request.page > 1) refetchPosts();
  }, [request]);

  return (
    <section>
      <h1>Home</h1>
      <div>
        {tagList && (
          <ul>
            {tagList.map((tag: string, index: number) => (
              <li key={index}>
                <button onClick={() => handleTagClick(tag)}>#{tag}</button>
              </li>
            ))}
          </ul>
        )}
        {selectedTagList ? (
          <ul>
            {selectedTagList.map((post: Post) => (
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
            ))}
          </ul>
        ) : (
          postList && (
            <ul>
              {postList.map((post: Post) => (
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
              ))}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
