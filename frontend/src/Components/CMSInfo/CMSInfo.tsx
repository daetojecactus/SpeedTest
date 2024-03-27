import React from "react";

interface CMSInfoProps {
  cms: string | null;
}

export default function CMSInfo({ cms }: CMSInfoProps) {
  return <div>{cms && <p>Сайт использует: {cms}</p>}</div>;
}
