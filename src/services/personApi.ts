import { Person } from '../types';

export function getPerson(): Promise<Person[]> {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  )
    .then(response => {
      return response.json();
    })
    .then(person => person);
}
