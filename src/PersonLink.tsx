import { Link } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from './types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`${person.slug}`}
    className={cn({
      'has-text-danger': person.sex === 'f',
    })}
    replace
  >
    {person.name}
  </Link>
);
