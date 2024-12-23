import { loginSchema } from "@/app/(account)/login/page";
import { SignupRequest } from "@/types/users.types";
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

export async function signUp(data: SignupRequest) {
  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      username: data.email.split("@")[0],
      password: data.password,
      email: data.email,
    }),
  });
  return response;
}
