import { Person } from '../react-app-env';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(URL)
    .then(res => res.json());
};
