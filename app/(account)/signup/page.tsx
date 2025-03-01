"use client";
import { signUp } from "@/api/user";
import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import InputBox from "@/components/common/InputBox";
import { Input, SquareCheckbox } from "@/components/ui";
import { BottomBox } from "@/components/ui/BottomBox";
import { Button } from "@/components/ui/Button";
import { useAlertStore } from "@/context/useAlertStore";
import useAllCheck from "@/hooks/useAllCheck";
import { cn } from "@/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusSignIcon, PlusSignIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  requiredTerms: z.boolean(),
});
export default function Page() {
  const [termsCheck, setTermsCheck] = useAllCheck({
    allTerms: false,
    terms01: false,
    terms02: false,
  });
  const [openList, setOpenList] = useState(false);
  const { openAlert, closeAlert } = useAlertStore();
  const router = useRouter();
  const {
    reset,
    register,
    resetField,
    formState: { dirtyFields, errors, isValid, isDirty },
    handleSubmit,
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      requiredTerms: termsCheck.allTerms,
    },
  });

  // 사용자 계정 생성
  const handleOnSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await signUp({
        username: "",
        password: data.password,
        email: data.email,
        profile_image_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      });
      if (response.ok) {
        router.replace("/");
      } else {
        const result = await response.json();
        openAlert({
          title: result.message,
          desc: result.message,
          isCancel: false,
          confirmAction: () => {
            closeAlert();
            reset();
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      openAlert({
        title: "시스템 에러",
        desc: "예기치 않은 문제가 발생했습니다. 다시 시도해주세요.",
        isCancel: false,
        confirmAction: () => {
          closeAlert();
          reset();
        },
      });
    }
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
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
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
          {/* <div>
            <span>신발사이즈</span>
            <div>선택하세요</div>
          </div> */}
          <div>
            <ul>
              <li>
                <div className="relative">
                  <SquareCheckbox
                    id="allTerms"
                    {...register("requiredTerms", { required: true })}
                    name="requiredTerms"
                    label="[필수] 만 14세 이상이며 모두 동의합니다."
                    checkValue={termsCheck}
                    setCheckValue={setTermsCheck}
                    allCheck
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    aria-label="약관 목록 펼치기"
                    onClick={() => setOpenList(!openList)}
                  >
                    {!openList ? (
                      <PlusSignIcon className="w-4 h-4" />
                    ) : (
                      <MinusSignIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <ul
                  className={cn(
                    "ml-8 mt-4 h-0 overflow-hidden transition-all opacity-0",
                    openList && "h-auto opacity-100"
                  )}
                >
                  <li className="flex justify-between items-center">
                    <SquareCheckbox
                      id="terms01"
                      label="이용약관 동의"
                      checkValue={termsCheck}
                      setCheckValue={setTermsCheck}
                    />
                    <button type="button" className="underline text-xs">
                      내용 보기
                    </button>
                  </li>
                  <li className="flex justify-between items-center mt-2">
                    <SquareCheckbox
                      id="terms02"
                      label="개인정보 수집 및 이용 동의"
                      checkValue={termsCheck}
                      setCheckValue={setTermsCheck}
                    />
                    <button type="button" className="underline text-xs">
                      내용 보기
                    </button>
                  </li>
                </ul>
              </li>
              {/* <li>
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
              </li> */}
            </ul>
          </div>
          <BottomBox>
            <Button
              type="submit"
              color="primary"
              size="full"
              disabled={!isDirty || !isValid || !termsCheck.allTerms}
            >
              가입하기
            </Button>
          </BottomBox>
        </div>
      </form>
    </Container>
  );
}
