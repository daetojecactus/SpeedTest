import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

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
    return null; // Если информации нет, ничего не отображаем
  }

  const items: DescriptionsProps['items'] = [
    {
      label: 'Общее количество элементов',
      children: domStructure.totalElements.toString(),
    },
    {
      label: 'Максимальная глубина вложенности',
      children: domStructure.maxDepth.toString(),
    },
    {
      label: 'Максимальное число дочерних элементов',
      children: domStructure.maxChildCount.toString(),
    },
  ];

  return (
    <div>
      <h3>Информация о структуре DOM:</h3>
      <Descriptions bordered column={1}>
        {items.map((item, index) => (
          <Descriptions.Item key={index.toString()} label={item.label}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
}
