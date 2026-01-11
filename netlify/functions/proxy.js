// URL бэкенд API из переменных окружения
// Используется та же переменная VITE_API_URL, что и в клиентском коде
// Установите VITE_API_URL в Netlify Dashboard → Site settings → Environment variables
const BACKEND_URL = process.env.VITE_API_URL || "http://localhost:8000";

exports.handler = async (event, context) => {
  // Логирование для отладки - это поможет увидеть, вызывается ли функция
  console.log("=== PROXY FUNCTION CALLED ===");
  console.log("Path:", event.path);
  console.log("Method:", event.httpMethod);
  console.log("Headers:", JSON.stringify(event.headers, null, 2));
  console.log("Query params:", JSON.stringify(event.queryStringParameters, null, 2));
  console.log("Raw query string:", event.rawQuery);
  console.log("=============================");

  // Обработка CORS preflight запросов
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: "",
    };
  }

  // Получаем оригинальный путь из заголовка, который Netlify добавляет при redirect
  // Или извлекаем из event.path
  let apiPath = "";

  // Проверяем все возможные источники пути
  const originalPath = 
    event.headers["x-original-path"] ||
    event.headers["x-netlify-original-path"] ||
    event.headers["x-forwarded-uri"] ||
    "";

  console.log("Original path from headers:", originalPath);
  console.log("Event path:", event.path);
  console.log("Query params:", event.queryStringParameters);

  // Если есть оригинальный путь в заголовке, используем его
  if (originalPath) {
    // Убираем префикс /api/v1 если есть
    apiPath = originalPath.replace(/^\/api\/v1/, "");
  } else if (event.path) {
    // Извлекаем из event.path - убираем префиксы
    apiPath = event.path
      .replace(/^\/\.netlify\/functions\/proxy/, "")
      .replace(/^\/api\/v1/, "")
      .replace(/^\/api/, "");
  }

  // Также проверяем query параметры
  if (!apiPath && event.queryStringParameters?.path) {
    apiPath = event.queryStringParameters.path;
  }

  // Если путь начинается с /api/v1, убираем этот префикс
  if (apiPath && apiPath.startsWith("/api/v1")) {
    apiPath = apiPath.replace(/^\/api\/v1/, "");
  }

  // Если путь пустой, используем корневой путь
  if (!apiPath || apiPath === "/") {
    apiPath = "";
  } else if (!apiPath.startsWith("/")) {
    // Добавляем / в начало, если его нет
    apiPath = `/${apiPath}`;
  }

  // Формируем URL для бэкенда
  // Добавляем /api/v1 к пути, так как бэкенд ожидает этот префикс
  const backendPath = `/api/v1${apiPath}`;
  const backendUrl = `${BACKEND_URL}${backendPath}`;

  console.log("Proxying to:", backendUrl);

  // Получаем параметры запроса (исключая path)
  const queryParams = {};
  if (event.queryStringParameters) {
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      if (key !== "path" && value) {
        queryParams[key] = value;
      }
    }
  }

  const queryString =
    Object.keys(queryParams).length > 0
      ? new URLSearchParams(queryParams).toString()
      : "";
  const fullUrl = queryString ? `${backendUrl}?${queryString}` : backendUrl;

  try {
    // Проксируем запрос на бэкенд
    const response = await fetch(fullUrl, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
        // Пробрасываем заголовки из оригинального запроса
        ...(event.headers["authorization"] && {
          Authorization: event.headers["authorization"],
        }),
      },
      body: event.body ? event.body : undefined,
    });

    const data = await response.text();
    let jsonData;

    try {
      jsonData = JSON.parse(data);
    } catch {
      jsonData = data;
    }

    const headers = {
      "Content-Type":
        response.headers.get("content-type") || "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    };

    console.log("Response status:", response.status);

    return {
      statusCode: response.status,
      headers,
      body: typeof jsonData === "string" ? jsonData : JSON.stringify(jsonData),
    };
  } catch (error) {
    console.error("Proxy error:", error);
    const errorHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    return {
      statusCode: 500,
      headers: errorHeaders,
      body: JSON.stringify({
        error: "Proxy error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
