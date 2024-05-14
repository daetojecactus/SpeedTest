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
      function getResourceType(url: string): string | null {
        if (url.includes(".css")) {
          return "CSS";
        } else if (url.includes(".js")) {
          return "JavaScript";
        } else if (url.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
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

    // Фильтрация ресурсов для получения только JavaScript файлов
    const jsResources = resources.filter((res) => res.type === "JavaScript");

    // Получение содержимого JavaScript файлов
    const jsCodeWithComments = await Promise.all(
      jsResources.map(async (res) => {
        // Загрузка содержимого JavaScript файла с использованием fetch
        const jsContent = await page.evaluate((url) => {
          return fetch(url).then((response) => response.text());
        }, res.name);

        // Обрамление содержимого JavaScript файла комментариями
        return `<!--\n${jsContent}\n//-->`;
      })
    ).then((jsCodes) => jsCodes.join("\n"));

    // Возвращение списка ресурсов, информации об ошибках загрузки и структуры DOM
    return { resources, errors, domStructure, jsCodeWithComments };
  } catch (error) {
    // Обработка ошибок
    console.error("Произошла ошибка при анализе ресурсов страницы:", error);
    throw new Error("Ошибка при анализе ресурсов страницы");
  } finally {
    // Закрытие браузера после выполнения анализа
    await browser.close();
  }
}

// import puppeteer from "puppeteer";

// // Функция для анализа ресурсов страницы с помощью Puppeteer
// export async function runPuppeteer(url: string) {
//   // Запуск браузера
//   const browser = await puppeteer.launch();
//   // Создание новой страницы
//   const page = await browser.newPage();

//   // Массив для хранения информации о ресурсах и об ошибках загрузки
//   const resources: any[] = [];
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

//     // Функция для получения ресурсов
//     const captureResources = async (
//       afterInitialLoad: boolean,
//       resources: any[]
//     ) => {
//       const newResources = await page.evaluate(
//         (afterInitialLoad, resources) => {
//           // Функция для вычисления размера ресурса в байтах
//           function getResourceSize(resource: string) {
//             const blob = new Blob([resource]);
//             return blob.size;
//           }

//           // Определение типа ресурса на основе его URL
//           function getResourceType(url: string): string | null {
//             if (url.includes(".css")) {
//               return "CSS";
//             } else if (url.includes(".js")) {
//               return "JavaScript";
//             } else if (url.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
//               return "Изображение";
//             } else if (url.match(/\.(woff|woff2|eot|ttf)$/i)) {
//               return "Шрифт";
//             } else if (/\bgoogle\b.*\banalytics\b/i.test(url)) {
//               return "Google Analytics";
//             } else if (/\byandex\b.*\bmetrica\b/i.test(url)) {
//               return "Yandex Metrika";
//             } else {
//               return "Другое";
//             }
//           }

//           const performanceEntries = performance.getEntriesByType("resource");

//           // Фильтрация новых ресурсов (после первой загрузки или после прокрутки)
//           const filteredResources = performanceEntries
//             .filter((entry) => {
//               return (
//                 !resources.some((res) => res.name === entry.name) &&
//                 (afterInitialLoad || entry.startTime > 0) // Фильтруем ресурсы после прокрутки
//               );
//             })
//             .map((entry) => ({
//               name: entry.name,
//               size: getResourceSize(entry.name),
//               duration: entry.duration,
//               type: getResourceType(entry.name),
//               loadedAfterInitialLoad: afterInitialLoad, // Указываем, загружен ли ресурс после первой загрузки
//             }));

//           return filteredResources;
//         },
//         afterInitialLoad,
//         resources
//       );

//       resources.push(...newResources);
//     };

//     // Получение ресурсов после первой загрузки
//     await captureResources(true, resources);

//     // Прокрутка страницы вниз
//     await page.evaluate(() => {
//       window.scrollBy(0, window.innerHeight);
//     });

//     // Ожидание загрузки ресурсов после прокрутки
//     await new Promise((resolve) => setTimeout(resolve, 3000)); // Подождем 3 секунды после прокрутки

//     // Получение ресурсов после прокрутки
//     await captureResources(false, resources);

//     // Получение структуры DOM
//     const domStructure = await page.evaluate(() => {
//       // Получение общего количества элементов DOM
//       const totalElements = document.querySelectorAll("*").length;

//       // Поиск максимальной глубины вложенности DOM
//       function findMaxDepth(node: HTMLElement | null): number {
//         if (!node || !node.children || node.children.length === 0) {
//           return 0;
//         } else {
//           return (
//             1 +
//             Math.max(
//               ...Array.from(node.children).map((child) =>
//                 findMaxDepth(child as HTMLElement)
//               )
//             )
//           );
//         }
//       }

//       const maxDepth = findMaxDepth(document.body);

//       // Поиск максимального числа дочерних элементов
//       const maxChildCount = Math.max(
//         ...Array.from(document.body.children).map(
//           (child) => child.children.length
//         )
//       );

//       return {
//         totalElements,
//         maxDepth,
//         maxChildCount,
//       };
//     });

//     // Фильтрация ресурсов для получения только JavaScript файлов
//     const jsResources = resources.filter((res) => res.type === "JavaScript");

//     // Получение содержимого JavaScript файлов
//     const jsCodeWithComments = await Promise.all(
//       jsResources.map(async (res) => {
//         // Загрузка содержимого JavaScript файла с использованием fetch
//         const jsContent = await page.evaluate((url) => {
//           return fetch(url).then((response) => response.text());
//         }, res.name);

//         // Обрамление содержимого JavaScript файла комментариями
//         return `<!--\n${jsContent}\n//-->`;
//       })
//     ).then((jsCodes) => jsCodes.join("\n"));

//     // Возвращение списка ресурсов, информации об ошибках загрузки и структуры DOM
//     return { resources, errors, domStructure, jsCodeWithComments };
//   } catch (error) {
//     // Обработка ошибок
//     console.error("Произошла ошибка при анализе ресурсов страницы:", error);
//     throw new Error("Ошибка при анализе ресурсов страницы");
//   } finally {
//     // Закрытие браузера после выполнения анализа
//     await browser.close();
//   }
// }
