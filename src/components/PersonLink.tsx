import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
  className?: string;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  className,
}) => {
  // const navigate = useNavigate();
  const toPath = `/people/${person.slug}`;

  return (
    <NavLink to={toPath} className={className}>
      {person.name}
    </NavLink>
  );
};
