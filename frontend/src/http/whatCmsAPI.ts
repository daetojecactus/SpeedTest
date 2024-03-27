import { $host } from "./index";

//Апи для cms
export const fetchCMSInfo = async (url: string) => {
  try {
    const response = await $host.post("/api/cms", { url });
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
