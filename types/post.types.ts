type TFile = {
  id: string;
  file_path: string;
  uploader_id: string;
  uploaded_at: string;
};

type TComment = {
  id: string;
  content: string;
  views: number;
  created_at: string;
  updated_at: string;
  username: string;
  like_count: number;
  tags: string[];
  files: TFile[];
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
