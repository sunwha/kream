"use client";
import Container from "@/src/components/common/Container";
import Header from "@/src/components/common/Header";
import InputBox from "@/src/components/common/InputBox";
import { Input } from "@/src/components/ui";
import { Button } from "@/src/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSignIcon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  size: z.number().optional(),
  requiredTerm: z.boolean(),
  optionalTerm: z.boolean().optional(),
});
export default function Page() {
  const {
    register,
    resetField,
    formState: { dirtyFields, errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      size: undefined,
      requiredTerm: false,
      optionalTerm: false,
    },
  });
  const handleOnSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Container>
      <Header title="회원가입" isTitle={false} isHome={false} />
      <h2 className="px-5 py-12">
        <strong className="font-bold text-3xl">회원가입</strong>
      </h2>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col gap-4 px-5">
          <InputBox
            required
            name="email"
            label="이메일 주소"
            placeholder="이메일 주소"
            input={
              <Input
                {...register("email", { required: "이메일을 입력해주세요" })}
                errors={errors.email}
                resetField={resetField}
                dirtyFields={dirtyFields.email}
                type="email"
                name="email"
                id="email"
                placeholder="이메일 주소"
              />
            }
          />
          <InputBox
            required
            name="password"
            label="비밀번호"
            placeholder=""
            input={
              <Input
                {...register("password")}
                errors={errors.password}
                resetField={resetField}
                dirtyFields={dirtyFields.password}
                type="password"
                name="password"
                id="password"
                placeholder=""
              />
            }
          />
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
