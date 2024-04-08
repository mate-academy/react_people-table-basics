import React from 'react';
import { PersonType } from '../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: PersonType;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  console.log(person);

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
