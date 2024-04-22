import { Request, Response } from "express";
import { checkWordPress } from "../CmsCheckers/WordPressChecker";
import { checkJoomla } from "../CmsCheckers/JoomlaChecker";
import { checkBitrix } from "../CmsCheckers/BitrixChecker";

// Контроллер для определения CMS по URL
export async function getCMSInfo(req: Request, res: Response) {
  const { url } = req.body;

  try {
    // Проверяем, является ли сайт WordPress
    const isWordPress = await checkWordPress(url);
    if (isWordPress) {
      return res.status(200).json({ cms: "WordPress" });
    }

    // Проверяем, является ли сайт Joomla
    const isJoomla = await checkJoomla(url);
    if (isJoomla) {
      return res.status(200).json({ cms: "Joomla" });
    }

    // Проверяем, является ли сайт Bitrix
    const isBitrix = await checkBitrix(url);
    if (isBitrix) {
      return res.status(200).json({ cms: "Bitrix" });
    }

    // Если ни одна CMS не обнаружена, возвращаем сообщение
    return res
      .status(200)
      .json({ cms: "CMS не используется или не была определена" });
  } catch (error) {
    console.error("Произошла ошибка при определении CMS:", error);
    return res
      .status(500)
      .json({ error: "Произошла ошибка при определении CMS" });
  }
}
