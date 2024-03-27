import { useState } from "react";
import { loadTime } from "../http/loadTimeAPI";

// Хук для управления состоянием времени загрузки и отправки URL на сервер для измерения времени загрузки
export default function useLoadingTime() {
  // Состояние времени загрузки
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  // Функция для отправки URL на сервер
  const handleSubmitUrl = async (url: string) => {
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
      console.error("Произошла ошибка:", error);
    }
  };

  // Возвращаем состояние времени загрузки и функцию для отправки URL на сервер
  return { loadingTime, handleSubmitUrl };
}
