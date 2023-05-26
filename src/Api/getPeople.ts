import { PeopleType } from '../Type/People';

const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const fetchPeople = async (): Promise<PeopleType[]> => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
