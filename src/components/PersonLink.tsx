import React from 'react';
import { Link } from 'react-router-dom';

interface Person {
  slug: string;
  name: string;
  sex: string;
}

interface Props {
  person: Person | null;
  nameToDisplay: string;
}

export const PersonLink: React.FC<Props> = ({ person, nameToDisplay }) => {
  if (!nameToDisplay) {
    return <span>-</span>;
  }

  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {nameToDisplay}
      </Link>
    );
  }

  return <span>{nameToDisplay}</span>;
};
