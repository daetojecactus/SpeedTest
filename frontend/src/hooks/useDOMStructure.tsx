import { useState } from "react";
import { domStructure } from "../http/domStructureAPI";
import { DOMInfo } from "../Components/DOMStructureInfo/DOMStructureInfo";

// Хук для получения информации о DOM
export default function useDOMStructure() {
  // Состояние для хранения информации
  const [domInfo, setDOMInfo] = useState<DOMInfo | null>(null);

  const fetchDOMInfo = async (url: string) => {
    try {
      // Отправляем запрос на сервер для информации о DOM
      const data = await domStructure(url);
      if (data) {
        setDOMInfo(data.domInfo);
      } else {
        console.log("Ошибка: информация о структуре DOM не получена");
      }
    } catch (error) {
      console.error(
        "Произошла ошибка при получении информации о структуре DOM:",
        error
      );
    }
  };

  return { domInfo, fetchDOMInfo };
}
