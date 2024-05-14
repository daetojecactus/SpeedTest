import { loadAndParseHTML } from "../utils/parseHTML";
import { runPuppeteer } from "../utils/runPuppeteer";

// Проверка наличия метатега или ключевых слов Bitrix
export async function checkBitrix(url: string): Promise<boolean> {
  try {
    const $ = await loadAndParseHTML(url);

    // Проверка наличия метатега Bitrix
    const hasBitrixMeta =
      $('meta[name="generator"][content*="Bitrix"]').length > 0;

    if (hasBitrixMeta) {
      return true;
    }

    const { resources, jsCodeWithComments } = await runPuppeteer(url);

    // ключевые слова или шаблоны для Bitrix в js
    const bitrixKeywords = [
      "BX",
      "Bitrix",
      "CBitrix",
      "CMain",
      "CComponentEngine",
      "CIBlock",
      "CUser",
      "CModule",
      "CAgent",
      "CFile",
      "CEvent",
      "CUtil",
      "CMenu",
      "CDatabase",
      "CIBlockElement",
      "CIBlockSection",
      "CIBlockProperty",
      "CIBlockType",
      "CIBlockResult",
      "CAdminList",
      "CAdminTabControl",
      "CAdminContextMenu",
      "CAdminCalendar",
      "CAdminDialog",
      "CAdminFilter",
      "CAdminMessage",
      "CAdminNotify",
      "CAdminPage",
      "CAdminTabControl",
      "CAdminViewList",
      "CAdminForm",
      "CAdminList",
      "CAdminSorting",
      "CAdminSubContextMenu",
      "CAdminSubList",
      "CAdminSubMenu",
    ];

    // Проверяем JavaScript код на наличие ключевых слов Bitrix
    const isBitrixUsed = bitrixKeywords.some((keyword) =>
      jsCodeWithComments.includes(keyword)
    );

    if (isBitrixUsed) {
      return true;
    }

    //проверяем ресурсы на наличие путей Bitrix
    for (const resource of resources) {
      if (resource.name.includes("bitrix" && "templates")) {
        return true;
      }
    }

    return false; // Если ни метатег, ни ключевые слова, ни пути Bitrix не найдены
  } catch (error) {
    console.error("Произошла ошибка при проверке наличия Bitrix:", error);
    return false;
  }
}
