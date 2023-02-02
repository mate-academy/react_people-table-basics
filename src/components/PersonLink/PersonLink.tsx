import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={person.slug}
      className={cn({
        'has-text-danger': isFemale,
      })}
    >
      {person.name}
    </Link>
  );
}

