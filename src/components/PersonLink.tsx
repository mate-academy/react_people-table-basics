import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person | undefined,
  personName: string | null,
}

export const PersonLink: FC<Props> = ({ person, personName }) => {
  return (
    <>
      {person ? (
        <Link to={`/people/${person.slug}`} className={classNames({ 'has-text-danger': person.sex === 'f' })}>
          {person.name}
        </Link>
      ) : (
        <p>{personName || '-'}</p>
      )}
    </>
  );
};
