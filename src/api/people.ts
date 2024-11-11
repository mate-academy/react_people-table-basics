import { Person } from '../types';

export function getPeople(): Promise<Person[]> {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  ).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
