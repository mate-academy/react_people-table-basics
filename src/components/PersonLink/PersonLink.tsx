import { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person | undefined;
};

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/:${person?.slug}`}
      className={
        cn(person?.sex === 'f'
          ? 'has-text-danger'
          : 'has-text-info')
      }
    >
      {person?.name}
    </Link>
  );
};
