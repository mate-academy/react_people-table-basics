// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople() {
  return fetch(BASE_URL)
    .then(people => people.json());
}
