import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { PeopleType } from '../../Type/People';

type Props = {
  person: PeopleType;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </Link>
  );
};
