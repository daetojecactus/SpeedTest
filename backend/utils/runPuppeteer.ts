import puppeteer from "puppeteer";

// Функция для запуска Puppeteer и анализа ресурсов на странице
export async function runPuppeteer(
  url: string
): Promise<{ url: string; size: number; loadTime: number }[]> {
  // Запускаем экземпляр браузера с помощью Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Переходим на указанный URL-адрес
  await page.goto(url);

  // Получаем список всех загруженных ресурсов на странице с помощью выполнения JavaScript на странице
  const resources = await page.evaluate(() => {
    // Выбираем все элементы страницы, которые могут быть ресурсами
    const allResources = Array.from(
      document.querySelectorAll(
        "img, script, link[href], source, iframe, audio, video"
      )
    );
    // Маппим каждый ресурс в объект с URL, размером и временем загрузки
    return allResources.map((resource) => {
      // Получаем URL ресурса
      const url = resource.getAttribute("src") || resource.getAttribute("href");
      // Получаем размер ресурса (если он доступен)
      const size = Number(resource.getAttribute("size")); // Получаем размер ресурса
      // Получаем время загрузки ресурса (если оно доступно)
      const loadTime = Number(resource.getAttribute("loadTime")); // Получаем время загрузки ресурса
      // Возвращаем объект с URL, размером и временем загрузки ресурса
      return {
        url: url || "",
        size: isNaN(size) ? 0 : size,
        loadTime: isNaN(loadTime) ? 0 : loadTime,
      };
    });
  });

  // Закрываем экземпляр браузера после завершения работы
  await browser.close();

  // Фильтруем ресурсы, чтобы удалить пустые URL
  return resources.filter((resource) => !!resource.url);
}