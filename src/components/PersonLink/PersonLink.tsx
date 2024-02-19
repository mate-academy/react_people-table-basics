import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  sex: string;
  name: string;
  slug: string;
};

export const PersonLink: React.FC<Props> = ({ name, sex, slug }) => {
  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
