import { RouterProvider } from "react-router";
import { browserRouters } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { removeToken } from "./utils/token";
import env from "./configs/env";
import { Modal } from "antd";

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    window.addEventListener("storage", (event) => {
      if (event.key === env.tokenKey && event.newValue !== event.oldValue) {
        if (event.oldValue && !event.newValue) {
          removeToken();
          window.location.href = "/login";
        }
        if (event.oldValue && event.newValue) {
          window.location.href = "/";
        }
      }
    });
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={browserRouters} />
      </QueryClientProvider>
    </>
  );
}

export default App;
