import Container from "@/src/components/common/Container";
import Header from "@/src/components/common/Header";
import { Button } from "@/src/components/ui/Button";
import Link from "next/link";

export default function Page() {
  return (
    <Container>
      <Header title="로그인" isTitle={false} isBack={false} />
      <h2 className="flex flex-col text-center justify-center py-12 gap-1">
        <strong className="font-bold text-3xl tracking-tighter italic">
          KREAM
        </strong>
        <span className="text-xs tracking-tighter">
          KICKS RULE EVERYTHING AROUND ME
        </span>
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
          <Button type="submit" size="full">
            로그인
          </Button>
        </div>
      </form>
      <ul className="grid grid-cols-3 px-5 text-xs py-10">
        <li className="text-center">
          <Link href="/signup">이메일 가입</Link>
        </li>
        <li className="text-center relative before:absolute before:content-[''] before:w-[1px] before:h-[10px] before:bg-gray-200 before:top-1/2 before:-translate-y-1/2 before:left-0">
          <Link href="/find-email">이메일 찾기</Link>
        </li>
        <li className="text-center relative before:absolute before:content-[''] before:w-[1px] before:h-[10px] before:bg-gray-200 before:top-1/2 before:-translate-y-1/2 before:left-0">
          <Link href="/find-pass">비밀번호 찾기</Link>
        </li>
      </ul>
    </Container>
  );
}
