import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  sex: string;
  slug?: string | null;
}

export const PersonLink: React.FC<Props> = ({ name, sex, slug }) => {
  if (!slug) {
    return <span>{name}</span>;
  }

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'f' ? 'has-text-danger' : ''}
    >
      {name}
    </Link>
  );
};
