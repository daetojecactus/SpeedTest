import React from "react";

interface Resource {
  url: string;
  size: number;
  loadTime: number;
}

interface ResourcesInfoProps {
  resources: Resource[];
}

export default function ResourcesInfo({ resources }: ResourcesInfoProps) {
  return (
    <div>
      {resources.length > 0 && (
        <div>
          <h3>Список ресурсов:</h3>
          <ul>
            {resources.map((resource, index) => (
              <li key={index}>
                <div>URL: {resource.url}</div>
                <div>Время загрузки: {resource.loadTime} мс</div>
                <div>Размер: {resource.size} байт</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
