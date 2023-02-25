import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonNavLink: FC<Props> = ({ person }) => {
  const isWomen = person.sex === 'f';

  return (
    <NavLink
      to={`../${person.slug}`}
      className={() => (
        classNames({ 'has-text-danger': isWomen })
      )}
    >
      {person.name}
    </NavLink>
  );
};
