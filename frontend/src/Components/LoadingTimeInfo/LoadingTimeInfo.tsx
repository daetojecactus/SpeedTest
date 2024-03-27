import React from "react";

interface LoadingTimeInfoProps {
  loadingTime: number | null;
}

export default function LoadingTimeInfo({ loadingTime }: LoadingTimeInfoProps) {
  return (
    <div>
      {loadingTime !== null && <p>Время загрузки сайта: {loadingTime} мс</p>}
    </div>
  );
}
