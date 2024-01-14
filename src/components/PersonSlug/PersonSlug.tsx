import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { PersonType } from '../../types';

type Props = {
  person: PersonType;
};

export const PersonSlug: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
