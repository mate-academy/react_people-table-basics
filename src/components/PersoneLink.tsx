import React from 'react';
import { Link } from 'react-router-dom';
import { IPerson } from '../types';

interface Props {
  person: IPerson;
}

const PersoneLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

export default PersoneLink;
