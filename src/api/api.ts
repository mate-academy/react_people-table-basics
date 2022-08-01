import { Person } from '../type/type';

// eslint-disable-next-line max-len
const LINK = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(LINK)
    .then(response => response.json());
};
