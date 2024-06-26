import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import React from 'react';

type Props = {
  person: Person;
};

export const PeopleLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <Link
      to={`./${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
