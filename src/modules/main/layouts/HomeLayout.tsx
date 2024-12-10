import { Outlet } from "react-router";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

function HomeLayout() {
  return (
    <>
      <Header />
      <main className="mt-[100px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default HomeLayout;
