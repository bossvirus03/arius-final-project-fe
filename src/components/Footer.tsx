import React from "react";
import Logo from "./Icons/Logo";

function Footer() {
  return (
    <footer className="">
      <div className="container">
        <div className="flex pt-[48px]  pb-[38px] gap-[120px]">
          <div className="text-[#9F9F9F] font-light">
            <Logo />
            <p className="mt-[50px] ">
              400 University Drive Suite 200 Coral Gables,
            </p>
            <p>FL 33134 USA</p>
          </div>
          <div className="font-semibold">
            <h2 className="text-[#9F9F9F]">Links</h2>
            <ul>
              <li>HomeLayout</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="font-semibold">
            <h2 className="text-[#9F9F9F]">Help</h2>
            <ul>
              <li>Payment Options</li>
              <li>Returns</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
          <div className="font-semibold">
            <h2 className="text-[#9F9F9F]">Newsletter</h2>
            <div>
              <input type="text" placeholder="Enter your email address" />
              <button>SUBCRIBE</button>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#9F9F9F] rounded-full" />
        <div className="py-[38px]">
          <h2 className="font-semibold">2023 furino. All rights reverved</h2>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
