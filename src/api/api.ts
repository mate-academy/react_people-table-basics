import { People } from '../types/types';

const URL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = async (): Promise<People[]> => {
  const response = await fetch(`${URL}/people.json`);

  return response.json();
};
