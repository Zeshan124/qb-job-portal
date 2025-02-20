// lib/session.ts

import { authenticate } from "../utils/action";



export const getSession = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !token) {
      return null;
    }

    // Optionally, you can verify the token on the server side here
    const response = await authenticate({ username: user.username, password: user.password });

    if (response) {
      return { user, token };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};
