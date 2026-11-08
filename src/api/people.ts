import { Person } from '../types/Person';
const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';
function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
export function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(BASE_URL))
    .then(response => response.json());
}
