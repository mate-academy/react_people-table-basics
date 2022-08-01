/* eslint-disable max-len */
import { Person } from './types/Person';

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');

  return response.json();
};
