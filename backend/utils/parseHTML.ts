import { sendGetRequest } from './http';
import cheerio from 'cheerio';

// Функция для загрузки и обработки HTML разметки по URL
export async function loadAndParseHTML(url: string): Promise<cheerio.Root> {
  try {
    const html = await sendGetRequest(url);
    return cheerio.load(html);
  } catch (error) {
    console.error(
      'Произошла ошибка при загрузке и обработке HTML разметки:',
      error,
    );
    throw new Error('Ошибка при загрузке и обработке HTML разметки');
  }
}
