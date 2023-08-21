import { PersonProps } from '../types';

export default function combinePeople(people: PersonProps[]):PersonProps[] {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return {
      ...person,
      mother: mother || null,
      father: father || null,
    };
  });
}
