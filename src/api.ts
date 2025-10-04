import { Person } from './types/Person';
import { API_CONFIG } from './constants';

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PEOPLE}`;

const wait = (delay: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, delay));

export const getPeople = async (): Promise<Person[]> => {
  await wait(API_CONFIG.FETCH_DELAY);

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch people: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format: expected array');
  }

  return data;
};
