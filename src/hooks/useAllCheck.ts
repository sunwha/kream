"use client";
import { useEffect, useState } from "react";

// 모두 체크하기 훅
// 오브젝트의 첫번째 key를 all Check로 설정한다.
export default function useAllCheck(initialState: Record<string, boolean>) {
  const [termsCheck, setTermsCheck] =
    useState<Record<string, boolean>>(initialState);

  useEffect(() => {
    const values = Object.values(termsCheck).slice(1); // all 체크 제외
    const allTrue = values.every((value) => value === true); // 모두 true인지
    const anyFalse = values.some((value) => value === false); // 하나라도 false가 있는지

    if (allTrue && !termsCheck.allTerms) {
      // 모두 true이면 all check true
      setTermsCheck((prev) => ({ ...prev, allTerms: true }));
    } else if (anyFalse && termsCheck.allTerms) {
      // 하나라도 false이면 all check false
      setTermsCheck((prev) => ({ ...prev, allTerms: false }));
    }
  }, [termsCheck]);

  return [termsCheck, setTermsCheck] as const;
}
