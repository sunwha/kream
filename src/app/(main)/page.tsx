"use client";
import PostList from "@/src/components/list/PostList";
import type { Post, PostResponse } from "@/src/types/post.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [request, setRequest] = useState({ page: 1, limit: 10 });
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<Post[] | null>(null);
  const tagList = ["ALL", "패션", "스트릿템", "일교차코디"];

  // 게시물 리스트 요청
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(
        `/api/posts?page=${request.page}&limit=${request.limit}`
      );
      return res.json() as Promise<PostResponse>;
    },
  });

  // 태그 클릭 이벤트
  const handleTagClick = (tag: string) => {
    if (tag === "ALL") {
      setSelectedTagList(null);
    } else {
      setSelectedTagList(postList.filter((post) => post.tags.includes(tag)));
    }
  };

  // 게시물 리스트 요청 성공 시 게시물 리스트 상태 업데이트
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setPostList((prev) => [...prev, ...data.posts]);
      }
    }
  }, [isLoading]);

  // 제일 하단까지 스크롤 시 다음 페이지 있을 경우 request 상태 업데이트
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

  // 제일 하단까지 스크롤 시 다음 페이지 요청
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
              <PostList post={post} />
            ))}
          </ul>
        ) : (
          postList && (
            <ul>
              {postList.map((post: Post) => (
                <PostList post={post} />
              ))}
            </ul>
          )
        )}
      </div>
    </section>
  );
}
