import { create } from "zustand";
import { getToken } from "../../src/utils/token";
import { jwtDecode } from "jwt-decode";
import { devtools } from "zustand/middleware";

export type AppStore = {
  userData: any | null;
  setUserData: (data: any) => void;
};
export const useAppStore = create<AppStore>()(
  devtools((set: any, get: any) => {
    const token = getToken();
    const initUserData = token ? jwtDecode(token) : undefined;

    return {
      userData: initUserData || null,
      setUserData: (data: any) => {
        set((state: any) => ({
          userData: { ...state.userData, ...data },
        }));
      },
    };
  })
);
