import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parent: string | null
  existingPerson: (value: string | null) => Person | undefined
};

export const PersonLink: React.FC<Props> = ({
  parent,
  existingPerson,
}) => {
  return (
    <td>
      {!parent
        && '-' }
      {existingPerson(parent)
        ? (
          <Link
            className={classNames(
              { 'has-text-danger': existingPerson(parent)?.sex === 'f' },
            )}
            to={`/people/${existingPerson(parent)?.slug}`}
          >
            {parent}
          </Link>
        )
        : parent}
    </td>
  );
};
