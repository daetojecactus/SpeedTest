import { loadAndParseHTML } from '../utils/parseHTML';
import { runPuppeteer } from '../utils/runPuppeteer';

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

    // Если метатег не найден, проверяем ресурсы на наличие путей и по js коду
    const { resources, jsCodeWithComments } = await runPuppeteer(url);

    // ключевые слова или шаблоны для WordPress в js
    const wordPressKeywords = [
      'wp-content',
      'wp-includes',
      'wp-admin',
      'wp_enqueue_script',
      'wp_enqueue_style',
      'wp_head',
      'wp_footer',
      'wp_nav_menu',
      'wp_query',
    ];

    // Проверяем JavaScript код на наличие ключевых слов WordPress
    const isWordPressUsed = wordPressKeywords.some((keyword) =>
      jsCodeWithComments.includes(keyword),
    );
    if (isWordPressUsed) {
      return true;
    }

    //проверка по списку ресурсов
    for (const resource of resources) {
      if (
        resource.name.includes('wp-content') ||
        resource.name.includes('wp-admin')
      ) {
        return true;
      }
    }

    return false; // Если ни метатег, ни пути не найдены
  } catch (error) {
    console.error('Произошла ошибка при определении CMS WordPress:', error);
    return false;
  }
}
