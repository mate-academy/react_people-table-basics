import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { sex, slug, name } = person;

  return (

    <NavLink
      to={`/people/${slug}`}
      className={cn({ 'has-text-danger': sex === 'f' })}
    >
      {name}
    </NavLink>
  );
};
