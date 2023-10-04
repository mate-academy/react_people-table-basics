import classNames from 'classnames';
import { Person } from './types';

export function getPreparedPeople(people: Person[]): Person[] {
  return people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
}

export function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
}
