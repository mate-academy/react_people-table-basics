// eslint-disable-next-line max-len
const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople() {
  return fetch(URL).then(response => response.json());
}
