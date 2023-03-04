import { Link } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const { name, slug, sex } = person;

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
});
