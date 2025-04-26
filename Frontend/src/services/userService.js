// src/services/apiService.js
// Import axios instance

import { axiosInstance } from "../config/axios";

export const signupApi = async (data) => {
    try {
        const response = await axiosInstance.post("/signup", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginApi = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data);
      console.log(response.data, 'from service');
      return response.data;
    } catch (error) {
      // Throw a proper error object so unwrap() can catch the correct message
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  export const verifyAuth = async () => {
    const response = await axiosInstance.get("/verify");
    return response.data; // Should be { user: {...} }
  };