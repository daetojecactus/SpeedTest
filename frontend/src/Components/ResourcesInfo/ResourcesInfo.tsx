import React from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';

export interface Resource {
  name: string;
  size: number;
  duration: number;
  type: string;
  // loadedAfterInitialLoad: boolean;
}

interface ResourcesInfoProps {
  resources: Resource[];
}

export default function ResourcesInfo({ resources }: ResourcesInfoProps) {
  // Колонки таблицы с определением свойств каждой колонки
  const columns: TableProps<Resource>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div style={{ overflowX: 'auto', maxWidth: '500px' }}>{name}</div>
      ),
    },
    {
      title: 'Size (bytes)',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => `${size}`,
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: 'Duration (ms)',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${Math.round(duration)}`, // Округляем
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getColorByType(type)}>{type.toUpperCase()}</Tag>
      ),
      filters: [
        {
          text: 'CSS',
          value: 'CSS',
        },
        {
          text: 'JavaScript',
          value: 'JavaScript',
        },
        {
          text: 'Изображение',
          value: 'Изображение',
        },
        {
          text: 'Другое',
          value: 'Другое',
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
    // {
    //   title: "Loaded After Initial Load",
    //   dataIndex: "loadedAfterInitialLoad",
    //   key: "loadedAfterInitialLoad",
    //   render: (loadedAfterInitialLoad: boolean) =>
    //     loadedAfterInitialLoad ? "After Initial Load" : "Before Initial Load",
    //   sorter: (a, b) => {
    //     // Преобразуем булевые значения в числа (false -> 0, true -> 1)
    //     const boolA = a.loadedAfterInitialLoad ? 1 : 0;
    //     const boolB = b.loadedAfterInitialLoad ? 1 : 0;

    //     // Сравниваем преобразованные значения
    //     return boolA - boolB;
    //   },
    // },
  ];

  // Функция для определения цвета Tag в зависимости от типа ресурса
  const getColorByType = (type: string): string => {
    switch (type) {
      case 'CSS':
        return 'blue';
      case 'JavaScript':
        return 'yellow';
      case 'Изображение':
        return 'green';
      case 'Шрифт':
        return 'purple';
      case 'Google Analytics':
        return 'brown';
      case 'Yandex Metrika':
        return 'orange';
      default:
        return 'red';
    }
  };

  const onChange: TableProps<Resource>['onChange'] = (
    filters,
    sorter,
    extra,
  ) => {
    console.log('params', filters, sorter, extra);
  };

  return (
    <div>
      {resources.length > 0 && (
        <>
          <h3>Список ресурсов:</h3>
          <Table
            columns={columns}
            dataSource={resources.map((item, index) => ({
              ...item,
              key: index,
            }))}
            pagination={false}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
            scroll={{ x: true }}
          />
        </>
      )}
    </div>
  );
}
