import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

type TProps = {
  person: Person;
};

export const PersonLink: FC<TProps> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`../${slug}`}
      className={cn('', { 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
