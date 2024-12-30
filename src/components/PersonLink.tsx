import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={cn({ 'has-text-danger': sex === 'f' })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
