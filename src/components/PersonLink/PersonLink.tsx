import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  name?: string;
  slug?: string;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  // if (!name) {
  //   return '-';
  // }

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
