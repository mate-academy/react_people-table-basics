import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = React.memo(
  ({ person }) => (
    <>
      <Link
        to={`/people/${person.slug}`}
        className={classNames('todo', {
          'has-text-danger': person.sex === 'f',
        })}
      >
        {person.name}
      </Link>
    </>
  ),
);
