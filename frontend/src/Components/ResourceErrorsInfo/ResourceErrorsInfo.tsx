import React from "react";
import { Collapse } from "antd";

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
  const { Panel } = Collapse;

  return (
    <div>
      {errors.length > 0 && (
        <>
                <h3>Информация о ошибках:</h3>
        <Collapse accordion>
          {errors.map((error, index) => (
            <Panel header={`Ошибка ${index + 1}`} key={index}>
              <div>
                <h4>Текст ошибки:</h4>
                <div>{error.errorText}</div>
              </div>
              <div>
                <h4>URL:</h4>
                <div>{error.url}</div>
              </div>
            </Panel>
          ))}
        </Collapse>
        </>
      )}
    </div>
  );
}
