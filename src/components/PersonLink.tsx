import React from 'react';
import { Link } from 'react-router-dom';
import { DataPerson } from '../types/DataPerson';

type PersonLinkProps = {
  person: DataPerson;
};

export const PersonLink = ({ person }: PersonLinkProps) => {
  return (
    <Link
      className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};
