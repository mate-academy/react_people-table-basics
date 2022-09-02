import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: FC<Props> = (props) => {
  const { person } = props;

  return (
    <NavLink
      className={() => classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
      to={`../people/${person.slug}`}
    >
      {person.name}
    </NavLink>
  );
};
