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
import { useState } from "react";
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
  return (
    data && (
      <Container>
        <Header title="게시물" />
        <section>
          <header>
            <div>
              {data.username}
              <span>{daysFromToday(data.created_at)}일 전</span>
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
            <FavouriteIcon />
            <Comment02Icon />
            <div>
              <span>좋아요 {data.like_count}개</span>
              <span>댓글 {data.comments.length}개</span>
            </div>
            {data.comments.length > 0 ? (
              <>
                <ul>
                  {data.comments.map((comment) => (
                    <li key={comment.id}>
                      <strong>{comment.username}</strong>
                      <span>{comment.content}</span>
                      <span>좋아요 {comment.like_count}개</span>
                      <button>
                        <FavouriteIcon />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              !showCommentInput && (
                <>
                  <div>첫번째 댓글을 남겨보세요.</div>
                  <button
                    type="button"
                    onClick={() => setShowCommentInput(true)}
                  >
                    댓글 달기
                  </button>
                </>
              )
            )}
            {showCommentInput && (
              <div>
                <input type="text" placeholder="댓글 달기..." />
                <button type="button">등록</button>
              </div>
            )}
          </div>
        </section>
      </Container>
    )
  );
}
