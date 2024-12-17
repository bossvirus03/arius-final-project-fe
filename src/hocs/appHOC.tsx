import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import { getToken, removeToken } from "../../src/utils/token";
import { TokenInfo } from "../modules/auth/interfaces/type";
import { useGetmeProfile } from "../hooks/useGetmeProfile";
import { useAppStore } from "../store/app.store";

function AppHOC(WrappedComponent: any) {
  const AuthenticatedComponent = (props: any) => {
    const [data, setData] = useState<TokenInfo | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { setUserData } = useAppStore();
    const { data: medata, isPending } = useGetmeProfile();

    useEffect(() => {
      if (medata) {
        setUserData(medata);
      }
    }, [medata, setUserData]);

    useEffect(() => {
      const eventNotUserData = () => {
        removeToken();
        navigate("/login");
      };

      const token = getToken();
      if (!token) {
        eventNotUserData();
      } else {
        try {
          const decodedToken: TokenInfo = jwtDecode(token);
          setData(decodedToken);

          if (
            decodedToken?.scope === "ROLE_USER" &&
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
