import { $host } from './index';

//Апи для отправки DOM
export const domStructureInfo = async (url: string) => {
  try {
    const response = await $host.post('/api/dom-structure', { url });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при отправке запроса');
  }
};
