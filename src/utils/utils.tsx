import classnames from 'classnames';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';
import { NOT_SET_VALUE } from './constants';

export const getFatherPerson = (
  people: Person[],
  fatherName: string | null,
) => {
  if (fatherName === null) {
    return NOT_SET_VALUE;
  }

  const person = people.find(({ name }) => name === fatherName);

  if (!person) {
    return fatherName;
  }

  return <PersonLink person={person} />;
};

export const getMotherPerson = (
  people: Person[],
  motherName: string | null,
) => {
  if (motherName === null) {
    return NOT_SET_VALUE;
  }

  const person = people.find(({ name }) => name === motherName);

  if (!person) {
    return motherName;
  }

  return <PersonLink person={person} />;
};

export const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classnames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};
