import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
};

export const PersonLink: FC<Props> = ({ person }) => {
  const {
    sex,
    name,
    slug,
  } = person;

  const women = sex === 'f';

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': women })}
    >
      {name}
    </Link>
  );
};
