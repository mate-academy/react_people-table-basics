import { FC, memo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: FC<Props> = memo(({ person }) => {
  const isWoman = person.sex === 'f';

  return (

    <Link
      to={person.slug}
      className={cn({ 'has-text-danger': isWoman })}
    >
      {person.name}
    </Link>
  );
});
