import { BASE_URL } from './api';

export async function getPeople() {
  const response = await fetch(BASE_URL);
  const result = await response.json();

  return result;
}
