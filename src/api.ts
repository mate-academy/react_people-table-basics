import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

type ApiPerson = Omit<Person, 'slug'> & { slug?: string };

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(2000)
    .then(() => fetch(API_URL))
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json() as Promise<ApiPerson[]>;
    })
    .then(people =>
      people.map(person => ({
        ...person,
        slug: person.slug || person.name.toLowerCase().replace(/\s+/g, '-'),
      })),
    );
}
