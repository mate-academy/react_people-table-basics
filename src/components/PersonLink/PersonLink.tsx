import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  person: string | null;
  slug: string | null;
  sex: boolean;
};

export const PersonLink: React.FC<Props> = ({ person, slug, sex }) => {
  if (!person) {
    return '-';
  }

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex,
      })}
    >
      {person}
    </Link>
  );
};
