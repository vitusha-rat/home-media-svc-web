import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Определяем base path для GitHub Pages
// Если репозиторий называется 'home-media-service', то base будет '/home-media-service/'
// Если это пользовательский сайт (username.github.io), то base будет '/'
const getBasePath = () => {
  // Для GitHub Pages через переменную окружения
  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH;
  }
  // По умолчанию для локальной разработки
  return "/";
};

export default defineConfig({
  base: getBasePath(),
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
