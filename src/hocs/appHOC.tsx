import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "./../../src/utils/token";
import { TokenInfo } from "../modules/auth/interfaces/type";
import api from "../services/axios";
import { ApiUrls } from "../configs/url";

function AppHOC(WrappedComponent: any) {
  const AuthenticatedComponent = (props: any) => {
    const [data, setData] = useState<TokenInfo | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    // const userData = api.get(ApiUrls.user.getMe);

    useEffect(() => {
      const eventNotUserData = () => {
        removeToken();
        navigate("/login");
      };

      const token = getToken();
      if (!token) {
        console.log("hererer");
        eventNotUserData();
      } else {
        try {
          const decodedToken: TokenInfo = jwtDecode(token);
          setData(decodedToken);
          console.log(decodedToken);
          // Check user's role and restrict access to /admin
          if (
            decodedToken?.roles === "ROLE_USER" &&
            location.pathname.includes("/admin")
          ) {
            navigate("/");
          }
        } catch (error) {
          console.error("Invalid token:", error);
          eventNotUserData();
        }
      }
    }, [navigate, location]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
}

export default AppHOC;
