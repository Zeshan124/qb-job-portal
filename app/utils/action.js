"use client";

import axios from "axios";

class AuthError extends Error {
  constructor(type) {
    super(type);
    this.name = "AuthError";
    this.type = type;
  }
}

export async function authenticate(data) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    console.log("API URL:", apiUrl);

    const response = await axios.post(`${apiUrl}/apis/user/login`, {
      username: data.username,
      password: data.password,
    });

    if (response.status === 200) {
      const userData = response.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return userData;
    } else {
      throw new AuthError("CredentialsSignin");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new AuthError("CredentialsSignin");
    } else {
      console.error("Authentication error:", error);
      throw error;
    }
  }
}
