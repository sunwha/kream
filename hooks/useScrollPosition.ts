import { useEffect, useState } from "react";

// 스크롤 위치 퍼센트로 리턴
export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScroll() {
    // 전체 문서 높이와 뷰포트 높이
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // 현재 스크롤 위치
    const windowScroll = document.documentElement.scrollTop;

    // 스크롤된 비율 계산
    const scrolled = (windowScroll / height) * 100;

    setScrollPosition(scrolled);
  }

  // 스크롤 이벤트 리스너
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return scrollPosition;
}
