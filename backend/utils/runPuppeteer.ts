// import puppeteer from "puppeteer";

// // Функция для анализа ресурсов страницы с помощью Puppeteer
// export async function runPuppeteer(url: string) {
//   // Запуск браузера
//   const browser = await puppeteer.launch();
//   // Создание новой страницы
//   const page = await browser.newPage();

//   // Массив для хранения информации об ошибках загрузки ресурсов
//   const errors: any[] = [];

//   try {
//     // Переход на указанный URL и ожидание полной загрузки DOM-структуры страницы
//     await page.goto(url, { waitUntil: "domcontentloaded" });

//     // Обработчик события requestfailed для отслеживания ошибок загрузки ресурсов
//     page.on("requestfailed", (request) => {
//       errors.push({
//         url: request.url(),
//         errorText: request.failure()?.errorText,
//       });
//     });

//     // Получение списка ресурсов на странице при первой загрузке
//     const resources = await page.evaluate(() => {
//       // Функция для вычисления размера ресурса в байтах
//       function getResourceSize(resource: string) {
//         const blob = new Blob([resource]);
//         return blob.size;
//       }

//       // Определение типа ресурса на основе его URL
//       function getResourceType(url: string): string {
//         if (url.endsWith(".css")) {
//           return "CSS";
//         } else if (url.endsWith(".js")) {
//           return "JavaScript";
//         } else if (
//           url.endsWith(".png") ||
//           url.endsWith(".jpg") ||
//           url.endsWith(".jpeg") ||
//           url.endsWith(".gif") ||
//           url.endsWith(".svg")
//         ) {
//           return "Изображение";
//         } else {
//           return "Другое";
//         }
//       }

//       // Получение информации о ресурсах и их времени загрузки
//       const resourcesData = performance
//         .getEntriesByType("resource")
//         .filter(
//           (resource) =>
//             !resource.name.startsWith("data:") &&
//             !resource.name.startsWith("blob:")
//         ) // фильтрация некоторых ресурсов
//         .map((resource) => ({
//           name: resource.name,
//           size: getResourceSize(resource.name),
//           duration: resource.duration,
//           type: getResourceType(resource.name),
//         }));

//       return resourcesData;
//     });

//     // Возвращение списка ресурсов и информации об ошибках загрузки
//     return { resources, errors };
//   } catch (error) {
//     // Обработка ошибок
//     console.error("Произошла ошибка при анализе ресурсов страницы:", error);
//     throw new Error("Ошибка при анализе ресурсов страницы");
//   } finally {
//     // Закрытие браузера после выполнения анализа
//     await browser.close();
//   }
// }

import puppeteer from "puppeteer";

// Функция для анализа ресурсов страницы с помощью Puppeteer
export async function runPuppeteer(url: string) {
  // Запуск браузера
  const browser = await puppeteer.launch();
  // Создание новой страницы
  const page = await browser.newPage();

  // Массив для хранения информации об ошибках загрузки ресурсов
  const errors: any[] = [];

  try {
    // Переход на указанный URL и ожидание полной загрузки DOM-структуры страницы
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Обработчик события requestfailed для отслеживания ошибок загрузки ресурсов
    page.on("requestfailed", (request) => {
      errors.push({
        url: request.url(),
        errorText: request.failure()?.errorText,
      });
    });

    // Получение списка ресурсов на странице при первой загрузке
    const resources = await page.evaluate(() => {
      // Функция для вычисления размера ресурса в байтах
      function getResourceSize(resource: string) {
        const blob = new Blob([resource]);
        return blob.size;
      }

      // Определение типа ресурса на основе его URL
      function getResourceType(url: string): string {
        if (url.endsWith(".css")) {
          return "CSS";
        } else if (url.endsWith(".js")) {
          return "JavaScript";
        } else if (
          url.endsWith(".png") ||
          url.endsWith(".jpg") ||
          url.endsWith(".jpeg") ||
          url.endsWith(".gif") ||
          url.endsWith(".svg")
        ) {
          return "Изображение";
        } else {
          return "Другое";
        }
      }

      // Получение информации о ресурсах и их времени загрузки
      const resourcesData = performance
        .getEntriesByType("resource")
        .filter(
          (resource) =>
            !resource.name.startsWith("data:") &&
            !resource.name.startsWith("blob:")
        ) // фильтрация некоторых ресурсов
        .map((resource) => ({
          name: resource.name,
          size: getResourceSize(resource.name),
          duration: resource.duration,
          type: getResourceType(resource.name),
        }));

      return resourcesData;
    });

    // Получение структуры DOM
    const domStructure = await page.evaluate(() => {
      // Получение общего количества элементов DOM
      const totalElements = document.querySelectorAll("*").length;

      // Поиск максимальной глубины вложенности DOM
      function findMaxDepth(node: HTMLElement | null): number {
        if (!node || !node.children || node.children.length === 0) {
          return 0;
        } else {
          return (
            1 +
            Math.max(
              ...Array.from(node.children).map((child) =>
                findMaxDepth(child as HTMLElement)
              )
            )
          );
        }
      }

      const maxDepth = findMaxDepth(document.body);

      // Поиск максимального числа дочерних элементов
      const maxChildCount = Math.max(
        ...Array.from(document.body.children).map(
          (child) => child.children.length
        )
      );

      return {
        totalElements,
        maxDepth,
        maxChildCount,
      };
    });

    // Возвращение списка ресурсов, информации об ошибках загрузки и структуры DOM
    return { resources, errors, domStructure };
  } catch (error) {
    // Обработка ошибок
    console.error("Произошла ошибка при анализе ресурсов страницы:", error);
    throw new Error("Ошибка при анализе ресурсов страницы");
  } finally {
    // Закрытие браузера после выполнения анализа
    await browser.close();
  }
}
