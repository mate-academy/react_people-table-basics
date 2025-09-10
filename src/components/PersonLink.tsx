import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  person: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const personFound = people.find(p => p.name === person);

  return (
    <>
      {personFound ? (
        <Link
          className={personFound.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${personFound.slug}`}
        >
          {personFound.name}
        </Link>
      ) : (
        person || '-'
      )}
    </>
  );
};
