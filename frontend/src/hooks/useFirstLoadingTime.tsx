import { useState } from "react";
import { firstLoadTime } from "../http/firstLoadTimeAPI";

export default function useFirstLoadTime() {
  // Состояние времени
  const [firstLoadingTime, setFirstLoadingTime] = useState<number | null>(null);

  // Функция для отправки URL на сервер для измерения времени певрого ответа
  const loadFirstSiteTime = async (url: string) => {
    try {
      // Выполняем запрос на сервер для измерения времени загрузки по указанному URL
      const response = await firstLoadTime(url);

      // Проверяем формат ответа сервера и обновляем состояние времени загрузки
      if (response && typeof response.time === "number") {
        setFirstLoadingTime(response.time);
      } else {
        console.error("Ошибка: Неверный формат ответа сервера");
      }
    } catch (error) {
      console.error("Произошла ошибка при измерении времени загрузки:", error);
    }
  };

  // Возвращаем состояние времени загрузки и функцию для отправки URL на сервер
  return { firstLoadingTime, loadFirstSiteTime };
}
