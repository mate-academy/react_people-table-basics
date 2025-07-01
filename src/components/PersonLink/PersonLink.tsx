import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';
import classNames from 'classnames';

type PersonLinkProps = {
  personName: string;
  peopleMap: Record<string, Person>;
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  personName,
  peopleMap,
}) => {
  if (!personName) {
    return <>-</>;
  }

  const person = Object.values(peopleMap).find(p => p.name === personName);

  if (!person) {
    return <>{personName}</>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      data-cy="personLink"
    >
      {person.name}
    </NavLink>
  );
};
