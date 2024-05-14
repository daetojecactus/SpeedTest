import { $host } from './index';

//Апи для отправки
export const firstLoadTime = async (url: string) => {
  try {
    const response = await $host.post('/api/first-load-time', { url });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при отправке запроса');
  }
};
