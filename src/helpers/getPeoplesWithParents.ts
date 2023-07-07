import { Person } from '../types';
import { getPersonParent } from './getPersonParent';

export const getPeoplesWithParents = (peopleData: Person[]) => (
  peopleData.map(person => {
    const father = getPersonParent(person.fatherName, peopleData);
    const mother = getPersonParent(person.motherName, peopleData);

    return {
      ...person,
      father: father || undefined,
      mother: mother || undefined,
    };
  })
);
