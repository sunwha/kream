"use client";
import Container from "@/components/common/Container";
import Navi from "@/components/common/Navi";
import Nodata from "@/components/common/Nodata";
import PostList from "@/components/list/PostList";
import TagList from "@/components/list/TagList";
import { useUserStore } from "@/context/useUserStore";
import type { Post, PostResponse } from "@/types/post.types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [update, setUpdate] = useState(false);
  const [request, setRequest] = useState({ page: 1, limit: 10 });
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<Post[] | null>(null);
  const queryClient = new QueryClient();
  const { id: userId } = useUserStore();

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

  useEffect(() => {
    const handleUpdate = async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      const { data } = await refetch();
      if (data) setPostList(data.posts);
    };
    if (update) {
      handleUpdate();
      setUpdate(false);
    }
  }, [update]);

  // 게시물 리스트 요청 성공 시 게시물 리스트 상태 업데이트
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setPostList((prev) => {
          const existingIds = new Set(prev.map((post) => post.id)); // 기존 게시물 ID 집합 생성
          const newPosts = data.posts.filter(
            (post) => !existingIds.has(post.id)
          ); // 중복되지 않은 게시물 필터링
          return [...prev, ...newPosts]; // 기존 게시물과 새로운 게시물 합치기
        });
      }
    }
  }, [isLoading]);

  return (
    <Container isHeader={false} isNavi>
      <h1 className="sr-only">Home</h1>
      <main className="px-5">
        <TagList postList={postList} setSelectedTagList={setSelectedTagList} />
        {selectedTagList !== null ? (
          selectedTagList.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2">
              {selectedTagList.map((post: Post, index) => (
                <PostList
                  key={`taglist-${post.id}-${index}`}
                  post={post}
                  setUpdate={setUpdate}
                  userId={userId}
                />
              ))}
            </ul>
          ) : (
            <Nodata />
          )
        ) : (
          postList && (
            <ul className="grid grid-cols-2 gap-4">
              {postList.map((post: Post, index) => (
                <PostList
                  key={`postlist-${post.id}-${index}`}
                  post={post}
                  setUpdate={setUpdate}
                  userId={userId}
                />
              ))}
            </ul>
          )
        )}
      </main>
      <Navi />
    </Container>
  );
}
