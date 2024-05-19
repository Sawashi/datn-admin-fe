// pages/login.tsx
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Cookies from "js-cookie";
import { login } from "src/apis/auth";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { accessToken } = await login(values.username, values.password);
      Cookies.set("accessToken", accessToken, { expires: 1 }); // Set cookie to expire in 7 days
      // Redirect or do anything after successful login
      message.success("Login successful.");
      router.push("/users");
    } catch (error) {
      message.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form name="login" onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
