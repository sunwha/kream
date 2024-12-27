import { LikeInfoRequest, PostUploadRequest } from "@/types/post.types";

export async function post(data: {
  request: PostUploadRequest;
  token: string;
}) {
  const { request, token } = data;
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
    }),
    credentials: "include",
  });
  return response;
}

export async function editPost(data: {
  id: string;
  request: PostUploadRequest;
  token: string;
}) {
  const { id, request, token } = data;
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
    }),
    credentials: "include",
  });
  return response;
}

export async function deletePost(data: { id: string; token: string }) {
  const { id, token } = data;
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  return response;
}

export async function postLike(data: { id: string; token: string }) {
  const { id, token } = data;
  const response = await fetch(`/api/posts/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
}

export async function postComments(data: {
  id: string;
  request: { content: string };
  token: string;
}) {
  const { id, request, token } = data;
  const response = await fetch(`/api/posts/${id}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
    }),
    credentials: "include",
  });
  return response;
}

export async function editComments(data: {
  postId: string;
  commentId: string;
  request: { content: string };
  token: string;
}) {
  const { postId, commentId, request, token } = data;
  const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
    }),
    credentials: "include",
  });
  return response;
}

export async function deleteComments(data: {
  postId: string;
  commentId: string;
  token: string;
}) {
  const { postId, commentId, token } = data;
  const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },

    credentials: "include",
  });
  return response;
}

export async function commentLike(data: {
  postId: string;
  commentId: string;
  token: string;
}) {
  const { postId, commentId, token } = data;
  const response = await fetch(
    `/api/posts/${postId}/comments/${commentId}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return response;
}

export async function getLikeInfo(data: {
  request: LikeInfoRequest;
  token: string;
}) {
  const { request, token } = data;
  const response = await fetch(
    `/api/posts/like-info?target_type=${request.target_type}&target_id=${request.target_id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );
  return response;
}
