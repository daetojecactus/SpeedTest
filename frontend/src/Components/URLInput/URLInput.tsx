import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

export default function URLInput({ onUrlSubmit }: UrlInputProps) {
  const [url, setUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlSubmit(url);
  };

  return (
    <div className="url-input">
      <form action="" className="url-input__form" onSubmit={handleSubmit}>
        <Space.Compact className="url-input__box">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://pagespeed.kz/"
            className="url-input__input"
          />
          <Button className="url-input__btn" type="primary" htmlType="submit">
            TEST
          </Button>
        </Space.Compact>
      </form>
    </div>
  );
}
