import { useState } from "react";
import { fetchResources } from "../http/resourcesAPI";

// Хук для получения списка ресурсов на странице по URL
export default function useResources() {
  // Состояние для хранения списка ресурсов
  const [resources, setResources] = useState<{ url: string; size: number; loadTime: number }[]>([]);

  // Функция для отправки запроса на сервер для получения списка ресурсов
  const fetchResourcesList = async (url: string) => {
    try {
      // Выполняем запрос на сервер для получения списка ресурсов по указанному URL
      const data = await fetchResources(url);

      // Проверяем наличие списка ресурсов в ответе и обновляем состояние
      if (data && data.resources) {
        setResources(data.resources);
      } else {
        console.log("Список ресурсов не получен");
      }
    } catch (error) {
      console.error("Произошла ошибка при получении списка ресурсов:", error);
    }
  };

  // Возвращаем состояние списка ресурсов и функцию для запроса на сервер
  return { resources, fetchResourcesList };
}
