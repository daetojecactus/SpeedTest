import React from 'react';
import { Alert } from 'antd';

interface FullLoadingTimeInfoProps {
  fullLoadingTime: number | null;
}

export default function FullLoadingTimeInfo({
  fullLoadingTime,
}: FullLoadingTimeInfoProps) {
  return (
    <div>
      {fullLoadingTime !== null && (
        <Alert
          message="Время загрузки сайта:"
          description={`${fullLoadingTime} мс`}
          type="info"
          showIcon
        />
      )}
    </div>
  );
}
