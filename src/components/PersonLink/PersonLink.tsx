import { PersonType } from '../../types';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import React from 'react';
import classNames from 'classnames';

interface Props {
  person: PersonType;
}

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};
