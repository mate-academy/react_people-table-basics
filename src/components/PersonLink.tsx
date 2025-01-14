import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
  setSelectedPerson: (slug: string) => void;
}

const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  setSelectedPerson,
}) => {
  if (!person || !person.slug) {
    return <span>{person.name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      onClick={() => setSelectedPerson(person.slug)}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
