import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  name: string;
  person: Person | null;
  onClick?: () => void;
};

export const PersonLink: React.FC<Props> = ({ name, person, onClick }) => {
  if (person) {
    return (
      <NavLink
        to={`/people/${person.slug}`}
        className={classNames({
          'has-text-danger': person.sex === 'f',
        })}
        onClick={onClick}
      >
        {name}
      </NavLink>
    );
  }

  return <>{name}</>;
};
