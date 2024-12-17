import React from "react";
import Banner from "../components/Banner";
import { useAppStore } from "../../../store/app.store";
import BrowseTheRange from "../components/BrowseTheRange";
import OurProduct from "../components/OurProduct";
function Main() {
  const { userData } = useAppStore();
  return (
    <div>
      <Banner />
      <BrowseTheRange />
      <OurProduct />
    </div>
  );
}

export default Main;
