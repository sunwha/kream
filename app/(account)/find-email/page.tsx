"use client";

import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <Container>
      <Header
        title="이메일 찾기"
        isTitle={true}
        isBack={false}
        isHome={false}
        isFunc="취소"
        onFuncClick={() => router.back()}
      />
      <div className="px-5">
        <p className="text-sm">
          가입 시 등록한 휴대폰 번호를 입력하면 이메일 주소의 일부를
          알려드립니다.
        </p>
      </div>
    </Container>
  );
}
