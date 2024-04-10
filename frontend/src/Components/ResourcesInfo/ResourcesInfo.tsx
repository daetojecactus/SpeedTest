import React from "react";

 export interface Resource {
  name: string;
  size: number;
  duration: number;
  type: string
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
                <div>URL: {resource.name}</div>
                <div>Время загрузки: {Math.round(resource.duration)} мс</div>
                <div>Размер: {resource.size} байт</div>
                <div>Тип: {resource.type}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
