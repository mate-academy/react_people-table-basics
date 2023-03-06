import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name?: string,
  hasParent?: Person,
};

export const PersonLink: React.FC<Props> = ({
  name,
  hasParent,
}) => {
  return (
    <td>
      {hasParent ? (
        <Link
          to={`/people/${hasParent.slug}`}
          className={classNames(
            { 'has-text-danger': hasParent.sex === 'f' },
          )}
        >
          {hasParent.name}
        </Link>
      ) : (
        name
      )}
    </td>
  );
};
