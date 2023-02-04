import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person | string;
};

export const PersonLink: React.FC<Props> = React.memo(
  ({ person }) => {
    const isPersonExisting = typeof person !== 'string';

    return (
      <>
        {isPersonExisting
          ? (
            <Link
              to={`../${person.slug}`}
              className={cn('todo', {
                'has-text-danger': person.sex === 'f',
              })}
            >
              {person.name}
            </Link>
          )
          : (
            `${person}`
          )}
      </>
    );
  },
);
