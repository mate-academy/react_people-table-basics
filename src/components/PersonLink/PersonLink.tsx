import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import cl from 'classnames';

type Props = {
  person: Person | string;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (typeof person === 'string') {
    return person;
  }

  return (
    <Link
      to={person.slug || ''}
      className={cl({
        'has-text-danger':
          person.sex === 'f' || (person.sex === 'f' && person.motherName),
      })}
    >
      {person.name || ''}
    </Link>
  );
};
