import React from "react";
import URLInput from "../../Components/URLInput/URLInput";
import CMSInfo from "../../Components/CMSInfo/CMSInfo";
import LoadingTimeInfo from "../../Components/LoadingTimeInfo/LoadingTimeInfo";
import useAllAnalytics from "../../hooks/useAllAnalytics";
import ResourcesInfo from "../../Components/ResourcesInfo/ResourcesInfo";

export default function MainPage() {
  const { loadingTime, cms, resources, handleSubmitUrl } = useAllAnalytics();

  return (
    <div className="main">
      <h1 className="main__title">SPEEDTEST</h1>
      <URLInput onUrlSubmit={handleSubmitUrl} />
      <LoadingTimeInfo loadingTime={loadingTime} />
      <CMSInfo cms={cms} />
      <ResourcesInfo resources={resources} />
    </div>
  );
}
