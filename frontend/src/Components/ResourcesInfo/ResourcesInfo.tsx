import React from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";

export interface Resource {
  name: string;
  size: number;
  duration: number;
  type: string;
}

interface ResourcesInfoProps {
  resources: Resource[];
}

export default function ResourcesInfo({ resources }: ResourcesInfoProps) {
  // Колонки таблицы с определением свойств каждой колонки
  const columns: TableProps<Resource>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Size (bytes)",
      dataIndex: "size",
      key: "size",
      render: (size: number) => `${size} bytes`,
      sorter: (a, b) => a.size - b.size,
    },
    {
      title: "Duration (ms)",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => `${Math.round(duration)} ms`, // Округляем
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={getColorByType(type)}>{type.toUpperCase()}</Tag>
      ),
      filters: [
        {
          text: "CSS",
          value: "CSS",
        },
        {
          text: "JavaScript",
          value: "JavaScript",
        },
        {
          text: "Изображение",
          value: "Изображение",
        },
        {
          text: "Другое",
          value: "Другое",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value as string) === 0,
    },
  ];

  // Функция для определения цвета Tag в зависимости от типа ресурса
  const getColorByType = (type: string): string => {
    switch (type) {
      case "CSS":
        return "blue";
      case "JavaScript":
        return "yellow";
      case "Изображение":
        return "green";
      default:
        return "red";
    }
  };

  const onChange: TableProps<Resource>["onChange"] = (
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, sorter, extra);
  };

  return (
    <div>
      {resources.length > 0 && (
        <Table
          columns={columns}
          dataSource={resources}
          pagination={false}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      )}
    </div>
  );
}
