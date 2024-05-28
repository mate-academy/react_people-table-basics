import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

const wait = (delay: number): Promise<unknown> =>
  new Promise(resolve => setTimeout(resolve, delay));

export const getPeople = (): Promise<Person[]> =>
  wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
