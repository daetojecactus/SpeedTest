// frontend/src/pages/MainPage.tsx
import React from "react";
import URLInput from "../../Components/URLInput/URLInput";
import CMSInfo from "../../Components/CMSInfo/CMSInfo";
import LoadingTimeInfo from "../../Components/LoadingTimeInfo/LoadingTimeInfo";
import useCMSInfo from "../../hooks/useCMSInfo";
import useLoadingTime from "../../hooks/useLoadingTime";

export default function MainPage() {
  const { loadingTime, handleSubmitUrl } = useLoadingTime();
  const { cms } = useCMSInfo();

  return (
    <div className="main">
      <h1 className="main__title">SPEEDTEST</h1>
      <URLInput onUrlSubmit={handleSubmitUrl} />
      <LoadingTimeInfo loadingTime={loadingTime} />
      <CMSInfo cms={cms} />
    </div>
  );
}
