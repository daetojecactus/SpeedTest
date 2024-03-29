import { useState } from "react";
import { fetchCMSInfo } from "../http/whatCmsAPI";
import { loadTime } from "../http/loadTimeAPI";

export default function useAllAnalytics() {
  // Состояние времени загрузки
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  // Состояние информации о CMS
  const [cms, setCMS] = useState<string | null>(null);

  // Функция для отправки URL на сервер для измерения времени загрузки
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

      // Выполняем запрос на сервер для получения информации о CMS по указанному URL
      const cmsResponse = await fetchCMSInfo(url);

      // Проверяем наличие информации о CMS в ответе и обновляем состояние
      if (cmsResponse && cmsResponse.cms) {
        setCMS(cmsResponse.cms);
      } else {
        console.log("Сайт не использует известные CMS");
      }
    } catch (error) {
      console.error("Произошла ошибка при анализе сайта:", error);
    }
  };

  // Возвращаем состояния времени загрузки и CMS, а также функцию для отправки URL на сервер
  return { loadingTime, cms, handleSubmitUrl };
}
