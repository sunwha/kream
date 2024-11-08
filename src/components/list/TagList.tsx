import { Post } from "@/src/types/post.types";
import {
  HangerIcon,
  SnowIcon,
  TShirtIcon,
  TwoFinger05Icon,
} from "hugeicons-react";

type Props = {
  postList: Post[];
  setSelectedTagList: (tagList: Post[] | null) => void;
};

export default function TagList({ postList, setSelectedTagList }: Props) {
  const tagList = [
    { name: "ALL", icon: <HangerIcon /> },
    { name: "패션", icon: <TShirtIcon /> },
    { name: "스트릿템", icon: <TwoFinger05Icon /> },
    { name: "일교차코디", icon: <SnowIcon /> },
  ];

  // 태그 클릭 이벤트
  const handleTagClick = (tag: string) => {
    if (tag === "ALL") {
      setSelectedTagList(null);
    } else {
      setSelectedTagList(postList.filter((post) => post.tags.includes(tag)));
    }
  };
  return (
    <ul className="flex gap-4 justify-center items-center pt-3 pb-5">
      {tagList.map((tag, index) => (
        <li key={index} className="flex flex-col items-center gap-1">
          <button
            type="button"
            aria-label={`${tag.name} 태그 게시물 보기`}
            onClick={() => handleTagClick(tag.name)}
          >
            <span className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              {tag.icon}
            </span>
            <span className="text-xs">#{tag.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
