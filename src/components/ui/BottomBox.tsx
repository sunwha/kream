import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const BottomBox = ({ children }: Props) => {
  return (
    <div className="fixed w-full bottom-0 left-0 flex items-center justify-center p-5 bg-white">
      {children}
    </div>
  );
};
