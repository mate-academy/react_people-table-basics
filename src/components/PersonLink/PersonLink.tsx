import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  slug: string,
  name: string,
  sex?: string
};

export const PersonLink: React.FC<Props> = ({
  slug,
  name,
  sex,
}) => (
  <Link to={`../${slug}`} className={classNames({ 'has-text-danger': sex === 'f' })}>
    {name}
  </Link>
);
