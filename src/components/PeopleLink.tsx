import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';

type Props = {
  person: Person | undefined,
  personName: string | null,
};

export const PersonLink: React.FC<Props> = ({ person, personName }) => (
  person ? (
    <Link
      to={`../${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
      replace
    >
      {person.name}
    </Link>
  ) : (
    <>
      {personName || '-'}
    </>
  )
);
