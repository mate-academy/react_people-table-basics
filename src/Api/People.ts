import { BASE_URL } from './Api';

export const getPeople = async (): Promise<any> => {
  const response = await fetch(`${BASE_URL}`);

  return response.json();
};
