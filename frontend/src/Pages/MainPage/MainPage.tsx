import React, { useState } from "react";
import URLInput from "../../Components/URLInput/URLInput";
import { sendWebSiteUrl } from "../../http/webSiteAPI";

const MainPage: React.FC = () => {
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  //Отправляем на бэк наш урл
  const handleSubmitUrl = async (url: string) => {
    console.log("Отправляем URL на сервер:", url);

    try {
      const response = await sendWebSiteUrl(url);
      console.log("Ответ от сервера:", response);

      if (response && typeof response.time === "number") {
        setLoadingTime(response.time);
      } else {
        console.error("Ошибка: Неверный формат ответа сервера");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  };

  return (
    <div className="main">
      <h1 className="main__title">SPEEDTEST</h1>
      <URLInput onUrlSubmit={handleSubmitUrl} />
      {loadingTime !== null && <p>Время загрузки сайта: {loadingTime} мс</p>}
    </div>
  );
};

export default MainPage;
