import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
);
