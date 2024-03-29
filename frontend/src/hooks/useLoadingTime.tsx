// frontend/src/hooks/useLoadTime.ts
import { useState } from "react";
import { loadTime } from "../http/loadTimeAPI";

export default function useLoadTime() {
  // Состояние времени загрузки
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  // Функция для отправки URL на сервер для измерения времени загрузки
  const loadWebsiteTime = async (url: string) => {
    try {
      // Выполняем запрос на сервер для измерения времени загрузки по указанному URL
      const response = await loadTime(url);

      // Проверяем формат ответа сервера и обновляем состояние времени загрузки
      if (response && typeof response.time === "number") {
        setLoadingTime(response.time);
      } else {
        console.error("Ошибка: Неверный формат ответа сервера");
      }
    } catch (error) {
      console.error("Произошла ошибка при измерении времени загрузки:", error);
    }
  };

  // Возвращаем состояние времени загрузки и функцию для отправки URL на сервер
  return { loadingTime, loadWebsiteTime };
}
