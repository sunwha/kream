"use client";
import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import { Button } from "@/components/ui";
import { cn } from "@/utils/tailwind";
import { CancelCircleIcon } from "hugeicons-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";

export default function Page() {
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [contents, setContents] = useState({ title: "", content: "" });

  const tags: { id: string; label: string }[] = [
    { id: "tagWinter", label: "#겨울코디" },
    { id: "tagStreet", label: "#스트릿템" },
    { id: "tagTemps", label: "#일교차코디" },
  ];

  const types: { id: string; label: string }[] = [
    { id: "typeMale", label: "남성" },
    { id: "typeFmale", label: "여성" },
  ];

  const styles: { id: string; label: string }[] = [
    { id: "styleRomantic", label: "로맨틱" },
    { id: "styleMorden", label: "모던" },
    { id: "styleVintage", label: "빈티지" },
    { id: "styleStreet", label: "스트릿" },
    { id: "styleSporty", label: "스포티" },
  ];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cookies = new Cookies();

  // 태크 다중 선택
  const handleClickTag = (tag: string) => {
    const target = tags.find((t) => t.id === tag);
    if (!target) return;

    setSelectedTag((prev) => {
      if (prev.includes(target.label)) {
        return prev.filter((item) => item !== target.label);
      } else {
        return [...prev, target.label];
      }
    });
  };

  useEffect(() => {
    console.log("selectedTag", selectedTag);
  }, [selectedTag]);
  // 성별 단일 선택
  const handleClickType = (type: string) => {
    setSelectedType(type);
  };
  // 스타일 단일 선택
  const handleClickStyle = (style: string) => {
    setSelectedStyle(style);
  };
  // 이미지 업로드
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setImgUrls(urls);
    }
  };
  // 이미지 업로드 실행 버튼
  const openFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDeleteImage = (url: string) => {
    setImgUrls((prev) => prev.filter((file) => file !== url));
  };
  const handleUpload = async () => {
    const formData = new FormData();
    imgUrls.forEach((url, index) => {
      const file = fileInputRef.current?.files?.[index];
      if (file) {
        formData.append("images", file);
      }
    });

    formData.append("title", contents.title);
    formData.append("content", contents.content);
    formData.append("tags", JSON.stringify(selectedTag));
    formData.append("type", selectedType);
    formData.append("style", selectedStyle);

    // console.log("selectedTag", selectedTag);

    // try {
    //   const response = await fetch("/api/posts", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${cookies.get("userToken")}`,
    //     },
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   console.log("Uploaded image URLs:", data.imageUrls);
    //   // setImgUrls(data.imageUrls); // 서버에서 반환된 실제 이미지 URL로 업데이트
    // } catch (error) {
    //   console.error("Error uploading images:", error);
    // }
  };

  return (
    <Container>
      <Header
        title="스타일 올리기"
        isHome={false}
        isFunc="등록"
        onFuncClick={handleUpload}
      />
      <div>
        <div className="px-5 pb-3 pt-5">
          {imgUrls.length > 0 ? (
            <ul className="pb-4 flex gap-2">
              {imgUrls.map((url, index) => (
                <li className="relative" key={url + index}>
                  <img
                    key={index}
                    src={url}
                    alt={`uploaded ${index}`}
                    className="w-20"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1"
                    aria-label="이미지 삭제"
                    onClick={() => handleDeleteImage(url)}
                  >
                    <CancelCircleIcon className="bg-white rounded-full overflow-hidden" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <Button
                type="button"
                size="medium"
                color="secondary"
                onClick={openFileUpload}
              >
                이미지 업로드
              </Button>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleImage}
                className="hidden"
              />
            </>
          )}
          <input
            type="text"
            name="title"
            id="title"
            className="w-full"
            placeholder="제목은 최대 20자 가능합니다."
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setContents((prev) => {
                return { ...prev, title: event.target.value };
              })
            }
          />
          <textarea
            placeholder="아이템과 스타일을 자랑해보세요."
            className="text-sm mt-4 min-h-36 w-full"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setContents((prev) => {
                return { ...prev, content: event.target.value };
              })
            }
          />

          <ul className="flex flex-row gap-2">
            {tags.map((tag) => (
              <li key={tag.id}>
                <button
                  type="button"
                  id={tag.id}
                  onClick={() => handleClickTag(tag.id)}
                  className={cn(
                    "rounded-full px-3 flex items-center justify-center border border-gray-300 text-xs font-bold h-8",
                    selectedTag.find((item) => item === tag.label)
                      ? "border-black bg-black text-white"
                      : ""
                  )}
                  aria-selected={
                    !!selectedTag.find((item) => item === tag.label)
                  }
                >
                  {tag.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 pt-4 border-t border-t-gray-200">
          <h4 className="text-sm font-bold pb-2">유형</h4>
          <ul className="flex flex-row gap-2">
            {types.map((type) => (
              <li key={type.id}>
                <button
                  type="button"
                  id={type.id}
                  onClick={() => handleClickType(type.id)}
                  className={cn(
                    "rounded-full px-3 flex items-center justify-center border border-gray-300 text-xs h-8 text-gray-700",
                    selectedType === type.id
                      ? "border-black bg-black text-white"
                      : ""
                  )}
                  aria-selected={selectedType === type.id}
                >
                  {type.label}
                </button>
              </li>
            ))}
          </ul>
          <h4 className="text-sm font-bold pb-2 mt-6">스타일</h4>
          <ul className="flex flex-row gap-2">
            {styles.map((style) => (
              <li key={style.id}>
                <button
                  type="button"
                  id={style.id}
                  onClick={() => handleClickStyle(style.id)}
                  className={cn(
                    "rounded-full px-3 flex items-center justify-center border border-gray-300 text-xs h-8 text-gray-700",
                    selectedStyle === style.id
                      ? "border-black bg-black text-white"
                      : ""
                  )}
                  aria-selected={selectedStyle === style.id}
                >
                  {style.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
