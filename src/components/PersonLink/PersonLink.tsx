import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = memo(({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={className(
      { 'has-text-danger': person.sex === 'f' },
    )}
  >
    {person.name}
  </Link>
));
