// PersonName.jsx
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Sex } from '../../types/Sex';
import { Person } from '../../types';

export const PersonName = ({ name, slug, sex }: Partial<Person>) => {
  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === Sex.Female,
      })}
    >
      {name}
    </Link>
  );
};
