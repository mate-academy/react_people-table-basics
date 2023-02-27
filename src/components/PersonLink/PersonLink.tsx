import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = memo(({ person }) => {
  const {
    slug,
    name,
    sex,
  } = person;

  return (
    <NavLink
      to={`/people/${slug}`}
      className={() => (
        classNames({ 'has-text-danger': sex === 'f' })
      )}
    >
      {name}
    </NavLink>
  );
});
