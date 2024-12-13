import React, { useState } from "react";
import {
  BlockOutlined,
  BranchesOutlined,
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ShoppingOutlined,
  TagOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            height: "32px",
            margin: "16px",
            backgroundColor: "rgba(255, 255, 255, .2)",
            borderRadius: "6px",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "user",
              icon: <UserOutlined />,
              label: <NavLink to={"user"}>User</NavLink>,
            },
            {
              key: "product",
              icon: <ShoppingOutlined />,
              label: <NavLink to={"product"}>Product</NavLink>,
            },
            {
              key: "roles",
              icon: <BranchesOutlined />,
              label: <NavLink to={"role"}>Roles</NavLink>,
            },
            {
              key: "category",
              icon: <BlockOutlined />,
              label: <NavLink to={"category"}>Category</NavLink>,
            },
            // {
            //   key: "permission",
            //   icon: <BlockOutlined />,
            //   label: <NavLink to={"permission"}></NavLink>,
            // },
            {
              key: "tags",
              icon: <TagOutlined />,
              label: <NavLink to={"tags"}>Tags</NavLink>,
            },
            {
              key: "order",
              icon: <TagOutlined />,
              label: <NavLink to={"order"}>Order</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
