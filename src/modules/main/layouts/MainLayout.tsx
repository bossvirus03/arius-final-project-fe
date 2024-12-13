import { Outlet, useLocation } from "react-router";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Features from "../../../components/Features";
import Breadcrumb from "../../../components/Breadcumb";

function MainLayout() {
  const location = useLocation();
  return (
    <div className="relative">
      <Header />
      <main className="mt-[100px]">
        {location.pathname !== "/" && location.pathname !== "/search" ? (
          <Breadcrumb />
        ) : (
          <></>
        )}
        <Outlet />
      </main>
      <Features />
      <Footer />
    </div>
  );
}

export default MainLayout;
