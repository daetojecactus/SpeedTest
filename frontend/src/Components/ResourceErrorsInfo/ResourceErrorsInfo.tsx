import React from "react";

export interface Error {
  errorText: string;
  url: string;
}

interface ResourceErrorsInfoProps {
  errors: Error[];
}

export default function ResourceErrorsInfo({
  errors,
}: ResourceErrorsInfoProps) {
  return (
    <div>
      {errors.length > 0 && (
        <div>
          <h3>Список ресурсов:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                <h4>Ошибка:</h4>
                <div>{error.errorText}</div>
                <div>{error.url}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
