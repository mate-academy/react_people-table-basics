import { Person } from './types';

export const peopleWithParentsInfo = (people: Person[]) => people
  .map((person) => {
    const father = people.find(p => person.fatherName === p.name);
    const mother = people.find(p => person.motherName === p.name);

    return {
      ...person,
      mother,
      father,
    };
  });
