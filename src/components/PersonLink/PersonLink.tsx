import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person;
};

const FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;

  return (
    <NavLink to={`/people/${slug}`} className={cn({ 'has-text-danger': sex === FEMALE })}>
      {name}
    </NavLink>
  );
};
