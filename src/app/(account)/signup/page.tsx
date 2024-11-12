import Container from "@/src/components/common/Container";
import Header from "@/src/components/common/Header";
import { Button } from "@/src/components/ui/button";
import { PlusSignIcon } from "hugeicons-react";

export default function Page() {
  return (
    <Container>
      <Header title="회원가입" isTitle={false} isHome={false} />
      <h2 className="px-5 py-12">
        <strong className="font-bold text-3xl">회원가입</strong>
      </h2>
      <form action="">
        <div className="flex flex-col gap-4 px-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs">
              이메일 주소
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일 주소"
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <label htmlFor="password" className="text-xs">
              비밀번호
            </label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <span>신발사이즈</span>
            <div>선택하세요</div>
          </div>
          <div>
            <ul>
              <li>
                [필수] 만 14세 이상이며 모두 동의합니다.
                <button type="button">
                  <span className="sr-only">펼치기</span>
                  <PlusSignIcon className="w-4 h-4" />
                </button>
                <ul>
                  <li>
                    이용약관 동의 <button type="button">내용 보기</button>
                  </li>
                  <li>
                    개인정보 수집 및 이용 동의{" "}
                    <button type="button">내용 보기</button>
                  </li>
                </ul>
              </li>
              <li>
                [선택] 광고성 정보 수신에 모두 동의합니다.
                <button type="button">
                  <span className="sr-only">펼치기</span>
                  <PlusSignIcon className="w-4 h-4" />
                </button>
                <ul>
                  <li>앱 푸시</li>
                  <li>문자메시지</li>
                  <li>이메일</li>
                </ul>
              </li>
            </ul>
          </div>
          <Button type="submit" size="full">
            가입하기
          </Button>
        </div>
      </form>
    </Container>
  );
}
