type TFile = {
  id: string;
  file_path: string;
  uploader_id: string;
  uploaded_at: string;
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