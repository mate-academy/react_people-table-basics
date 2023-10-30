import { Person } from '../types';

export const getPreparedPeopleInfo = (people: Person[]) => {
  const findPersonByName = (personName: string | null) => people
    .find(({ name }) => name === personName);

  return people.map(person => {
    const mother = findPersonByName(person.motherName);

    const father = findPersonByName(person.fatherName);

    return { ...person, mother, father };
  });
};
