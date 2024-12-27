"use client";
import { uploadFile } from "@/api/file";
import { post } from "@/api/post";
import Container from "@/components/common/Container";
import Header from "@/components/common/Header";
import { Button } from "@/components/ui";
import { useAlertStore } from "@/context/useAlertStore";
import { cn } from "@/utils/tailwind";
import { CancelCircleIcon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";

export default function Page() {
  const [uploadImages, setUploadImages] = useState<{
    imageFiles: File[];
    imageIds: string[];
  }>({
    imageFiles: [],
    imageIds: [],
  });
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [contents, setContents] = useState({ title: "", content: "" });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const tags: string[] = ["겨울코디", "스트릿템", "일교차코디"];
  const types: string[] = ["남", "여"];
  const styles: string[] = ["로맨틱", "모던", "빈티지", "스트릿", "스포티"];

  const cookies = new Cookies();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { openAlert, closeAlert } = useAlertStore();

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
    if (uploadImages.imageFiles.length === 0) {
      console.log("no images");
      return;
    }

    const uploadPromises = uploadImages.imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await uploadFile({
        request: formData,
        token: cookies.get("userToken"),
      });

      const result = await response.json(); // 오류 메시지 확인
      if (!response.ok) {
        console.log("error", result.message);
        throw new Error(result.message); // 오류 발생 시 예외 처리
      }
      return result.file.id; // 성공적으로 업로드된 파일 ID 반환
    });

    try {
      const imageIds = await Promise.all(uploadPromises); // 모든 업로드 요청 병렬 처리
      setUploadImages((prev) => ({
        ...prev,
        imageIds: [...prev.imageIds, ...imageIds],
      }));
      setUploadSuccess(true);
    } catch (error: any) {
      console.error("Error uploading images:", error);
      openAlert({
        title: "이미지 업로드 오류",
        desc: "이미지 업로드 오류입니다. 다시 시도해주세요.",
        isCancel: false,
        isConfirm: true,
        confirmAction: () => {
          closeAlert();
        },
      });
    }
  };

  // 모든 이미지 업로드 요청, 받은 id 저장 후 post 진행
  useEffect(() => {
    if (uploadSuccess) handlePost();
  }, [uploadSuccess]);

  const handlePost = async () => {
    const request = {
      title: contents.title,
      content: contents.content,
      tags: selectedTag,
      file_ids: uploadImages.imageIds,
      type: selectedType,
      style: selectedStyle,
    };
    console.log("request", request);
    try {
      const response = await post({
        request,
        token: cookies.get("userToken"),
      });
      const result = await response.json();
      if (response.ok) {
        router.replace("/");
      } else {
        console.log(result.message);
        openAlert({
          title: "업로드 오류",
          desc: "잠시 후에 다시 시도해 주세요. 홈으로 이동합니다.",
          isCancel: false,
          isConfirm: true,
          confirmAction: () => {
            closeAlert();
            router.push("/");
          },
        });
        return;
      }
    } catch (error) {
      console.error("Error posting:", error);
      openAlert({
        title: "시스템 에러",
        desc: "예기치 않은 문제가 발생했습니다. 홈으로 이동합니다.",
        isCancel: false,
        isConfirm: true,
        confirmAction: () => {
          closeAlert();
          router.push("/");
        },
      });
    }
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
          ) : null}
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
