import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
  email: string;
  token: string;
};
export const useUserStore = create(
  persist<Props>(
    (set) => ({
      email: "",
      token: "",
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
