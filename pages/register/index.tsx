// pages/register.tsx
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { signup } from "src/apis/auth";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await signup(values.username, values.password);
      message.success("Signup successful. You can now login.");
      router.push("/login");
    } catch (error) {
      message.error("Failed to signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Form name="register" onFinish={onFinish}>
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
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
