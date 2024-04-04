import useCMSInfo from "./useCMSInfo";
import useFirstLoadTime from "./useFirstLoadingTime";
import useResources from "./useResources";
import useFullLoadTime from "./useFullLoadingTime";
import useResourceErrors from "./useResourceErrors";
import useDOMStructure from "./useDOMStructure";

// Хук для получения всей аналитики о загрузке страницы
export default function useAllAnalytics() {
  // Используем созданные хуки для получения информации
  const { cms, fetchCMS } = useCMSInfo();
  const { firstLoadingTime, loadFirstSiteTime } = useFirstLoadTime();
  const { resources, fetchResourcesList } = useResources();
  const { fullLoadingTime, loadFullSiteTime } = useFullLoadTime();
  const { errors, fetchResourceErrors } = useResourceErrors();
  const { domInfo, fetchDOMInfo } = useDOMStructure();

  // Функция для обработки отправки URL на сервер
  const handleSubmitUrl = async (url: string) => {
    try {
      // Измеряем время первого ответа
      await loadFirstSiteTime(url);

      // Получаем информацию о CMS
      await fetchCMS(url);

      // Получаем список ресурсов
      await fetchResourcesList(url);

      // Получаем время загрузки
      await loadFullSiteTime(url);

      // Получаем ошибки при загрузке ресурсов
      await fetchResourceErrors(url);

      // Получаем информацию о структуре DOM
      await fetchDOMInfo(url);
    } catch (error) {
      console.error("Произошла ошибка при анализе сайта:", error);
    }
  };

  // Возвращаем состояния и функцию для отправки URL
  return {
    firstLoadingTime,
    cms,
    resources,
    fullLoadingTime,
    errors,
    domInfo,
    handleSubmitUrl,
  };
}
