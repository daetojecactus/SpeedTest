import React from "react";

export interface DOMInfo {
  totalElements: number;
  maxDepth: number;
  maxChildren: number;
}

interface DOMInfoProps {
  domInfo: DOMInfo | null;
}

export default function DOMStructureInfo({ domInfo }: DOMInfoProps) {
  // Проверяем, доступна ли информация о структуре DOM
  if (!domInfo) {
    return null; // Если информация недоступна, ничего не отображаем
  }

  return (
    <div>
      <h3>Информация о структуре DOM:</h3>
      <div>Общее количество элементов: {domInfo.totalElements}</div>
      <div>Максимальная глубина вложенности: {domInfo.maxDepth}</div>
      <div>Максимальное число дочерних элементов: {domInfo.maxChildren}</div>
    </div>
  );
}
