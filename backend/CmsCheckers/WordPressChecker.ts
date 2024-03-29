// backend/checkers/wordpressChecker.ts

import { loadAndParseHTML } from "./index";

// Проверка наличия метатега WordPress
export async function checkWordPress(url: string): Promise<boolean> {
  try {
    const $ = await loadAndParseHTML(url);
    return $('meta[name="generator"][content*="WordPress"]').length > 0;
  } catch (error) {
    console.error("Произошла ошибка при проверке наличия WordPress:", error);
    return false;
  }
}
