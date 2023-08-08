import { Person } from '../types';

export const findPeopleFamily = (peoples: Person[]): Person[] => {
  const updatedPersons = peoples.map((person) => {
    const fatherObj
      = peoples.find((human) => human.fatherName === person.name);

    const motherObj
      = peoples.find((human) => human.motherName === person.name);

    return {
      ...person,
      mother: motherObj,
      father: fatherObj,
    };
  });

  return updatedPersons;
};
