import React, { useCallback, useEffect, useState } from "react";
// import { Dropdown, Menu, MenuProps } from "antd";
import { Link } from "react-router";
import Logo from "./Icons/Logo";
import AccountIcon from "./Icons/AccountIcon";
import HeartIcon from "./Icons/HeartIcon";
import CartIcon from "./Icons/CartIcon";
import { useCartStore } from "../store/cart.store";
import { useQueryCartInfo } from "../hooks/useQueryCartInfo";
import CartOverLay from "./CartOverLay";
import LogoutIcon from "./Icons/LogoutIcon";
import PersonIcon from "./Icons/PersonIcon";
import { getRefreshToken } from "../utils/token";
import useLogout from "../hooks/useLogout";
import SearchInput from "./SearchInput";
import Dropdown from "./Dropdown";
import OrderIcon from "./Icons/OrderIcon";
import CicleHelpIcon from "./Icons/CicleHelpIcon";
import PhoneOutlineIcon from "./Icons/PhoneOutlineIcon";

function Header() {
  const { data } = useQueryCartInfo();
  const { setCartInfo, totalItem, cartItem } = useCartStore();
  const [isCartOverlayOpen, setCartOverlayOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { logoutUser, isPending } = useLogout();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (data) {
      setCartInfo(data.items, data.itemCount, data.totalPrice);
    }
  }, [data, setCartInfo]);

  const handleLogout = () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return;
    logoutUser({ token: refreshToken }, {});
  };

  const handleClose = useCallback(() => setCartOverlayOpen(false), []);

  const items = [
    {
      label: (
        <Link
          className="w-[150px] flex items-center gap-3 font-semibold after:w-100%"
          to={"/user/account/profile"}
          style={{ width: "150px" }}
        >
          <PersonIcon />
          Profile
        </Link>
      ),
    },
    {
      label: (
        <Link
          className="flex items-center gap-3 font-semibold"
          to={"/cart"}
          style={{ width: "150px" }}
        >
          <CartIcon />
          Cart
        </Link>
      ),
    },
    {
      label: (
        <Link className="flex items-center gap-3 font-semibold" to={"/order"}>
          <OrderIcon />
          Order
        </Link>
      ),
    },
    {
      label: (
        <Link className="flex items-center gap-3 font-semibold" to={"/about"}>
          <CicleHelpIcon />
          About
        </Link>
      ),
    },
    {
      label: (
        <Link className="flex items-center gap-3 font-semibold" to={"/contact"}>
          <PhoneOutlineIcon />
          Contact
        </Link>
      ),
    },
    { divider: true },
    {
      label: (
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 font-semibold text-red-500 cursor-pointer"
        >
          <LogoutIcon />
          Logout
        </div>
      ),
    },
  ];

  const handleSetFocus = useCallback((value: boolean) => {
    setIsFocused(value);
  }, []);

  const handleInputSearchChange = useCallback((e: any) => {
    setIsFocused(true);
    setSearchValue(e.target.value);
  }, []);

  return (
    <div className="h-[100px] w-full fixed top-0 z-10 bg-white flex justify-center items-center shadow-md">
      <div className="container flex flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="flex-shrink-0 text-2xl font-semibold text-gray-700">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className="flex font-semibold gap-[75px] hidden lg:flex">
          <li>
            <Link className="relative transition-all group" to="/">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative transition-all group" to="/shop">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative transition-all group" to="/about">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link className="relative transition-all group" to="/contact">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-8">
          <SearchInput
            value={searchValue}
            isFocused={isFocused}
            setIsFocused={handleSetFocus}
            onChange={handleInputSearchChange}
          />

          <HeartIcon />
          <div className="relative">
            <button
              onClick={() => setCartOverlayOpen((prev) => !prev)}
              className="relative"
            >
              <CartIcon />
              <span className="absolute -top-[7px] -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItem}
              </span>
            </button>
          </div>
          <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
            <button className="fill-black hover:fill-gray-500">
              <AccountIcon />
            </button>
          </Dropdown>
        </div>
        <div className="lg:hidden">
          <button className="text-2xl text-gray-700">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
      {isCartOverlayOpen && (
        <CartOverLay cartItem={cartItem} onClose={handleClose} />
      )}
    </div>
  );
}

export default Header;
