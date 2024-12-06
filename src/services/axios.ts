import axios from "axios";
import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  removeRefreshToken,
  removeToken,
} from "./../../src/utils/token";
import { ApiUrls } from "./../../src/configs/url";

const api = axios.create({
  baseURL: ApiUrls.apiBaseUrl,
});

api.defaults.headers.post["Content-Type"] = "application/json";

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          delete originalRequest.headers["Authorization"];

          const response = await axios.post(
            `${ApiUrls.apiBaseUrl}/auth/refresh`,
            {
              token: refreshToken,
            }
          );

          if (response.status === 200 && response.data?.data?.access_token) {
            const { access_token, refresh_token } = response.data.data;
            setToken(access_token);
            setRefreshToken(refresh_token);

            originalRequest.headers["Authorization"] = "Bearer " + access_token;

            return axios(originalRequest);
          }
        } catch (refreshError) {
          try {
            const retryResponse = await axios.post(
              `${ApiUrls.apiBaseUrl}/auth/refresh`,
              {
                token: refreshToken,
              }
            );

            if (
              retryResponse.status === 200 &&
              retryResponse.data?.data?.access_token
            ) {
              const { access_token, refresh_token } = retryResponse.data.data;
              setToken(access_token);
              setRefreshToken(refresh_token);

              originalRequest.headers["Authorization"] =
                "Bearer " + access_token;

              return axios(originalRequest);
            }
          } catch (retryError) {
            removeToken();
            removeRefreshToken();
            window.location.href = "/login";
            return Promise.reject(retryError);
          }
        }
      } else {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
