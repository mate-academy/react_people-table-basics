import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

type Props = Pick<Person, 'name' | 'sex' | 'slug'>;

export const PersonLink: FC<Props> = ({ name, sex, slug }) => {
  return (
    <Link
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
};
