import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
