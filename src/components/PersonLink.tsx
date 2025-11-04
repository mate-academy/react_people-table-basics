import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import type { Person } from '../types/Person';

type Props = {
  person: Person;
  className?: string;
};

export const PersonLink: React.FC<Props> = ({ person, className }) => (
  <Link
    to={`/people/${person.slug}`}
    className={cn(className, {
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);
