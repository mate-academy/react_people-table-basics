import { Person } from '../types';

export const getNormalizedPeopleList = (people: Person[]) => {
  const parentsList = people.reduce((acc, person) => {
    const key = person.name;
    /* eslint no-param-reassign: "error" */

    acc[key] = person;

    return acc;
  }, {} as {
    [key: string]: Person;
  });

  const list = people.map(person => {
    const copyPerson = { ...person };
    const normalizedMotherName = person.motherName || '-';
    const normalizedFatherName = person.fatherName || '-';

    copyPerson.motherName = normalizedMotherName;
    copyPerson.fatherName = normalizedFatherName;

    copyPerson.mother = parentsList[normalizedMotherName];
    copyPerson.father = parentsList[normalizedFatherName];

    return copyPerson;
  });

  return list;
};
