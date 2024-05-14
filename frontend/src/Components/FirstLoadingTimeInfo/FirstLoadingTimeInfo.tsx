import React from "react";
import { Card } from 'antd';

interface FirstLoadingTimeInfoProps {
  firstLoadingTime: number | null;
}

export default function FirstLoadingTimeInfo({ firstLoadingTime }: FirstLoadingTimeInfoProps) {
  return (
    <div>
      {firstLoadingTime !== null && 
      <Card title="Время первого ответа" bordered={false}>
      {firstLoadingTime} мс
      </Card>
      }
    </div>
  );
}
