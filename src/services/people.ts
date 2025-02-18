import cn from 'classnames';
import { Active } from '../types/Active';
import { Person } from '../types';

export const isPerson = (people: Person[], parentsName: string | null) =>
  parentsName ? people.find(({ name }) => name === parentsName) : undefined;

export const getLinkClass = ({ isActive }: Active) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const isName = (name: string | null) => (name ? name : '-');
