import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

interface Prop {
  personName: string;
  people: Person[];
  onSelect?: (slug: string) => void;
}

export const PersonLink: React.FC<Prop> = ({
  personName,
  people,
  onSelect,
}) => {
  const person: Person | undefined = people.find(p => p.name === personName);

  const isFemale = person?.sex === 'f';

  if (!person) {
    return <>{personName}</>; //якщо немає такої людини — просто текст
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
      onClick={() => onSelect?.(person.slug)}
    >
      {person.name}
    </Link>
  );
};
