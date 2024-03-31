import { $host } from "./index";

//Апи для ресурсов
export const fetchResources = async (url: string) => {
  try {
    const response = await $host.post("/api/resources", { url });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
