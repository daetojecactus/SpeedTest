import { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";

const getCMSInfo = async (req: Request, res: Response) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let cms: string | null = null;

    // Проверяем наличие метатега WordPress
    if ($('meta[name="generator"][content*="WordPress"]').length) {
      cms = "WordPress";
    }
    // Добавляем другие проверки для других CMS здесь

    res.status(200).json({ cms });
  } catch (error) {
    console.error("Произошла ошибка при получении информации о CMS:", error);
    res.status(500).json({ error: "Произошла ошибка при получении информации о CMS" });
  }
};

export default {
  getCMSInfo,
};
