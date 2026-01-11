import axios, { type AxiosError, type AxiosInstance } from "axios";

// URL бэкенд API из переменных окружения
// В production (Netlify) всегда используется относительный путь /api/v1 для прокси
// В development используется полный URL или значение из .env
// ВАЖНО: В production переменная VITE_API_URL игнорируется, используется прокси
const API_URL = import.meta.env.PROD
  ? "/api/v1"
  : import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { detail?: string })?.detail ||
      error.message ||
      "An error occurred";

    console.error("API Error:", message);

    return Promise.reject(error);
  }
);
