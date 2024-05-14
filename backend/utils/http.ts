import axios from 'axios';

// Функция для отправки GET-запроса по URL
export async function sendGetRequest(url: string): Promise<any> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при отправке GET-запроса');
  }
}
