import classNames from 'classnames';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

export type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = memo(({
  person,
}) => {
  return (
    <Link
      to={`../${person.slug}`}
      className={classNames('', { 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
});
