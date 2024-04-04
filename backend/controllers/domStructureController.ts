import { Request, Response } from "express";
import { runPuppeteer } from "../utils/runPuppeteer";

// Контроллер для анализа структуры DOM
export async function domStructure(req: Request, res: Response) {
  // Извлекаем URL из тела запроса
  const { url } = req.body;

  try {
    // Загружаем страницу и измеряем время с помощью Puppeteer
    const { domStructure } = await runPuppeteer(url);

    // Отправляем успешный ответ с информацией о структуре DOM
    res.status(200).json({ domStructure });
  } catch (error) {
    // В случае ошибки выводим сообщение в консоль и отправляем статус 500
    console.error("Произошла ошибка при анализе структуры DOM:", error);
    res.status(500).json({ error: "Произошла ошибка при анализе структуры DOM" });
  }
}
