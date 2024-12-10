import React from "react";
import {
  DownOutlined,
  FacebookOutlined,
  PhoneOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Link } from "react-router";

function TopPannel() {
  const accountDropdownItems = [
    {
      key: "1",
      label: (
        <a
          href="https://www.antgroup.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          href="https://www.aliyun.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          href="https://www.luohanacademy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  const topPannelItems = [
    {
      key: "0",
      label: (
        <Dropdown menu={{ items: accountDropdownItems }} placement="bottom">
          <Space>
            <UserOutlined className="text-red-600" />
            Account
            <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },
    {
      key: "1",
      label: (
        <div className="flex items-center">
          <PhoneOutlined className="mr-1 text-red-600" />
          Hotline: <span className="ml-1 font-medium">1900 8386</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="https://facebook.com" className="flex items-center">
          <FacebookOutlined className="mr-1 text-red-600" />
          Shop S2
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="https://youtube.com" className="flex items-center">
          <YoutubeOutlined className="mr-1 text-red-600" />
          S2 Shop yt
        </Link>
      ),
    },
  ];

  return (
    <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
      <Menu mode="horizontal" items={topPannelItems} className="justify-end" />
    </div>
  );
}

export default TopPannel;
