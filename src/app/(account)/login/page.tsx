import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section>
      <h1>
        Kream <span>KICKS RULE EVERYTHING AROUND ME</span>
      </h1>
      <form action="">
        <label htmlFor="email">이메일 주소</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" />
        <Button type="submit" size="full">
          로그인
        </Button>
      </form>
      <ul>
        <li>
          <Link href="/join">이메일 가입</Link>
        </li>
        <li>
          <Link href="/find-email">이메일 찾기</Link>
        </li>
        <li>
          <Link href="/find-pass">비밀번호 찾기</Link>
        </li>
      </ul>
    </section>
  );
}
