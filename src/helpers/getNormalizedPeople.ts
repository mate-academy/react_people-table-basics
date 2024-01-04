import { Person } from '../types';

type GetParentType = (
  people: Person[],
  parentName: string | null
) => Person | undefined;

const getParent: GetParentType = (people, parentName) => {
  if (!parentName) {
    return undefined;
  }

  return people.find(person => person.name === parentName);
};

export const getNormalizedPeople = (people: Person[]) => (
  people.map((person, _index, peopleArray) => ({
    ...person,
    mother: getParent(peopleArray, person.motherName),
    father: getParent(peopleArray, person.fatherName),
  }))
);
