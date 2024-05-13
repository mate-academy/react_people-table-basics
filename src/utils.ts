import cn from 'classnames';
import { Person } from './types';

export const getActiveClassName = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const getPerson = (
  people: Person[] | undefined,
  children: React.ReactNode,
): Person | undefined => {
  let result;

  if (people) {
    result = people.find(item => item.name === children);
  }

  return result;
};
