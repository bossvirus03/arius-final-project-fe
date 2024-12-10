import React, { useEffect } from "react";
import { Dropdown, Menu } from "antd";
import Logo from "./Icons/Logo";
import { SmileOutlined } from "@ant-design/icons";
import AccountIcon from "./Icons/AccountIcon";
import InputWithIcon from "./InputWithIcon";
import InputIcon from "./Icons/InputIcon";
import HeartIcon from "./Icons/HeartIcon";
import CartIcon from "./Icons/CartIcon";
import { Link } from "react-router";
import { useCartStore } from "../store/cart.store";
import { useQueryCartInfo } from "../hooks/useQueryCartInfo";

function Header() {
  const { data } = useQueryCartInfo();
  const { setCartInfo }: any = useCartStore();
  useEffect(() => {
    if (data) {
      setCartInfo(data.items, data.itemCount, data.totalPrice);
      console.log(data);
    }
  }, [data]);
  const accountMenuItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <div className="h-[100px] w-full fixed top-0 z-[9999] bg-[#fff] flex justify-center items-center">
      <div className="container flex items-center justify-between w-full m-0">
        <div className="text-2xl font-semibold text-[#5e6085]">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
        <div>
          <div>
            <ul className="flex font-semibold gap-[75px]">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/shop"}>Shop</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-[45px]">
          <Dropdown menu={{ items: accountMenuItems }}>
            <AccountIcon />
          </Dropdown>
          <div>
            <InputIcon />
          </div>
          <div>
            <HeartIcon />
          </div>
          <div>
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
