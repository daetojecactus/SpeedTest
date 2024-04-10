import React from "react";
import URLInput from "../../Components/URLInput/URLInput";
import CMSInfo from "../../Components/CMSInfo/CMSInfo";
import FirstLoadingTimeInfo from "../../Components/FirstLoadingTimeInfo/FirstLoadingTimeInfo";
import useAllAnalytics from "../../hooks/useAllAnalytics";
import ResourcesInfo from "../../Components/ResourcesInfo/ResourcesInfo";
import FullLoadingTimeInfo from "../../Components/FullLoadingTimeInfo/FullLoadingTimeInfo";
import ResourceErrorsInfo from "../../Components/ResourceErrorsInfo/ResourceErrorsInfo";
import DOMStructureInfo from "../../Components/DOMStructureInfo/DOMStructureInfo";

export default function MainPage() {
  const {
    firstLoadingTime,
    cms,
    resources,
    fullLoadingTime,
    errors,
    domStructure,
    handleSubmitUrl,
  } = useAllAnalytics();

  return (
    <div className="main">
      <h1 className="main__title">SPEEDTEST</h1>
      <URLInput onUrlSubmit={handleSubmitUrl} />
      <FirstLoadingTimeInfo firstLoadingTime={firstLoadingTime} />
      <CMSInfo cms={cms} />
      <ResourcesInfo resources={resources} />
      <FullLoadingTimeInfo fullLoadingTime={fullLoadingTime} />
      <ResourceErrorsInfo errors={errors} />
      <DOMStructureInfo domStructure={domStructure} />
    </div>
  );
}
