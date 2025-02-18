import { Person } from './types';

export const findSlug = (people: Person[], name: string | null) => {
  const person = people.find(man => man.name === name) || null;

  return person ? person.slug : '';
};

export const getTheClassName = (person: Person) =>
  person && person.sex === 'f' ? 'has-text-danger' : '';

export const getTheParentName = (name: string | null) =>
  name && name.length > 0 ? name : '-';

export const peopleWithParents = (people: Person[]): Person[] => {
  return people.map((person, _index, men) => {
    const mother = men.find(man => man.name === person.motherName) || null;
    const father = men.find(man => man.name === person.fatherName) || null;

    return { ...person, mother, father };
  });
};
