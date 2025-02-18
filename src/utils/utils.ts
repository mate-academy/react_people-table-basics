import classNames from 'classnames';
import { Person } from '../types';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

export const getPeopleWithParents = (people: Person[]) => {
  return people.map((person: Person) => {
    const personWithParents = person;

    personWithParents.mother = people.find(
      (p: Person) => p.name === person.motherName,
    );

    personWithParents.father = people.find(
      (p: Person) => p.name === person.fatherName,
    );

    return personWithParents;
  });
};
