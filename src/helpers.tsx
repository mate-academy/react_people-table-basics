import { Person } from './types/Person';

export const preparePeople = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};
