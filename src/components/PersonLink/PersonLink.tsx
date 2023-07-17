import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { sex, slug, name } = person;

  const isFemale = sex === 'f';

  return (
    <Link
      className={cn({
        'has-text-danger': isFemale,
      })}
      to={slug}
    >
      {name || '-'}
    </Link>
  );
};
