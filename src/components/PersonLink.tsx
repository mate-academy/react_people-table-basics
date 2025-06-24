import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  name: string;
  slug: string;
  isFemale: boolean;
}

export const PersonLink: React.FC<Props> = ({ name, slug, isFemale }) => {
  return (
    <Link
      className={cn({
        'has-text-danger': isFemale,
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
