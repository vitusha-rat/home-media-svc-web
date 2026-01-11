import { useState, useEffect, type FC, type ReactNode, useCallback } from "react";

// URL бэкенда для проверки сертификата
// Убираем trailing slash если есть
const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_URL = RAW_API_URL.replace(/\/+$/, "");

// Debug: выводим URL при инициализации
console.log("[CertificateCheck] API_URL:", API_URL);
console.log("[CertificateCheck] VITE_API_URL env:", import.meta.env.VITE_API_URL);

// Ключ для localStorage
const CERTIFICATE_TRUSTED_KEY = "api_certificate_trusted";

interface CertificateCheckProviderProps {
  children: ReactNode;
}

export const CertificateCheckProvider: FC<CertificateCheckProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState<"checking" | "trusted" | "untrusted">(
    "checking"
  );

  const checkApiAccess = useCallback(async () => {
    // Если уже доверяли ранее, проверяем ещё раз на всякий случай
    const wasTrusted = localStorage.getItem(CERTIFICATE_TRUSTED_KEY) === "true";

    try {
      // Пробуем сделать простой запрос к API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${API_URL}/health`, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok || response.status === 404) {
        // Даже 404 означает, что сервер доступен и сертификат принят
        localStorage.setItem(CERTIFICATE_TRUSTED_KEY, "true");
        setStatus("trusted");
      } else {
        throw new Error("API not accessible");
      }
    } catch {
      // Если ранее доверяли, возможно сервер просто недоступен
      // Даём шанс продолжить работу
      if (wasTrusted) {
        setStatus("trusted");
      } else {
        setStatus("untrusted");
      }
    }
  }, []);

  useEffect(() => {
    checkApiAccess();
  }, [checkApiAccess]);

  const handleOpenServer = () => {
    // Открываем сервер в новой вкладке
    window.open(API_URL, "_blank");
  };

  const handleRetry = () => {
    setStatus("checking");
    checkApiAccess();
  };

  // Показываем загрузку пока проверяем
  if (status === "checking") {
    return (
      <div className="certificate-check">
        <div className="certificate-check__content">
          <div className="certificate-check__spinner" />
          <p className="certificate-check__text">Проверка подключения к серверу...</p>
        </div>

        <style>{`
          .certificate-check {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
            padding: 1rem;
          }

          .certificate-check__content {
            text-align: center;
            color: #e2e8f0;
          }

          .certificate-check__spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(99, 102, 241, 0.2);
            border-top-color: #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .certificate-check__text {
            font-size: 1.125rem;
            opacity: 0.9;
          }
        `}</style>
      </div>
    );
  }

  // Показываем экран доверия сертификату
  if (status === "untrusted") {
    return (
      <div className="certificate-trust">
        <div className="certificate-trust__card">
          <div className="certificate-trust__icon">🔐</div>
          
          <h1 className="certificate-trust__title">Требуется доверие сертификату</h1>
          
          <p className="certificate-trust__description">
            Для работы приложения необходимо принять SSL-сертификат сервера.
            Нажмите кнопку ниже, чтобы открыть сервер и подтвердить доверие.
          </p>

          <div className="certificate-trust__steps">
            <div className="certificate-trust__step">
              <span className="certificate-trust__step-number">1</span>
              <span>Нажмите "Открыть сервер"</span>
            </div>
            <div className="certificate-trust__step">
              <span className="certificate-trust__step-number">2</span>
              <span>В браузере нажмите "Дополнительно" или "Advanced"</span>
            </div>
            <div className="certificate-trust__step">
              <span className="certificate-trust__step-number">3</span>
              <span>Нажмите "Перейти на сайт" или "Proceed"</span>
            </div>
            <div className="certificate-trust__step">
              <span className="certificate-trust__step-number">4</span>
              <span>Вернитесь сюда и нажмите "Повторить"</span>
            </div>
          </div>

          <div className="certificate-trust__actions">
            <button
              onClick={handleOpenServer}
              className="certificate-trust__button certificate-trust__button--primary"
            >
              🌐 Открыть сервер
            </button>
            
            <button
              onClick={handleRetry}
              className="certificate-trust__button certificate-trust__button--secondary"
            >
              🔄 Повторить проверку
            </button>
          </div>

          <p className="certificate-trust__hint">
            Сервер: <code>{API_URL}</code>
          </p>
        </div>

        <style>{`
          .certificate-trust {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
            padding: 1rem;
          }

          .certificate-trust__card {
            background: rgba(30, 30, 46, 0.95);
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          }

          .certificate-trust__icon {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 1rem;
          }

          .certificate-trust__title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #f1f5f9;
            text-align: center;
            margin: 0 0 1rem;
          }

          .certificate-trust__description {
            color: #94a3b8;
            text-align: center;
            line-height: 1.6;
            margin: 0 0 1.5rem;
          }

          .certificate-trust__steps {
            background: rgba(15, 15, 23, 0.6);
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
          }

          .certificate-trust__step {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: #cbd5e1;
            padding: 0.5rem 0;
            font-size: 0.9rem;
          }

          .certificate-trust__step:not(:last-child) {
            border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          }

          .certificate-trust__step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 50%;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
            flex-shrink: 0;
          }

          .certificate-trust__actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }

          .certificate-trust__button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.875rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
          }

          .certificate-trust__button--primary {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
          }

          .certificate-trust__button--primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
          }

          .certificate-trust__button--secondary {
            background: rgba(99, 102, 241, 0.15);
            color: #a5b4fc;
            border: 1px solid rgba(99, 102, 241, 0.3);
          }

          .certificate-trust__button--secondary:hover {
            background: rgba(99, 102, 241, 0.25);
          }

          .certificate-trust__hint {
            text-align: center;
            font-size: 0.8rem;
            color: #64748b;
            margin: 0;
          }

          .certificate-trust__hint code {
            background: rgba(99, 102, 241, 0.15);
            padding: 0.2rem 0.5rem;
            border-radius: 0.25rem;
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            font-size: 0.75rem;
            color: #a5b4fc;
          }
        `}</style>
      </div>
    );
  }

  // Сертификат принят — показываем приложение
  return <>{children}</>;
};
