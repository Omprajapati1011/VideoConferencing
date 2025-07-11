import axios from "axios";
import { createContext} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";

// Create the context
export const AuthContext = createContext({});

// Axios client with correct base URL
const client = axios.create({
  baseURL: "http://localhost:3000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/registerUser", {
        name,
        username,
        password,
      });

      if (response.status === httpStatus.CREATED) {
        return response.data.message;
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      if (response.status === httpStatus.OK) {
        localStorage.setItem("token", response.data.token);
        setUserData(response.data.user || {}); 
        router("/home"); 
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      throw err;
    }
  };

  const data = {
    userData,
    setUserData,
    handleRegister,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
};
