"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authenticate } from "../../app/utils/action";
import { Spin, message, Input, Button, Card, Typography } from "antd";
import { useUser } from "../../contexts/UserContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

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
        if (typeof window !== "undefined") {
          console.log("Received Token from API:", result.token);
          
          if (!result.token) {
            message.error("Login failed: No token received!");
            return;
          }
        
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result));
        
          console.log("Stored Token in localStorage:", localStorage.getItem("token"));
        }
        
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
          <Image src="/images/chair.jpg" alt="Login" width={170} height={120} className="rounded" />
        </div>
        <Title level={3} className="text-center text-gray-800">Admin Login</Title>
        <Text type="secondary" className="block text-center mb-4">Sign in to access your dashboard</Text>

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
          className="bg-purple-700 hover:bg-purple-900 transition-colors duration-300"
        >
          {isLoading ? <Spin /> : "Log In"}
        </Button>
      </Card>
    </div>
  );
};

export default AdminLogin;
