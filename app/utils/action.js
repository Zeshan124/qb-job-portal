// actions.js
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
    const apiUrl = process.env.NEXT_PUBLIC_URL_API || "http://localhost:4000"; // Fallback if not defined

    console.log("API URL:", apiUrl); // Check what API URL is being used

    const response = await axios.post(`${apiUrl}/apis/user/login`, {
      username: data.username,
      password: data.password,
    });

    if (response.status === 200) {
      const userData = response.data;

      // Ensure localStorage is only used in the client side
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
      console.error("Authentication error:", error); // Log error for easier debugging
      throw error;
    }
  }
}
