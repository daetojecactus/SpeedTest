import React from 'react';
import { Result } from 'antd';
interface CMSInfoProps {
  cms: string | null;
}

export default function CMSInfo({ cms }: CMSInfoProps) {
  return (
    <div>
      {cms && (
        <Result status="success" title="Сайт использует:" subTitle={cms} />
      )}
    </div>
  );
}
