import { SignupRequest, UpdateUserRequest } from "@/types/users.types";

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

export async function getUserInfo(data: { email: string; token: string }) {
  const { email, token } = data;
  const response = await fetch(`/api/users/${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function updateUserInfo(data: {
  email: string;
  request: UpdateUserRequest;
  token: string;
}) {
  const { email, request, token } = data;
  const response = await fetch(`/api/users/${email}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
    }),
  });
  return response;
}

export async function deleteUser(data: { email: string; token: string }) {
  const { email, token } = data;
  const response = await fetch(`/api/users/${email}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
