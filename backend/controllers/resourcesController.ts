import { Request, Response } from "express";
import { runPuppeteer } from "../utils/runPuppeteer";

// Контроллер для анализа ресурсов на странице
export async function getResources(req: Request, res: Response) {
  const { url } = req.body;

  try {
    // Получаем список ресурсов на странице с помощью Puppeteer
    const resources = await runPuppeteer(url);

    // Выводим логи с информацией о каждом ресурсе
    console.log("Ресурсы на странице:", resources);

    // Отправляем список ресурсов ответом
    res.status(200).json({ resources });
  } catch (error) {
    // В случае ошибки отправляем соответствующий статус и сообщение об ошибке
    console.error("Произошла ошибка при анализе ресурсов на странице:", error);
    res.status(500).json({ error: "Произошла ошибка при анализе ресурсов на странице" });
  }
}
