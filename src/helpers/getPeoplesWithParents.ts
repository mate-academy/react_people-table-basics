import { Person } from '../types';
import { getPersonParent } from './getPersonParent';

export const getPeoplesWithParents = (peoples: Person[]) => (
  peoples.map(person => {
    const father = getPersonParent(person.fatherName, peoples);
    const mother = getPersonParent(person.motherName, peoples);

    return {
      ...person,
      father: father || undefined,
      mother: mother || undefined,
    };
  })
);
