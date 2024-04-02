import React from "react";

interface FullLoadingTimeInfoProps {
  fullLoadingTime: number | null;
}

export default function FullLoadingTimeInfo({ fullLoadingTime }: FullLoadingTimeInfoProps) {
  return (
    <div>
      {fullLoadingTime !== null && <p>Время загрузки сайта: {fullLoadingTime} мс</p>}
    </div>
  );
}
