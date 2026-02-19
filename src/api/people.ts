import { Person } from '../types/Person';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople(): Promise<Person[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return res.json();
}
