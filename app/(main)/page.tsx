"use client";
import { getPost } from "@/api/post";
import Container from "@/components/common/Container";
import Navi from "@/components/common/Navi";
import Nodata from "@/components/common/Nodata";
import PostList from "@/components/list/PostList";
import TagList from "@/components/list/TagList";
import { useUserStore } from "@/context/useUserStore";
import useScrollPosition from "@/hooks/useScrollPosition";
import type { Post, PostListRequest } from "@/types/post.types";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

export default function Home() {
  const [update, setUpdate] = useState(false);
  const [request, setRequest] = useState<PostListRequest>({
    page: 1,
    limit: 10,
    sortBy: "latest",
  });
  const [postList, setPostList] = useState<Post[]>([]);
  const [nextPage, setNextPage] = useState(0);
  const [selectedTagList, setSelectedTagList] = useState<Post[] | null>(null);
  const { id: userId } = useUserStore();
  const scrollPosition = useScrollPosition();
  const cookies = new Cookies();

  const handleGetList = async () => {
    try {
      const response = await getPost({
        request,
        token: cookies.get("userToken"),
      });
      const result = await response.json();
      setPostList((prev) => {
        const existingIds = new Set(prev.map((post) => post.id)); // 기존 게시물 ID 집합 생성
        const newPosts = result.posts.filter(
          (post: Post) => !existingIds.has(post.id)
        ); // 중복 제거
        return [...prev, ...newPosts]; // 중복이 제거된 새로운 게시물 추가
      });
      setNextPage(result.nextPage);
    } catch (error) {
      console.log("error", error);
    }
  };

  // 게시물 리스트 요청
  useEffect(() => {
    handleGetList();
  }, []);

  useEffect(() => {
    if (scrollPosition >= 100 && nextPage !== null) {
      setRequest((prev) => ({ ...prev, page: nextPage }));
      setUpdate(true);
    }
  }, [scrollPosition]);
  // 게시물 리스트 요청
  useEffect(() => {
    // const fetchPosts = async () => {
    //   if (request.page > 1) {
    //     for (let i = 1; i <= request.page; i++) {
    //       await handleGetList(i); // 각 페이지에 대해 호출
    //     }
    //   } else {
    //     handleGetList(1); // 페이지가 1일 경우
    //   }
    // };
    if (update) {
      // fetchPosts();
      handleGetList();
      setUpdate(false);
    }
  }, [update]);

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
