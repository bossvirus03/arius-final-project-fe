import { Outlet } from "react-router";
import AppHOC from "./../../src/hocs/appHOC";

function AppContainer() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AppHOC(AppContainer);
