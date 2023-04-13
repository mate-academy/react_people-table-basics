import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person : Person,
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

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
