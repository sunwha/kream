"use client";
import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import { Button } from "@/components/ui";
import { cn } from "@/utils/tailwind";
import { CancelCircleIcon } from "hugeicons-react";
import { ChangeEvent, useRef, useState } from "react";
import { Cookies } from "react-cookie";

export default function Page() {
  const [uploadImages, setUploadImages] = useState<{
    imageFiles: File[];
    imageUrls: string[];
  }>({
    imageFiles: [],
    imageUrls: [],
  });
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [contents, setContents] = useState({ title: "", content: "" });

  const tags: string[] = ["겨울코디", "스트릿템", "일교차코디"];
  const types: string[] = ["남성", "여성"];
  const styles: string[] = ["로맨틱", "모던", "빈티지", "스트릿", "스포티"];

  const cookies = new Cookies();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 태크 다중 선택
  const handleClickTag = (tag: string) => {
    const target = tags.find((t) => t === tag);
    if (!target) return;

    setSelectedTag((prev) => {
      if (prev.includes(target)) {
        return prev.filter((item) => item !== target);
      } else {
        return [...prev, target];
      }
    });
  };

  // 이미지 업로드
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = event.target.files;
    const fileArray = Array.from(files);
    setUploadImages((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...fileArray],
    }));
  };
  // 이미지 업로드 실행 버튼
  const openFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDeleteImage = (file: File) => {
    setUploadImages((prev) => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((f) => f !== file),
    }));
  };
  const handleUpload = async () => {
    const formData = new FormData();

    if (uploadImages.imageFiles.length > 0) {
      uploadImages.imageFiles.forEach((file) => {
        formData.append("file", file);
      });
    } else {
      console.log("no images");
      return;
    }
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.get("userToken")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json(); // 오류 메시지 확인
        console.log("error", result.message);
      }

      const result = await response.json();
      console.log("Uploaded image URLs:", result.file);
    } catch (error: any) {
      console.error("Error uploading images:", error);
    }
  };
  const handlePost = () => {
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
          {uploadImages.imageFiles.length > 0 ? (
            <ul className="pb-4 flex gap-2">
              {uploadImages.imageFiles.map((url, index) => (
                <li className="relative" key={url.name + index}>
                  <img
                    key={index}
                    src={URL.createObjectURL(url)}
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
                name="file"
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
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => handleClickTag(tag)}
                  className={cn(
                    "rounded-full px-3 flex items-center justify-center border border-gray-300 text-xs font-bold h-8",
                    selectedTag.find((item) => item === tag)
                      ? "border-black bg-black text-white"
                      : ""
                  )}
                  aria-selected={!!selectedTag.find((item) => item === tag)}
                >
                  #{tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 pt-4 border-t border-t-gray-200">
          <h4 className="text-sm font-bold pb-2">유형</h4>
          <ul className="flex flex-row gap-2">
            {types.map((type) => (
              <li key={type}>
                <button
                  type="button"
                  id={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    "rounded-full px-3 flex items-center justify-center border border-gray-300 text-xs h-8 text-gray-700",
                    selectedType === type
                      ? "border-black bg-black text-white"
                      : ""
                  )}
                  aria-selected={selectedType === type}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
          <h4 className="text-sm font-bold pb-2 mt-6">스타일</h4>
          <ul className="flex flex-row gap-2">
            {styles.map((style) => (
              <li key={style}>
                <button
                  type="button"
                  id={style}
                  onClick={() => setSelectedStyle(style)}
                  className={cn(
                    "rounded-full px-3 flex items-center justify-center border border-gray-300 text-xs h-8 text-gray-700",
                    selectedStyle === style
                      ? "border-black bg-black text-white"
                      : ""
                  )}
                  aria-selected={selectedStyle === style}
                >
                  {style}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
