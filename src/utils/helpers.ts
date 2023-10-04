import cn from 'classnames';
import { Person } from '../types/Person';

export const getNavLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn('navbar-item', { 'has-background-grey-lighter': isActive })
);

export const findPersonByName = (people: Person[], name: string | null) => {
  return people.find(person => person.name === name) || null;
};
