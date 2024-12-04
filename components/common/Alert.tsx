"use client";
import { useAlertStore } from "@/context/useAlertStore";
import { useEffect, useState } from "react";

export default function Alert() {
  const [open, setOpen] = useState(false);
  const {
    isOpen,
    title,
    desc,
    isCancel,
    isConfirm,
    cancelAction,
    confirmAction,
  } = useAlertStore();

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOpen]);

  return (
    open && (
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/60 z-[1000]">
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-[260px] h-[180px] bg-white rounded-2xl grid grid-rows-[1fr_48px] items-center overflow-hidden">
            <section className="text-center">
              <h3 className="sr-only">{title}</h3>
              <p className="text-sm">{desc}</p>
            </section>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(50%,1fr))] h-full">
              {isCancel && (
                <button
                  type="button"
                  className="bg-gray-200 w-full"
                  onClick={cancelAction}
                >
                  취소
                </button>
              )}
              {isConfirm && (
                <button
                  type="button"
                  className="bg-black text-white font-bold w-full"
                  onClick={confirmAction}
                >
                  확인
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
