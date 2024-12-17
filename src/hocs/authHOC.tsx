import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getToken } from "./../../src/utils/token";

function AuthHOC(WrappedComponent: any) {
  const AuthenticatedComponent = (props: any) => {
    const navigate = useNavigate();
    useEffect(() => {
      const userData = getToken();
      if (userData) {
        navigate("/");
      } else {
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
  return AuthenticatedComponent;
}

export default AuthHOC;
