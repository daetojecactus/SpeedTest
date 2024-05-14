import { useState } from 'react';
import { fetchCMSInfo } from '../http/whatCmsAPI';

// Хук для получения информации о CMS по URL
export default function useCMSInfo() {
  // Состояние для хранения информации о CMS
  const [cms, setCMS] = useState<string | null>(null);

  // Функция для отправки запроса на сервер для получения информации о CMS
  const fetchCMS = async (url: string) => {
    try {
      // Выполняем запрос на сервер для получения информации о CMS по указанному URL
      const response = await fetchCMSInfo(url);

      // Проверяем наличие информации о CMS в ответе и обновляем состояние
      if (response && response.cms) {
        setCMS(response.cms);
      } else {
        console.log('Сайт не использует известные CMS');
      }
    } catch (error) {
      console.error('Произошла ошибка при получении информации о CMS:', error);
    }
  };

  // Возвращаем состояние информации о CMS и функцию для запроса на сервер
  return { cms, fetchCMS };
}
