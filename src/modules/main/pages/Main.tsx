import React from "react";
import Banner from "../components/Banner";
import { useAppStore } from "../../../store/app.store";
function Main() {
  const { userData } = useAppStore();
  return (
    <div>
      <Banner />
      {JSON.stringify(userData)}
    </div>
  );
}

export default Main;
