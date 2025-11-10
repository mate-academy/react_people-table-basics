import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface PersonLinkProps {
  person?: Person | null;
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, name }) => {
  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={cn({ 'has-text-danger': person.sex === 'f' })}
      >
        {name || person.name}
      </Link>
    );
  }

  if (name) {
    return <>{name}</>;
  }

  return <>-</>;
};
