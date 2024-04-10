import { useState } from "react";
import { domStructureInfo } from "../http/domStructureAPI";
import { DOMStructure } from "../Components/DOMStructureInfo/DOMStructureInfo";

// Хук для получения информации о DOM
export default function useDOMStructure() {
  // Состояние для хранения информации
  const [domStructure, setDomStructure] = useState<DOMStructure | null>(null);

  const fetchDOMStructure = async (url: string) => {
    try {
      // Отправляем запрос на сервер для информации о DOM
      const data = await domStructureInfo(url);
      if (data) {
        setDomStructure(data.domStructure);
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

  return { domStructure, fetchDOMStructure };
}
