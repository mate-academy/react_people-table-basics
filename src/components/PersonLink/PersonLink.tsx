import classNames from 'classnames';

import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

type Props = {
  person?: Person | null;
  name?: string | null;
};

export const PersonLink: React.FC<Props> = ({ person, name }) => {
  if (!name) {
    return <>-</>;
  }

  if (!person) {
    return <>{name}</>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
