import { Person } from '../types';

export const linkParents = (people: Person[]) => {
  const peopleMap = new Map(people.map(person => [person.name, person]));

  return people.map(person => ({
    ...person,
    motherName: person.motherName || '-',
    fatherName: person.fatherName || '-',
    mother: person.motherName ? peopleMap.get(person.motherName) : undefined,
    father: person.fatherName ? peopleMap.get(person.fatherName) : undefined,
  }));
};
