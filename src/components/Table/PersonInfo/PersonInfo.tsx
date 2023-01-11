import { Link } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../../types';

type Props = {
  person: Partial<Person>;
};

export const PersonInfo: FC<Props> = ({ person }) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
