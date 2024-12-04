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

export interface LoginResponse {
  message: string;
  token: string;
  user: { id: number; email: string };
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  roles: string[];
  profile_image_id: string;
  profile_image_url: string;
}
