import { useState } from "react";
import { Image, Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SolutionOutlined,
  BookOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { TitleProps } from "@refinedev/core/dist/interfaces";

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
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} {...props}>
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
      <Menu
        theme="dark"
        selectedKeys={[props.selectedKey]}
        onSelect={handleMenuSelect}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link href="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link href="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BookOutlined />}>
          <Link href="/recipes">Recipes</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreOutlined />}>
          <Link href="/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<EnvironmentOutlined />}>
          <Link href="/cuisines">Cuisines</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<SolutionOutlined />}>
          <Link href="/reports">Reports</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default CustomSlider;
