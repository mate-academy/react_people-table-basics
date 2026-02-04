import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex } = person;
  const isFemale = sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={isFemale}>
      {name}
    </Link>
  );
};
