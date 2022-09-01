import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
  onSelectedPerson: (_:string) => void;
};

export const LinkToPerson:React.FC<Props> = ({ person, onSelectedPerson }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      onClick={() => onSelectedPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};
