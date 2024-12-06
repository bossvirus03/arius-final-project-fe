import AuthHOC from "./../../src/hocs/authHOC";
import { Outlet } from "react-router";
function AuthContainer() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default AuthHOC(AuthContainer);
