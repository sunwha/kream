import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || ""; // 쿠키 헤더 가져오기
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => {
      const [key, value] = cookie.split("=");
      return [key, decodeURIComponent(value)];
    })
  ); // 쿠키 파싱
  if (!cookies.userToken) {
    throw new Error("userToken 쿠키가 존재하지 않습니다."); // 쿠키가 없을 경우 에러 처리
  }
  console.log("token", cookies.userToken); // "userToken" 쿠키 값 출력
  try {
    const formData = await req.formData(); // FormData 객체 가져오기
    console.log("token", cookies.userToken);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.userToken}`,
        },
        body: formData,
      }
    );
    console.log("res", response);

    if (!response.ok) {
      const errorText = await response.json(); // 오류 메시지 확인
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText.message}`
      );
    }
    const jsonResponse = await response.json();
    return new Response(JSON.stringify(jsonResponse), { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "업로드 중 오류가 발생했습니다." }),
      { status: 500 }
    );
  }
}
