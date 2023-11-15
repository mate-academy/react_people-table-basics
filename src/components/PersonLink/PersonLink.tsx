import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person | undefined;
};

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <NavLink
      to={`${person?.slug}`}
      className={cn({
        'has-text-danger': person?.sex === 'f',
      })}
    >
      {person?.name}
    </NavLink>
  );
};
