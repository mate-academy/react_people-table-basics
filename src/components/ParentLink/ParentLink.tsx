import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  parent: Person,
};

export const ParentLink: React.FC<Props> = ({ parent }) => {
  const { slug, name, sex } = parent;

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
