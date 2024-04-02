import { useState } from "react";
import { fullLoadTime } from "../http/fullLoadTimeAPI";

export default function useFullLoadTime() {
  // Состояние времени загрузки
  const [fullLoadingTime, setFullLoadingTime] = useState<number | null>(null);

  // Функция для отправки URL на сервер для измерения времени загрузки
  const loadFullSiteTime = async (url: string) => {
    try {
      // Выполняем запрос на сервер для измерения времени загрузки по указанному URL
      const response = await fullLoadTime(url);

      // Проверяем формат ответа сервера и обновляем состояние времени загрузки
      if (response && typeof response.time === "number") {
        setFullLoadingTime(response.time);
      } else {
        console.error("Ошибка: Неверный формат ответа сервера");
      }
    } catch (error) {
      console.error("Произошла ошибка при измерении времени загрузки:", error);
    }
  };

  // Возвращаем состояние времени загрузки и функцию для отправки URL на сервер
  return { fullLoadingTime, loadFullSiteTime };
}
