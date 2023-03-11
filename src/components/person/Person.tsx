import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person:Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <td>
      <Link
        className={classNames('', {
          'has-text-danger': person.sex === 'f',
        })}
        to={{
          pathname: `/people/${person.slug}`,
        }}
      >
        {person.name}
      </Link>
    </td>
  );
};
