import { useState } from "react";
import { Button, Image, Layout, Menu, Avatar } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SolutionOutlined,
  BookOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Sider } = Layout;

interface SliderProps {
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

const CustomSlider: React.FC<SliderProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const handleMenuSelect = ({ key }: { key: string }) => {
    props.setSelectedKey(key);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
        }}
      >
        {/* Add your logo element here */}
        <Image
          width={60}
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
        />
      </div>
      <Avatar
        size={40}
        style={{
          backgroundColor: "#87d068",
          margin: "10px auto",
          display: "block",
        }}
        icon={<UserOutlined />}
      />
      <Menu
        theme="dark"
        selectedKeys={[props.selectedKey]}
        onSelect={handleMenuSelect}
        mode="inline"
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link href="/users">Users</Link>
        </Menu.Item>
        {/* <Menu.Item key="recipes" icon={<BookOutlined />}>
          <Link href="/recipes">Recipes</Link>
        </Menu.Item> */}
        <Menu.Item key="categories" icon={<AppstoreOutlined />}>
          <Link href="/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="cuisines" icon={<EnvironmentOutlined />}>
          <Link href="/cuisines">Cuisines</Link>
        </Menu.Item>
        {/* <Menu.Item key="reports" icon={<SolutionOutlined />}>
          <Link href="/reports">Reports</Link>
        </Menu.Item> */}
        <Menu.Item key="reviews" icon={<StarOutlined />}>
          <Link href="/reviews">Reviews</Link>
        </Menu.Item>
      </Menu>
      <Button
        type="primary"
        danger
        onClick={() => {}}
        style={{ margin: "16px", width: "83%" }}
      >
        Logout
      </Button>
    </Sider>
  );
};

export default CustomSlider;
