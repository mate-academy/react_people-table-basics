import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  name: string;
  slug?: string;
  sex?: string;
};

export const PersonLink: React.FC<Props> = ({ name, slug, sex }) => {
  if (slug) {
    return (
      <Link
        to={`/people/${slug}`}
        className={cn({ 'has-text-danger': sex === 'f' })}
      >
        {name}
      </Link>
    );
  }

  return name;
};
