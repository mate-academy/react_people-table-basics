/* eslint-disable max-len */
import { Person } from './components/types/Person';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(URL);

  return response.json();
};
