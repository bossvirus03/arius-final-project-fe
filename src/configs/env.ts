interface ConfigurationI {
  tokenKey: string;
  apiBaseUrl: string;
  refreshTokenKey: string;
}
const env: ConfigurationI = {
  tokenKey: import.meta.env.VITE_TOKEN_KEY || "",
  apiBaseUrl: import.meta.env.BASE_URL,
  refreshTokenKey: import.meta.env.VITE_REFRESH_TOKEN_KEY || "",
};
export default env;
