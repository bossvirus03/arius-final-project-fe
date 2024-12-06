import env from "./../../src/configs/env";
import { AsyncStorageUtils } from "./AsyncStorgateUtils";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

let TOKEN = "";

export const setToken = (token: string) => {
  AsyncStorageUtils.save(env.tokenKey, token);
};

export const getToken = () => {
  const token = AsyncStorageUtils.get(env?.tokenKey);
  return token;
};
export const setRefreshToken = (token: string) => {
  AsyncStorageUtils.save(env.refreshTokenKey, token);
};
export const getRefreshToken = () => {
  const token = AsyncStorageUtils.get(env?.refreshTokenKey);
  return token;
};
export const removeToken = () => {
  AsyncStorageUtils.remove(env.tokenKey);
  TOKEN = "";
};
export const removeRefreshToken = () => {
  AsyncStorageUtils.remove(env.refreshTokenKey);
  TOKEN = "";
};
