import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
}

export const PersonLink: React.FC<Props> = React.memo(({ person }) => {
  const { name, slug } = person;
  const isWoman = person.sex === 'f';

  return (
    <Link
      to={slug}
      className={classNames({ 'has-text-danger': isWoman })}
    >
      {name}
    </Link>
  );
});
