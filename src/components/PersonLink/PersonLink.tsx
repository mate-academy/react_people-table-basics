import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => {
  const {
    name,
    slug,
    sex,
  } = person;

  const isWoman = sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({
        'has-text-danger': isWoman,
      })}
    >
      {name}
    </Link>
  );
};
