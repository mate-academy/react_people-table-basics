import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import React, { FC } from 'react';
type Props = {
  person?: Person;
};
export const PersonLink: FC<Props> = ({ person }) => {
  const female = 'f';

  return (
    <Link
      to={`/people/${person?.slug}`}
      className={classNames({
        'has-text-danger': person?.sex === female,
      })}
    >
      {person?.name}
    </Link>
  );
};
