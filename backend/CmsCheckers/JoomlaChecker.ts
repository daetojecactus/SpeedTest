import { loadAndParseHTML } from "../utils/parseHTML";
import { runPuppeteer } from "../utils/runPuppeteer";

// Проверка наличия метатега Joomla
export async function checkJoomla(url: string): Promise<boolean> {
  try {
    const $ = await loadAndParseHTML(url);

    // Проверка метатега Joomla
    const hasJoomlaMeta =
      $('meta[name="generator"][content*="Joomla"]').length > 0;

    if (hasJoomlaMeta) {
      return true;
    }
    //Получаем список ресурсов и весь js код с комментариями
    const { resources, jsCodeWithComments } = await runPuppeteer(url);

    // ключевые слова или шаблоны для Joomla в js
    const joomlaKeywords = [
      "JFactory",
      "JRoute",
      "JHtml",
      "Joomla",
      "JUri",
      "JLoader",
      "JDispatcher",
      "JInput",
      "JAccess",
      "JUser",
      "JLanguage",
      "JModel",
      "JController",
      "JView",
      "JDocument",
      "JSite",
      "JTable",
      "JDatabase",
      "JForm",
      "JInstaller",
      "JUpdater",
      "JUpdater",
      "JInstaller",
      "JModuleHelper",
      "JPathway",
      "JURI",
      "JLog",
      "JSession",
      "JPlugin",
      "JRegistry",
      "JLayout",
      "JError",
      "JRequest",
      "JResponse",
      "JRoute",
      "JURI",
      "JRouter",
      "JHTML",
      "JObject",
      "JEventDispatcher",
      "JContentHelper",
    ];

    // Проверяем JavaScript код на наличие ключевых слов Joomla
    const isJoomlaUsed = joomlaKeywords.some((keyword) =>
      jsCodeWithComments.includes(keyword)
    );
    if (isJoomlaUsed) {
      return true;
    }

    // Если метатег не найден, проверяем ресурсы на наличие путей joomla
    for (const resource of resources) {
      if (resource.name.includes("joomla")) {
        return true;
      }
    }

    return false; // Если ни метатег, ни ключевые слова, ни пути Joomla не найдены
  } catch (error) {
    console.error("Произошла ошибка при проверке наличия Joomla:", error);
    return false;
  }
}
