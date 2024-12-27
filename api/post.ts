import { PostUploadRequest } from "@/types/post.types";

export async function post(data: {
  request: PostUploadRequest;
  token: string;
}) {
  console.log("request", data.request);
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data.request,
    }),
    credentials: "include",
  });
  return response;
}
