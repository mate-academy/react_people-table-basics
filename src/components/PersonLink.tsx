import React from 'react';
import { Person } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person | undefined;
  personName: string;
};

export const PersonLink: React.FC<Props> = ({ person, personName }) => {
  if (person) {
    const { name, sex, slug } = person;

    return (
      <Link
        to={`../people/${slug}`}
        className={classNames({
          'has-text-danger': sex === 'f',
        })}
      >
        {name}
      </Link>
    );
  }

  return personName;
};
