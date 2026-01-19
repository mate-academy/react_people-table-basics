import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../api/peopleApi';

interface Props {
  person?: Person;
  children: string;
  className?: string;
}

const PersonLink: React.FC<Props> = ({ person, children, className = '' }) => {
  if (!person) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {children}
    </Link>
  );
};

export default PersonLink;
