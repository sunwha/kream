export async function uploadFile(data: { request: FormData; token: string }) {
  const { request, token } = data;
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: request,
  });
  return response;
}

export async function uploadProfile(data: {
  request: FormData;
  token: string;
}) {
  const { request, token } = data;
  const response = await fetch("/api/upload/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: request,
  });
  return response;
}
