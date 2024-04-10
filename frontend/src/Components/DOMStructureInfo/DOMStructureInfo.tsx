import React from "react";

export interface DOMStructure {
  totalElements: number;
  maxDepth: number;
  maxChildCount: number;
}

interface DOMStructureProps {
  domStructure: DOMStructure | null;
}

export default function DOMStructureInfo({ domStructure }: DOMStructureProps) {
  // Проверяем, доступна ли информация о структуре DOM
  if (!domStructure) {
    return null; // Если информация недоступна, ничего не отображаем
  }

  return (
    <div>
      <h3>Информация о структуре DOM:</h3>
      <div>Общее количество элементов: {domStructure.totalElements}</div>
      <div>Максимальная глубина вложенности: {domStructure.maxDepth}</div>
      <div>Максимальное число дочерних элементов: {domStructure.maxChildCount}</div>
    </div>
  );
}
