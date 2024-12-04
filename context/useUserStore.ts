import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
  email: string;
  id: string;
};
export const useUserStore = create(
  persist<Props>(
    (set) => ({
      email: "",
      id: "",
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
