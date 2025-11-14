// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://cruiseapi.pendeet.com/api/v2", // your backend URL
  withCredentials: true, // allow cookies for session
});

// Auto attach access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
