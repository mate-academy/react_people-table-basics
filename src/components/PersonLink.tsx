import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from './PeopleTable';

interface PersonLinkProps {
  person?: Person | null;
  onSelect?: (slug: string) => void;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, onSelect }) => {
  if (!person) return <>-</>;

  const handleClick = () => {
    if (onSelect) onSelect(person.slug);
  };

  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};
