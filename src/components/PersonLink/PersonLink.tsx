import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

interface Props {
  personName?: string;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  if (!personName) {
    return <span>-</span>;
  }

  const person = people.find(p => p.name === personName);

  if (!person) {
    return <span>{personName}</span>;
  }

  const colorClass =
    person.sex === 'f' ? 'has-text-danger' : 'has-text-primary';

  return (
    <Link to={`/people/${person.slug}`} className={colorClass}>
      {personName}
    </Link>
  );
};
