import { useUserStore } from "@/src/context/useUserStore";

export default function Page() {
  const { email, token } = useUserStore();
  const res = fetch("/api/auth/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  console.log(res);
  return <>My</>;
}
