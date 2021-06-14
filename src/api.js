
// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople() {
  return fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}
