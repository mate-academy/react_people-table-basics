import { Person } from '../types/Person';

const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(300)
    .then(() => fetch(BASE_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load people');
      }

      return response.json();
    });
}
