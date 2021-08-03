const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople() {
  return fetch(url)
    .then(response => response.json());
}
