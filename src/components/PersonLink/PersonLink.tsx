import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const isWomenName = person.sex === 'f';

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': isWomenName,
      })}
    >
      {person.name}
    </NavLink>
  );
};
