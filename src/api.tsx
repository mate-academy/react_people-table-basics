import { Person } from './type/person';

// eslint-disable-next-line max-len
const UrlPeople = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(UrlPeople);
  const people = await response.json();

  return people;
};
