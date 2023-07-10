import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { sex, slug, name } = person;

  return (
    <Link
      className={cn({
        'has-text-danger': sex === 'f',
      })}
      to={slug}
    >
      {name || '-'}
    </Link>
  );
};
