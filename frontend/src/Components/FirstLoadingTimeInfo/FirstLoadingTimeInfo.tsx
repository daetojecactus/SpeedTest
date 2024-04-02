import React from "react";

interface FirstLoadingTimeInfoProps {
  firstLoadingTime: number | null;
}

export default function FirstLoadingTimeInfo({ firstLoadingTime }: FirstLoadingTimeInfoProps) {
  return (
    <div>
      {firstLoadingTime !== null && <p>Время первого ответа: {firstLoadingTime} мс</p>}
    </div>
  );
}
