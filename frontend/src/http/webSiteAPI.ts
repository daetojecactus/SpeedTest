import { $host } from "./index";

//Апи для отправки
export const sendWebSiteUrl = async (url: string) => {
  try {
    const response = await $host.post("/api/load-time", { url });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

