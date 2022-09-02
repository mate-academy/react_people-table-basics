import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
  onSelectedPerson: ((selectedPerson: string) => void)
};

export const PersonLink: React.FC<Props> = ({ person, onSelectedPerson }) => {
  const { slug, name } = person;

  return (
    <Link
      to={`/people/${slug}`}
      onClick={() => onSelectedPerson(slug)}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
