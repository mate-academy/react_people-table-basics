import classNames from 'classnames';
import { Person } from '../../types';

export const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item',
  {
    'has-background-grey-lighter': isActive,
  },
);

export const getLinkStyle = (
  { isActive }: { isActive: boolean },
) => (
  { color: isActive ? 'red' : '' }
);

export const preparePeopleData = (people: Person[] | null) => {
  if (people) {
    return people.map(person => {
      const mother = people.find((mom) => mom.name === person.motherName);
      const father = people.find((dad) => dad.name === person.fatherName);

      return { ...person, mother, father };
    });
  }

  return null;
};
