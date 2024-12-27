import { loginSchema } from "@/app/(account)/login/page";
import { z } from "zod";

export async function login(data: z.infer<typeof loginSchema>) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    credentials: "include",
  });
  return response;
}

export async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "GET",
  });
  return response;
}
