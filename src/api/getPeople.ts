import { Persone } from '../types/Persone';

const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = async (): Promise<Persone[]> => {
  const response = await fetch(`${BASE_URL}/people.json`);

  try {
    if (response.ok) {
      return await response.json();
    }

    throw new Error('error');
  } catch {
    throw new Error('error');
  }
};
