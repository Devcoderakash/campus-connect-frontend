import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5002/api", // using shared backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_cc_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_cc_token");
      localStorage.removeItem("admin_cc_user");
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);
