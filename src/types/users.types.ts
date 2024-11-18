export interface SignupRequest {
  username: string;
  password: string;
  email: string;
  profile_image_id: string;
}

export interface SignupResponse {
  message: string;
  userId: string;
}
