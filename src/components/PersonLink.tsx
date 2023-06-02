import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

  return (
    <NavLink to={`/people/${slug}`} className={classNames({ 'has-text-danger': sex === 'f' })}>
      {name}
    </NavLink>
  );
};
