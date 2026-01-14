import { Person } from '../types';

const PEOPLE_API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople(): Promise<Person[]> {
  const res = await fetch(PEOPLE_API_URL);

  if (!res.ok) {
    throw new Error('HTTP error ' + res.status);
  }

  return res.json();
}
