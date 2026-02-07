import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export const PeopleErrorMessagesText = {
  LOADING_ERROR: 'Something went wrong',
  NO_PEOPLE: 'There are no people on the server',
} as const;

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}
