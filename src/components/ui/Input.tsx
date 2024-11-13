"use client";

import { Cancel01Icon, ViewIcon, ViewOffSlashIcon } from "hugeicons-react";
import { ForwardedRef, forwardRef, InputHTMLAttributes, useState } from "react";
import { GlobalError } from "react-hook-form";

type Props = {
  type: "text" | "password" | "email";
  name: string;
  id: string;
  placeholder: string;
  errors: GlobalError | undefined;
  dirtyFields: boolean | undefined;
  resetField?: (name: any, options?: Record<string, boolean | any>) => void;
} & InputHTMLAttributes<HTMLInputElement>;
export const Input = forwardRef(
  (
    {
      type,
      name,
      id,
      placeholder,
      errors,
      dirtyFields,
      resetField,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    return (
      <>
        <div className="border-b border-gray-300 h-14 relative">
          <input
            ref={ref}
            type={isShowPassword ? "text" : type}
            name={name}
            id={id}
            placeholder={placeholder}
            className="rounded-none w-full h-full"
            {...props}
          />
          {type === "password" && dirtyFields && (
            <button
              type="button"
              aria-label="비밀번호 보기"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full flex items-center justify-center"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <ViewIcon className="w-5 h-5" />
              ) : (
                <ViewOffSlashIcon className="w-5 h-5" />
              )}
            </button>
          )}
          {type !== "password" && resetField && dirtyFields && (
            <button
              type="button"
              aria-label="모두 지우기"
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full flex items-center justify-center"
              onClick={() => resetField(name)}
            >
              <Cancel01Icon className="w-4 h-4" />
            </button>
          )}
        </div>
        {errors && <p className="text-xs text-red-500">{errors.message}</p>}
      </>
    );
  }
);
