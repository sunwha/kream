"use client";
import "swiper/css";
import "swiper/css/pagination";

import { postComments } from "@/api/post";
import Container from "@/components/common/Container";
import FavoritePost from "@/components/common/FavoritePost";
import Header from "@/components/common/Header";
import { PostDetailResponse } from "@/types/post.types";
import { QueryClient, useQuery } from "@tanstack/react-query";

import CommentList from "@/components/list/CommentList";
import { useUserStore } from "@/context/useUserStore";
import { daysFromToday } from "@/utils/string";
import { Comment02Icon, MoreHorizontalCircle01Icon } from "hugeicons-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [update, setUpdate] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  const queryClient = new QueryClient();
  const cookies = new Cookies();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { id: userId } = useUserStore();

  const directText = [
    "좋아요❤️",
    "맞팔해요",
    "정보 부탁해요",
    "평소 사이즈 어떻게 돼요?",
  ];

  // 게시물 상세 요청
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts-detail", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      return res.json() as Promise<PostDetailResponse>;
    },
  });

  const handleComment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    commentInputRef.current?.focus();
  };

  const handleDirectText = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const text = e.currentTarget.textContent;
    setCommentText((prev) => prev + text);
  };

  const handleAddComment = async () => {
    const response = await postComments({
      id,
      request: { content: commentText },
      token: cookies.get("userToken"),
    });
    const result = await response.json();
    if (response.ok) {
      setUpdate(true);
      setCommentText("");
    } else {
      console.log("error", result);
    }
  };

  useEffect(() => {
    const handleUpdate = async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts-detail", id],
      });
      await refetch();
    };
    if (update) {
      handleUpdate();
      setUpdate(false);
    }
  }, [update]);

  useEffect(() => {
    if (!isLoading && data) {
      data.comments.length > 0 && setShowCommentInput(true);
    }
  }, [isLoading]);

  return (
    data && (
      <Container>
        <Header title="게시물" />
        <section>
          <header className="flex justify-between items-center px-5 h-12">
            <div className="flex flex-col text-xs gap-[2px]">
              <strong>{data.username}</strong>
              <span className="text-gray-400">
                {daysFromToday(data.created_at)}일 전
              </span>
            </div>
            <button type="button" aria-label="메뉴보기">
              <MoreHorizontalCircle01Icon />
            </button>
          </header>
          <div>
            {data.files.length > 0 &&
              (data.files.length == 1 ? (
                <img src={data.files[0].file_path} />
              ) : (
                <Swiper
                  modules={[Pagination, A11y]}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {data.files.map((file) => (
                    <SwiperSlide key={file.id}>
                      <img src={file.file_path} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ))}
          </div>
          <div>
            <div className="flex gap-4 px-5 h-12 items-center">
              <FavoritePost
                id={data.id}
                iconSize="w-8 h-8"
                setUpdate={setUpdate}
                myfavorite={!!data.like_users.find((user) => user === userId)}
              />
              <button
                aria-label="댓글 클릭"
                type="button"
                onClick={(e: MouseEvent<HTMLButtonElement>) => handleComment(e)}
              >
                <Comment02Icon className="w-8 h-8" />
              </button>
            </div>
            <div className="flex px-5 text-sm justify-between tracking-tighter">
              <span>
                좋아요 <strong>{data.like_count}</strong>개
              </span>
              <span>
                댓글 <strong>{data.comments.length}</strong>개
              </span>
            </div>
            <div className="px-5 py-4 border-b border-gray-200 text-sm flex gap-1">
              {data.tags.length > 0 &&
                data.tags.map((tag) => (
                  <span key={tag} className="text-sky-600">
                    #{tag}
                  </span>
                ))}
              {data.content}
            </div>
            {data.comments.length > 0 ? (
              <>
                <ul className="py-4 border-b border-gray-200 text-sm">
                  {data.comments.map((comment) => (
                    <CommentList
                      userId={userId}
                      postId={data.id}
                      comment={comment}
                      setUpdate={setUpdate}
                    />
                  ))}
                </ul>
              </>
            ) : (
              !showCommentInput && (
                <div className="flex flex-col gap-2 items-center justify-center h-32">
                  <div className="text-xs text-gray-500">
                    첫번째로 댓글을 남겨보세요.
                  </div>
                  <button
                    type="button"
                    className="text-[10px] border border-black rounded-lg px-2 py-1"
                    onClick={() => setShowCommentInput(true)}
                  >
                    댓글쓰기
                  </button>
                </div>
              )
            )}
            {showCommentInput && (
              <div>
                <div className="flex justify-between items-center truncate">
                  <ul className="flex whitespace-nowrap overflow-x-auto text-sm text-gray-700 py-4 px-2">
                    {directText.map((text) => (
                      <li className="px-3" key={text}>
                        <button
                          type="button"
                          aria-label="텍스트 바로 넣기"
                          onClick={(e) => handleDirectText(e)}
                        >
                          {text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5 pb-4 border-b border-gray-200">
                  <div className="grid grid-cols-[1fr_auto] bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <input
                      type="text"
                      value={commentText}
                      ref={commentInputRef}
                      placeholder="댓글 달기..."
                      className="bg-transparent h-12 px-4 text-sm"
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-5 font-bold"
                      onClick={handleAddComment}
                    >
                      등록
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </Container>
    )
  );
}
