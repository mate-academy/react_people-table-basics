import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person as PersonType } from '../../types';

interface PersonLinkProps {
  person: PersonType;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const to = `/people/${person.slug}`;
  const displayText = person.name;
  const isFemale = person.sex === 'f';

  const linkClasses = cn({ 'has-text-danger': isFemale });

  return (
    <Link to={to} className={linkClasses}>
      {displayText}
    </Link>
  );
};
