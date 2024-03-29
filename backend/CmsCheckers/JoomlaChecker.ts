// backend/checkers/joomlaChecker.ts

import { loadAndParseHTML } from "./index";

// Проверка наличия метатега Joomla
export async function checkJoomla(url: string): Promise<boolean> {
  try {
    const $ = await loadAndParseHTML(url);
    return $('meta[name="generator"][content*="Joomla"]').length > 0;
  } catch (error) {
    console.error("Произошла ошибка при проверке наличия Joomla:", error);
    return false;
  }
}
