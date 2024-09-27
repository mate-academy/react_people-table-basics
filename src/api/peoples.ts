import { Person } from '../types';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(URL).then(peoples => peoples.json());
};
