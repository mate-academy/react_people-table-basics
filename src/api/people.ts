import { Person } from '../types';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const loadPeople = async (): Promise<Person[]> => {
  const response = await fetch(BASE_URL);

  return response.json();
};
