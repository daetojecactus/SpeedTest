import { Request, Response } from "express";
import { runPuppeteer } from "../utils/runPuppeteer";

// Контроллер для анализа ошибок загрузки ресурсов
export async function resourceErrors(req: Request, res: Response) {
  // Извлекаем URL из тела запроса
  const { url } = req.body;

  try {
    // Загружаем страницу и измеряем время с помощью Puppeteer
    let { errors } = await runPuppeteer(url);

    // Если массив ошибок пуст, добавляем сообщение об отсутствии ошибок
    if (errors.length === 0) {
      errors = [{ errorText: "Ошибок при загрузке не найдено", url: "" }];
    }

    // Отправляем успешный ответ с найденными ошибками
    res.status(200).json({ errors });
  } catch (error) {
    // В случае ошибки выводим сообщение в консоль и отправляем статус 500
    console.error("Произошла ошибка при анализе ошибок загрузки ресурсов:", error);
    res.status(500).json({ error: "Произошла ошибка при анализе ошибок загрузки ресурсов" });
  }
}
