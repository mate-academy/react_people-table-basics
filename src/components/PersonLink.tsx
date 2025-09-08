import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  personName: string | null;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const personFound = people.find(p => p.name === personName);

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
        personName || '-'
      )}
    </>
  );
};
