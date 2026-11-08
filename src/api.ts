import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(BASE_URL).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch people');
    }

    return response.json() as Promise<Person[]>;
  });
};
