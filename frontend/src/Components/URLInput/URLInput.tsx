import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import "./URLInput.scss";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

export default function URLInput({ onUrlSubmit }: UrlInputProps) {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlSubmit(url);
  };

  return (
    <div className="url-input">
      <form action="" className="url-input" onSubmit={handleSubmit}>
        <Space.Compact style={{ width: "100%" }}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://pagespeed.kz/"
          />
          <Button className="url-btn" type="primary" htmlType="submit">
            TEST
          </Button>
        </Space.Compact>
      </form>
    </div>
  );
}
