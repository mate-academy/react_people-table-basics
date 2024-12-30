import React from 'react';
import cn from 'classnames';
import { Person } from '../../../types';
import { Link } from 'react-router-dom';

type Props = Pick<Person, 'name' | 'slug' | 'sex'>;

export const PersonLink: React.FC<Props> = props => {
  const { name, slug, sex } = props;

  return (
    <Link className={cn({ 'has-text-danger': sex === 'f' })} to={`../${slug}`}>
      {name}
    </Link>
  );
};
