import { useState } from "react";
import { Button, Image, Layout, Menu } from "antd";
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
import { TitleProps } from "@refinedev/core/dist/interfaces";
import {
  useActiveAuthProvider,
  useLogout,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core";

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
  const translate = useTranslate();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        translate(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes."
        )
      );

      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
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
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link href="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="recipes" icon={<BookOutlined />}>
          <Link href="/recipes">Recipes</Link>
        </Menu.Item>
        <Menu.Item key="categories" icon={<AppstoreOutlined />}>
          <Link href="/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="cuisines" icon={<EnvironmentOutlined />}>
          <Link href="/cuisines">Cuisines</Link>
        </Menu.Item>
        <Menu.Item key="reports" icon={<SolutionOutlined />}>
          <Link href="/reports">Reports</Link>
        </Menu.Item>
        <Menu.Item key="reviews" icon={<StarOutlined />}>
          <Link href="/reviews">Reviews</Link>
        </Menu.Item>
      </Menu>
      <Button
        type="primary"
        danger
        onClick={handleLogout}
        style={{ margin: "16px", width: "83%" }}
      >
        Logout
      </Button>
    </Sider>
  );
};

export default CustomSlider;
