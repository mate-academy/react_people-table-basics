import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  name: string | undefined;
  sex: string | undefined;
  slug: string | undefined;
}

export const PersonLink: React.FC<Props> = ({ name, sex, slug }) => {
  const isFemale = sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': isFemale,
      })}
    >
      {name}
    </Link>
  );
};
