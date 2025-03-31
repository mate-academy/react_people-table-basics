import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  className?: string;
};

const PersonLink: React.FC<Props> = ({ person, className = '' }) => {
  return (
    <Link to={`../${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};

export default PersonLink;
