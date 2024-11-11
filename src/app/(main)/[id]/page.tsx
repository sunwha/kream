"use client";
import "swiper/css";
import "swiper/css/pagination";

import Container from "@/src/components/common/Container";
import Header from "@/src/components/common/Header";
import { PostDetailResponse } from "@/src/types/post.types";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import {
  Comment02Icon,
  FavouriteIcon,
  MoreHorizontalCircle01Icon,
} from "hugeicons-react";
import { MouseEvent, useEffect, useState } from "react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [showCommentInput, setShowCommentInput] = useState(false);

  // 게시물 상세 요청
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts-detail", id],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${id}`);
      return res.json() as Promise<PostDetailResponse>;
    },
  });

  function daysFromToday(dateString: string): number {
    const inputDate = new Date(dateString);
    const today = new Date();
    return differenceInDays(today, inputDate);
  }

  const handleComment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleComment");
  };

  const handleDirectText = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.textContent);
  };

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
              <button aria-label="좋아요 클릭" type="button">
                <FavouriteIcon className="w-8 h-8" />
              </button>
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
                    <li
                      key={comment.id}
                      className="relative flex flex-col gap-1 pl-5 pr-11 py-2"
                    >
                      <div className="break-all">
                        <strong className="mr-2">{comment.username}</strong>
                        {comment.content}
                      </div>
                      <div className="text-xs text-gray-500 flex">
                        <span className="after:content-['·'] after:mx-1">
                          {comment.updated_at
                            ? daysFromToday(comment.updated_at)
                            : daysFromToday(comment.created_at)}
                          일 전
                        </span>
                        <span>
                          좋아요 <strong>{comment.like_count}</strong>개
                        </span>
                      </div>
                      {/* <button>삭제</button> */}
                      <button
                        className="absolute top-[calc(50%-8px)] right-3 -translate-y-1/2"
                        aria-lable="댓글 좋아요 클릭"
                      >
                        <FavouriteIcon className="text-gray-400" />
                      </button>
                    </li>
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
                    <li className="px-3">
                      <button
                        type="button"
                        aria-lable="텍스트 바로 넣기"
                        onClick={(e) => handleDirectText(e)}
                      >
                        좋아요❤️
                      </button>
                    </li>
                    <li className="px-3">
                      <button
                        type="button"
                        aria-lable="텍스트 바로 넣기"
                        onClick={(e) => handleDirectText(e)}
                      >
                        맞팔해요😊
                      </button>
                    </li>
                    <li className="px-3">
                      <button
                        type="button"
                        aria-lable="텍스트 바로 넣기"
                        onClick={(e) => handleDirectText(e)}
                      >
                        정보 부탁해요🙏
                      </button>
                    </li>
                    <li className="px-3">
                      <button
                        type="button"
                        aria-lable="텍스트 바로 넣기"
                        onClick={(e) => handleDirectText(e)}
                      >
                        평소 사이즈가 얼마예요?👀
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="px-5 pb-4 border-b border-gray-200">
                  <div className="grid grid-cols-[1fr_auto] bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <input
                      type="text"
                      placeholder="댓글 달기..."
                      className="bg-transparent h-12 px-4 text-sm"
                    />
                    <button type="button" className="px-5 font-bold">
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
