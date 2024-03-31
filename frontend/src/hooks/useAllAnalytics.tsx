import useCMSInfo from "./useCMSInfo";
import useLoadTime from "./useLoadingTime";
import useResources from "./useResources";

export default function useAllAnalytics() {
  // Используем ранее созданные хуки для получения информации
  const { cms, fetchCMS } = useCMSInfo();
  const { loadingTime, loadWebsiteTime } = useLoadTime();
  const { resources, fetchResourcesList } = useResources();

  // Функция для обработки отправки URL на сервер
  const handleSubmitUrl = async (url: string) => {
    try {
      // Измеряем время загрузки сайта
      await loadWebsiteTime(url);

      // Получаем информацию о CMS
      await fetchCMS(url);

      // Получаем список ресурсов
      await fetchResourcesList(url);
    } catch (error) {
      console.error("Произошла ошибка при анализе сайта:", error);
    }
  };

  // Возвращаем состояния
  return { loadingTime, cms, resources, handleSubmitUrl };
}
