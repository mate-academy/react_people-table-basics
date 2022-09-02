import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface Props {
  person: Person
}

export const PersonLink: React.FC<Props> = (props) => {
  const {
    person: {
      slug,
      sex,
      name,
    },
  } = props;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
