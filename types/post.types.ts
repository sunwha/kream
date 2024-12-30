type TFile = {
  id: string;
  file_path: string;
  uploader_id: string;
  uploaded_at: string;
};

export type TComment = {
  id: string;
  idx: string;
  user_id: string;
  parent_id: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
  username: string;
  like_count: number;
  like_users: string[];
  replies: string[];
};

export interface Post {
  id: string;
  idx: number;
  user_id: string;
  parent_id: string | null;
  title: string;
  content: string;
  type: string;
  style: string;
  views: number;
  created_at: string;
  updated_at: string;
  username: string;
  like_count: number;
  like_users: string[];
  tags: string[];
  files: TFile[];
}

export interface PostResponse {
  posts: Post[];
  nextPage: number;
}

export interface LikeResponse {
  message: string;
}

export interface PostDetailResponse {
  id: string;
  title: string;
  content: string;
  type: string;
  style: string;
  views: number;
  created_at: string;
  updated_at: string;
  username: string;
  like_count: number;
  like_users: string[];
  tags: string[];
  files: TFile[];
  comments: TComment[];
}

export interface PostUploadRequest {
  title: string;
  content: string;
  tags: string[];
  file_ids: string[];
  type: string;
  style: string;
}

export interface LikeInfoRequest {
  target_type: "post" | "comment";
  target_id: string;
}
