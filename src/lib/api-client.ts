import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach Auth Token and metadata
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors & Token Expiry
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Đã có lỗi xảy ra trong quá trình xử lý yêu cầu.";

    if (status === 401) {
      localStorage.removeItem("auth_token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(new Error(errorMessage));
  }
);
