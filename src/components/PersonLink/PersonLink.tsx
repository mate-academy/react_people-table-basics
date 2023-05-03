import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
};

export const PersonLink: FC<Props> = ({ person }) => {
  const {
    sex,
    slug,
    name,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
