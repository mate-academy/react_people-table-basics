// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople<T>(): Promise<T> {
  return fetch(BASE_URL)
    .then(res => res.json());
}
