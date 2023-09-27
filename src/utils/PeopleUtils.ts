import { Person } from '../types';

export function getFixedPeople(people: Person[]) {
  const peopleCopy: Person[] = JSON.parse(JSON.stringify(people));

  return peopleCopy.map(person => {
    return {
      ...person,
      mother: people.find(mother => mother.name === person.motherName),
      father: people.find(father => father.name === person.fatherName),
    };
  });
}
