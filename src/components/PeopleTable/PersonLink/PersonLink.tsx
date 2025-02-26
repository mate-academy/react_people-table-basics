import React, { useContext } from 'react';
import { Person } from '../../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleContext } from '../../PeopleContext/PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('PeoplePage must be used within a PeopleProvider');
  }

  return (
    <Link
      to={person.slug}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};
