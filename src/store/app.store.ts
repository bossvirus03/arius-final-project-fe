import { jwtDecode } from "jwt-decode";
import { getToken } from "./../../src/utils/token";
import { create } from "zustand";

export const useAppStore = create((set: any, get: any) => {
  const token = getToken();
  const initUserData = token ? jwtDecode(token) : undefined;
  // console.log(initUserData);
  return {
    userData: initUserData,
    setUserData: (data: any) => {
      set({ userData: jwtDecode(data) });
    },
  };
});
