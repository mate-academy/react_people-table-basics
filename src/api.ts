import { Person } from './types/Person';

const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople(): Promise<Person[]> {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    })
    .then((people: Person[]) => {
      if (!Array.isArray(people)) {
        return [];
      }

      return people.map(person => ({
        ...person,
        slug:
          person.slug ||
          (person.name
            ? encodeURIComponent(person.name.toLowerCase().replace(/\s+/g, '-'))
            : ''),
      }));
    });
}
