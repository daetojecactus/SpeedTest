import { loadAndParseHTML } from "../utils/parseHTML";
import { runPuppeteer } from "../utils/runPuppeteer";

// Функция для определения CMS WordPress
export async function checkWordPress(url: string): Promise<boolean> {
  try {
    const $ = await loadAndParseHTML(url);

    // Проверка метатега WordPress
    const hasWordPressMeta =
      $('meta[name="generator"][content*="WordPress"]').length > 0;

    if (hasWordPressMeta) {
      return true;
    }

    // Если метатег не найден, проверяем ресурсы на наличие путей wp-content или wp-admin
    const { resources } = await runPuppeteer(url);
    for (const resource of resources) {
      if (
        resource.name.includes("wp-content") ||
        resource.name.includes("wp-admin")
      ) {
        return true;
      }
    }

    return false; // Если ни метатег, ни пути не найдены
  } catch (error) {
    console.error("Произошла ошибка при определении CMS WordPress:", error);
    return false;
  }
}
