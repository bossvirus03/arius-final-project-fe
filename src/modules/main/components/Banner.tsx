import React from "react";
import Button from "../../../components/Button";

function Banner() {
  return (
    <div className="relative w-full h-[calc(100vh-100px)] bg-hero bg-no-repeat bg-cover">
      <div className="absolute top-[150px] right-[50px] bg-[#FFF3E3] rounded-lg shadow-lg w-[45vw] h-[60vh] p-8 flex flex-col justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">New Arrival</p>
          <h1 className="text-5xl font-extrabold text-[#B88E2F] leading-tight mt-4">
            Discover Our New Collection
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
        <Button className="mt-6 w-[200px] h-[60px] text-lg font-semibold bg-[#B88E2F] text-white hover:bg-[#9b752a]">
          BUY NOW
        </Button>
      </div>
    </div>
  );
}

export default Banner;
