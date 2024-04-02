import { useState } from "react";
import { resourceErrors } from "../http/resourceErrorsAPI";
import { Error } from "../Components/ResourceErrorsInfo/ResourceErrorsInfo";

// Хук для получения списка ошибок при загрузке ресурсов
export default function useResourceErrors() {
  // Состояние для хранения списка ошибок
  const [errors, setErrors] = useState<Error[]>([]);

  // Функция для загрузки списка ошибок
  const fetchResourceErrors = async (url: string) => {
    try {
      // Отправляем запрос на сервер для получения списка ошибок
      const data = await resourceErrors(url);

      // Если список ошибок получен успешно, обновляем состояние
      if (data && data.errors) {
        setErrors(data.errors);
      } else {
        // Если список ошибок не получен, выводим сообщение об ошибке в консоль
        console.log("Ошибка: список ошибок не получен");
      }
    } catch (error) {
      // В случае ошибки при получении списка ошибок выводим сообщение в консоль
      console.error("Произошла ошибка при получении списка ошибок:", error);
    }
  };

  // Возвращаем список ошибок и функцию для их получения
  return { errors, fetchResourceErrors };
}
