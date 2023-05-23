import { API_URL } from './constants/apiUrl';
import { Person } from './types/Person';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}
