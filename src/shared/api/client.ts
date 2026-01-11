import axios, { type AxiosError, type AxiosInstance } from "axios";

// URL бэкенд API из переменных окружения
// ВАЖНО: Установите VITE_API_URL в Netlify Dashboard → Site settings → Environment variables
// Например: VITE_API_URL=https://your-backend-url.com/api/v1
// В development используется значение из .env или http://localhost:8000
const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
// Убираем trailing slash если есть
const API_URL = RAW_API_URL.replace(/\/+$/, "");

// Debug: выводим URL при инициализации
console.log("[API Client] API_URL:", API_URL);
console.log("[API Client] VITE_API_URL env:", import.meta.env.VITE_API_URL);

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
