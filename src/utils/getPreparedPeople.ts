import { PersonType } from '../types';
import { getFather } from './getFather';
import { getMother } from './getMother';

export function getPreparedPeople(people: PersonType[]) {
  return people.map(
    (person: PersonType) => ({
      ...person,
      mother: getMother(people, person),
      father: getFather(people, person),
    }),
  );
}
