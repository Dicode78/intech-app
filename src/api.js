import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const login = async (username, password) => {
  try {
    console.log("Sending login request:", { username, password });
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token); // Stocker le token
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed" };
  }
};

export const getHomePage = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false, message: "No token found" };
  }

  try {
    const res = await axios.get("http://localhost:5001/api/auth/homepage", {
      headers: { "x-auth-token": token },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching home page:", error);
    return { success: false, message: "Failed to fetch home page" };
  }
};
