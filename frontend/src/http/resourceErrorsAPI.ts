import { $host } from './index';

//Апи для ошибок
export const resourceErrors = async (url: string) => {
  try {
    const response = await $host.post('/api/resource-errors', { url });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при отправке запроса');
  }
};
