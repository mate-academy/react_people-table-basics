import React from 'react';
import { Link } from 'react-router-dom';
import { PersonType } from '../types';

interface Props {
  person: PersonType;
}

const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
