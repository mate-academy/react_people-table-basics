import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const {
    slug,
    sex,
    name,
  } = person;
  const isWoman = sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {name}
    </Link>
  );
});
