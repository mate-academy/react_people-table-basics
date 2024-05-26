import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

export interface IPersoneLink {
  person: Person;
}

export const PersoneLink: FC<IPersoneLink> = ({ person }) => {
  return (
    <Link
      to={`../${person?.slug}`}
      className={person?.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person?.name}
    </Link>
  );
};
