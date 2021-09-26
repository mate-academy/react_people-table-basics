export function getPeople() {
  return fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  ).then(res => res.json());
}
