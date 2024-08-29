import { Person } from '../types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { URLS } from '../enums/URLS';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/${URLS.people}/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};
