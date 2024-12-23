export async function getUserInfo(data: { email: string; token: string }) {
  const response = await fetch(`/api/users/${data.email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}
