import classNames from 'classnames';
import { Person } from '../types';

export function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
}

export function findFather(child: Person, people: Person[]) {
  return people.find(person => person.name === child.fatherName);
}

export function findMother(child: Person, people: Person[]) {
  return people.find(person => person.name === child.motherName);
}
