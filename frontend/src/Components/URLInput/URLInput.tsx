import React, { useState } from "react";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

const URLInput: React.FC<UrlInputProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUrlSubmit(url);
  };

  return (
    <div className="url-input">
      <form action="" className="url-input" onSubmit={handleSubmit}>
        <input
          type="text"
          className="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
              <button className="url-input" type="submit">TEST</button>
      </form>
    </div>
  );
};

export default URLInput;
