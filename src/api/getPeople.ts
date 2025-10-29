import { Person } from '../types/Person';

// eslint-disable-next-line max-len
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch people');
  }

  return res.json();
};
