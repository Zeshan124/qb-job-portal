"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authenticate } from "../../app/utils/action";
import { Spin, message, Input, Button, Card, Typography } from "antd";
import { useUser } from "../../contexts/UserContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import LoadingSpinner from "../loader/LoadingSpinner";

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!username || !password) {
      message.error("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authenticate({ username, password });

      if (result) {
        console.log("Received Token from API:", result.token);

        if (!result.token) {
          message.error("Login failed: No token received!");
          return;
        }

        Cookies.set("token", result.token, { expires: 7, secure: true });
        Cookies.set("user", JSON.stringify(result), {
          expires: 7,
          secure: true,
        });

        console.log("Stored Token in Cookies:", Cookies.get("token"));

        setUser(result);
        message.success("Login successful! Redirecting...");
        setTimeout(() => router.push("/portal"), 100);
      }
    } catch (error) {
      message.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="shadow-lg rounded-lg p-2 w-full max-w-sm bg-white">
        <div className="flex justify-center mb-4">
          <Image
            src="/images/chair.jpg"
            alt="Login"
            width={200}
            height={180}
            className="rounded"
          />
        </div>
        <Title level={3} className="text-center text-gray-700">
          Admin Login
        </Title>
        <Text type="secondary" className="block text-center mb-4">
          Sign in to access your dashboard
        </Text>

        <Input
          prefix={<UserOutlined />}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3"
          size="large"
        />

        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
          size="large"
        />

        <Button
          type="primary"
          block
          size="large"
          onClick={handleLogin}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-[#8169ca] transition-colors duration-300"
        >
          {isLoading ? <LoadingSpinner /> : "Log In"}
        </Button>
      </Card>
    </div>
  );
};

export default AdminLogin;
