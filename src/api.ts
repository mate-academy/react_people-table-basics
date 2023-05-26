import { Person } from './types/Person';

const API_URL
 = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then((response) => {
      if (!response.ok) {
        throw new Error('Connection issue');
      }

      return response.json();
    });
}
