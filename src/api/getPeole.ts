import { BASE_URL } from '../constants/BASE_URL';

export function getPeople() {
  return fetch(BASE_URL)
    .then((response) => response.json());
}
