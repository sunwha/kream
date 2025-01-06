"use client";
import Container from "@/components/common/Container";
import Navi from "@/components/common/Navi";
import EditName from "@/components/mypage/EditName";
import Profile from "@/components/mypage/Profile";
import UserOpt from "@/components/mypage/UserOpt";
import { useAlertStore } from "@/context/useAlertStore";
import { useUserStore } from "@/context/useUserStore";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

export default function Page() {
  const userInfo = useUserStore();
  const { openAlert, closeAlert } = useAlertStore();
  const router = useRouter();

  const cookies = new Cookies();

  return (
    <Container isHeader={false} isNavi={true}>
      <div className="px-5 grid grid-rows-[1fr_52px] h-[calc(100vh-56px)]">
        <div className="flex items-center justify-center">
          <h2 className="sr-only">마이페이지</h2>
          {userInfo && (
            <div className="flex flex-col items-center justify-center">
              <Profile userInfo={userInfo} token={cookies.get("userToken")} />
              <EditName userInfo={userInfo} token={cookies.get("userToken")} />
            </div>
          )}
        </div>
        <UserOpt userInfo={userInfo} token={cookies.get("userToken")} />
      </div>
      <Navi />
    </Container>
  );
}
