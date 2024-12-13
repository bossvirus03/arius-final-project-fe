import { create } from "zustand";
import { getToken } from "../../src/utils/token";
import { jwtDecode } from "jwt-decode";
import { devtools } from "zustand/middleware";

export const useAppStore = create<any>()(
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
