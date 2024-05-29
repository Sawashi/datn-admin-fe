// pages/login.tsx
import { useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Space } from "antd";
import Cookies from "js-cookie";
import { login } from "src/apis/auth";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@components/redux/store";
import { getUserById } from "src/apis/users";
import { setUser } from "@components/redux/slices/userSlice";
import { Typography } from "antd";

const { Title } = Typography;
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.role === "admin") {
      message.success("Login successful.");
      router.push("/users");
    } else {
      message.info("Please enter an admin account");
    }
  }, [user]);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { accessToken, id } = await login(values.username, values.password);
      Cookies.set("accessToken", accessToken, { expires: 1 }); // Set cookie to expire in 7 days
      const meData = await getUserById(parseInt(id));
      console.log("meData: ");
      console.log(meData);
      dispatch(
        setUser({
          id: parseInt(id),
          email: null,
          username: meData.username,
          password: "",
          imgUrl: null,
          gender: null,
          dateOfBirth: null,
          createdAt: null,
          updatedAt: null,
          status: meData.status,
          role: meData.role,
          isLogin: null,
        })
      );
      // Redirect or do anything after successful login
    } catch (error) {
      message.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card style={{ width: 600, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
              <Button type="link" block>
                Forgot password?
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
