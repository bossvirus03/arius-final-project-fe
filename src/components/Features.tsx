import React from "react";
import CupIcon from "./Icons/CupIcon";
import TickCheckIcon from "./Icons/TickCheckIcon";
import ShipingIcon from "./Icons/ShipingIcon";
import CallSupportIcon from "./Icons/CallSupportIcon";

function Features() {
  return (
    <div className="bg-[#FAF3EA] py-[100px] px-[53px]">
      <ul className="container grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center">
        <li className="flex items-center justify-center gap-4">
          <CupIcon />
          <div>
            <h2 className="text-[25px]">High Quality</h2>
            <p className="text-[#898989] text-[20px]">
              crafted from top materials
            </p>
          </div>
        </li>
        <li className="flex items-center justify-center gap-4">
          <TickCheckIcon />
          <div>
            <h2 className="text-[25px]">Warranty Protection</h2>
            <p className="text-[#898989] text-[20px]">Over 2 years</p>
          </div>
        </li>
        <li className="flex items-center justify-center gap-4">
          <ShipingIcon />
          <div>
            <h2 className="text-[25px]">Free Shipping</h2>
            <p className="text-[#898989] text-[20px]">Order over 150 $</p>
          </div>
        </li>
        <li className="flex items-center justify-center gap-4">
          <CallSupportIcon />
          <div>
            <h2 className="text-[25px]">24 / 7 Support</h2>
            <p className="text-[#898989] text-[20px]">Dedicated support</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Features;
