import { UserResponse } from "@/types/users.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist<UserResponse>(
    (set) => ({
      id: "",
      username: "",
      email: "",
      roles: [],
      profile_image_id: "",
      profile_image_url: "",
    }),
    {
      name: "user-info",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export const clearUserStore = () => {
  sessionStorage.removeItem("user-info");
};
