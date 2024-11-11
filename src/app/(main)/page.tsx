"use client";
import Container from "@/src/components/common/Container";
import Navi from "@/src/components/common/Navi";
import Nodata from "@/src/components/common/Nodata";
import PostList from "@/src/components/list/PostList";
import TagList from "@/src/components/list/TagList";
import type { Post, PostResponse } from "@/src/types/post.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [request, setRequest] = useState({ page: 1, limit: 10 });
  const [postList, setPostList] = useState<Post[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<Post[] | null>(null);

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

  // 게시물 리스트 요청 성공 시 게시물 리스트 상태 업데이트
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setPostList((prev) => [...prev, ...data.posts]);
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
                <PostList key={`taglist-${post.id}-${index}`} post={post} />
              ))}
            </ul>
          ) : (
            <Nodata />
          )
        ) : (
          postList && (
            <ul className="grid grid-cols-2 gap-4">
              {postList.map((post: Post, index) => (
                <PostList key={`postlist-${post.id}-${index}`} post={post} />
              ))}
            </ul>
          )
        )}
      </main>
      <Navi />
    </Container>
  );
}
