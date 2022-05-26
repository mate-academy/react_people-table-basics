import { Person } from '../types';

const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeopleFromServer = async (): Promise<Person[]> => {
  const response = await fetch(`${BASE_URL}/people.json`);

  return response.json();
};
