import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import classNames from 'classnames';

interface Props {
  person: Person | null;
}

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  if (!person) {
    return null;
  }

  const { slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
});

PersonLink.displayName = 'PersonLink';
