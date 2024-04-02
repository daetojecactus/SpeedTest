import { useState } from "react";
import { fetchResources } from "../http/resourcesAPI";
import { Resource } from "../Components/ResourcesInfo/ResourcesInfo";

export default function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);

  const fetchResourcesList = async (url: string) => {
    try {
      const data = await fetchResources(url);

      if (data && data.resources) {
        setResources(data.resources);
      } else {
        console.log("Список ресурсов не получен");
      }
    } catch (error) {
      console.error("Произошла ошибка при получении списка ресурсов:", error);
    }
  };

  return { resources, fetchResourcesList };
}
