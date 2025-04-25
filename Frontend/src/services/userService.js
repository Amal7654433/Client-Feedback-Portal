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
