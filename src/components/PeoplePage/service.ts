import { Person } from '../../types';

export const isPersonExist = (people: Person[], person: string | null) => {
  if (!person) {
    return;
  }

  return people.some(per => per.name === person);
};

export const fillParents = (people: Person[]): Person[] => {
  const filled = people.map(person => {
    const { fatherName, motherName } = person;
    const isMotherExist = isPersonExist(people, motherName);
    const isFatherExist = isPersonExist(people, fatherName);

    const mother = isMotherExist
      ? people.find(per => per.name === motherName)
      : null;
    const father = isFatherExist
      ? people.find(per => per.name === fatherName)
      : null;

    const updatedPerson = { ...person };

    if (mother) {
      updatedPerson.mother = mother;
    }

    if (father) {
      updatedPerson.father = father;
    }

    return updatedPerson;
  });

  return filled;
};
