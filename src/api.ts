import { Person } from './types/Person';

const API_URL = 'https://mate-academy.github.io/react_people-table/api';
const PEOPLE_PATH = '/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(`${API_URL}${PEOPLE_PATH}`))
    .then(response => response.json());
}
